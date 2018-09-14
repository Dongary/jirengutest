{
    let view = {
        el: '.Playlist',
        init() {
            this.$el = $(this.el)
        },
        render(data) {
            let { song } = data
            this.$el.find('.listsimg').css('background', `transparent url(${song.cover})  no-repeat`)
            this.$el.find('.listsimg').css('background-size', 'cover')
            this.$el.find('.listsimg>img').attr('src', song.cover)
            this.$el.find('.listsimg>span').text(song.name)
            this.$el.find('.liststitle>.summary').text(song.summary)
        }
    }
    let model = {
        data: {
            song: {
                id: '',
                name: '',
                summary: '',
                cover: ''
            }
        },
        find(id) {
            var query = new AV.Query('Playlist')
            return query.get(id).then((song) => {
                Object.assign(this.data.song, { id: song.id, ...song.attributes })
                return song
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            let id = this.getSongId()
            this.model.find(id).then(() => {
                this.view.render(this.model.data)
            })
            this.bindEvents()
        },
        bindEvents() {

        },
        getSongId() {
            let search = window.location.search
            if (search.indexOf('?') === 0) {
                search = search.substring(1)
            }

            let array = search.split('&').filter((v => v))
            let id = ''
            for (let i = 0; i < array.length; i++) {
                let kv = array[i].split('=')
                let key = kv[0]
                let value = kv[1]
                if (key === 'id') {
                    id = value
                    break
                }
            }
            return id
        }
    }
    controller.init(view, model)
}