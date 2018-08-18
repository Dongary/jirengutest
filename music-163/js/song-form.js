{
    let view = {
        el: '.page > main',
        template: `
        <h1>新建歌曲</h1>
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
            <div class="row actions">
                <button type="submit">保存</button>
            </div>
        </form>
        `,
        render(data = {}) {
            let placeholders = ['name', 'singer', 'url', 'id']
            let html = this.template
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
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
            id: ''
        },
        create(data) {
            //建立数据库Class（PlayList）
            var Song = AV.Object.extend('Song');
            var song = new Song();
            song.set('name', data.name);
            song.set('singer', data.singer);
            song.set('url', data.url);
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
            window.eventHub.on('upload', (data) => {
                this.model.data = data
                this.view.render(this.model.data)
            })
        },
        bindEvents() {
            $(this.view.el).on('submit', 'form', (e) => {
                e.preventDefault()
                let needs = 'name singer url'.split(' ')
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
            })
        }
    }
    controller.init(view, model)
}