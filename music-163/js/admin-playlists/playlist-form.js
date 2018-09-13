{
    let view = {
        el: '.page > .playlists-wraper',
        template: `
        <form action="" class="form">
         <div class="row">
            <label for="">
                        歌单姓名
                    </label>
            <input name="name" type="text" value="__name__" size="35">
         </div>
         <div class="row">
            <label for="">
                        歌单简介
                    </label>
            <input name="summary" type="text" value="__summary__" size="35">
         </div>
         <div class="row">
            <label for="">
                        封面图片
                    </label>
            <input name="cover" type="text" value="__cover__" size="35">
         </div>
         <div class="row actions">
            <button type="submit">创建</button>
         </div>
        </form>
        `,
        render(data = {}) {
            let placeholders = ['name', 'summary', 'cover', 'id', ]
            let html = this.template
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
            if (data.id) {
                $(this.el).prepend('<h1>编辑歌单</h1>')
            } else {
                $(this.el).prepend('<h1>新建歌单</h1>')
            }
        },
        reset() {
            this.render({})
        }
    }
    let model = {
        data: {
            name: '',
            summary: '',
            cover: '',
            id: ''
        },
        update(data) {
            // 更新某ID歌单的信息
            var playlist = AV.Object.createWithoutData('Playlist', this.data.id)
            playlist.set('name', data.name)
            playlist.set('summary', data.summary)
            playlist.set('cover', data.cover)
            return playlist.save().then((response) => {
                Object.assign(this.data, data)
                return response
            })
        },
        create(data) {
            //建立歌单
            var Playlist = AV.Object.extend('Playlist');
            var playlist = new Playlist();
            playlist.set('name', data.name)
            playlist.set('summary', data.summary)
            playlist.set('cover', data.cover)
            return playlist.save().then((newSong) => {
                let { id, attributes } = newSong
                Object.assign(this.data, { id, ...attributes })
                alert('LeanCloud Rocks!')
            }, (error) => {
                console.error(error)
                alert('LeanCloud False')
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            window.eventHub.on('select', (data) => {
                    this.model.data = data
                    this.view.render(this.model.data)
                }),
                window.eventHub.on('new', (data) => {
                    if (this.model.data.id) {
                        this.model.data = {
                            name: '',
                            summary: '',
                            cover: '',
                        }
                    } else {
                        Object.assign(this.model.data, data)
                    }
                    this.view.render(this.model.data)
                })
        },
        create() {
            let needs = 'name summary cover'.split(' ')
            let data = {}
            needs.map((string) => {
                data[string] = $(this.view.el).find(`[name="${string}"]`).val()
            })
            this.model.create(data).then(() => {
                this.view.reset()
                let string = JSON.stringify(this.model.data)
                let object = JSON.parse(string)
                window.eventHub.emit('create', object)
            })
        },
        update() {
            let needs = 'name summary cover'.split(' ')
            let data = {}
            needs.map((string) => {
                data[string] = $(this.view.el).find(`[name="${string}"]`).val()
            })
            this.model.update(data).then(() => {
                alert('更新成功')
                window.eventHub.emit('update', JSON.parse(JSON.stringify(this.model.data)))
            })

        },
        bindEvents() {
            $(this.view.el).on('submit', 'form', (e) => {
                e.preventDefault()
                if (this.model.data.id) {
                    this.update()
                } else {
                    this.create()
                }
            })
        }
    }
    controller.init(view, model)
}