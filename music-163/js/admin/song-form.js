{
    let view = {
        el: '.page > main',
        template: `
        <form action="" class="form">
            <div class="row">
                <label for="">
                    歌名
                </label>
                <input name="name" type="text" value="__name__" size="35">

            </div>
            <div class="row">
                <label for="">
                    歌手
                </label>
                <input name="singer" type="text" value="__singer__" size="35">

            </div>
            <div class="row">
                <label for="">
                    外链
                </label>
                <input name="url" type="text" value="__url__" size="35">

            </div>
            <div class="row">
                <label for="">
                    封面
                </label>
                <input name="cover" type="text" value="__cover__" size="35">

            </div>
            <div class="row">
                <label for="">
                    歌单
                </label>
                <input name="depend" type="text" value="__depend__" size="35">

            </div>
            <div class="row">
                <label for="">
                    歌词
                </label>
                <textarea cols=60 rows=20 name="lyrics">__lyrics__</textarea>

            </div>
            <div class="row actions">
                <button type="submit">保存</button>
            </div>
        </form>
        `,
        render(data = {}) {
            let placeholders = ['name', 'singer', 'url', 'id', 'cover', 'depend', 'lyrics']
            let html = this.template
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
            if (data.id) {
                $(this.el).prepend('<h1>编辑歌曲</h1>')
            } else {
                $(this.el).prepend('<h1>新建歌曲</h1>')
            }
        },
        reset() {
            this.render({})
        }
    }
    let model = {
        data: {
            name: '',
            singer: '',
            url: '',
            id: '',
            cover: '',
            depend: '',
            lyrics: ''
        },
        update(data) {
            // 更新歌曲某ID的信息
            var playlist = AV.Object.createWithoutData('Playlist', data.depend)
            var song = AV.Object.createWithoutData('Song', this.data.id)
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('lyrics', data.lyrics)
            song.set('url', data.url)
            song.set('cover', data.cover)
            song.set('dependent', playlist)
            return song.save().then((response) => {
                Object.assign(this.data, data)
                return response
            })
        },
        create(data) {
            //建立数据库Class（Song）
            var playlist = AV.Object.createWithoutData('Playlist', data.depend)
            var Song = AV.Object.extend('Song');
            var song = new Song();
            song.set('name', data.name);
            song.set('singer', data.singer)
            song.set('lyrics', data.lyrics)
            song.set('url', data.url)
            song.set('cover', data.cover)
            song.set('dependent', playlist)
            return song.save().then((newSong) => {
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
                            url: '',
                            id: '',
                            singer: '',
                            cover: '',
                            depend: '',
                            lyrics: ''
                        }
                    } else {
                        Object.assign(this.model.data, data)
                    }
                    this.view.render(this.model.data)
                })
        },
        create() {
            let needs = 'name singer url cover depend lyrics'.split(' ')
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
            let needs = 'name singer url cover depend lyrics'.split(' ')
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