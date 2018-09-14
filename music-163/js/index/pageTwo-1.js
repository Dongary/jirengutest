{
    let view = {
        el: '.pageTwo>section.recomendSongList',
        template: `
         <li>
          <div>
            <a href="./playlists.html?id={{song.id}}">
               <img src="{{song.cover}}" alt="">
            </a>
            <span>{{song.name}}</span>
          </div>
         </li>
        `,
        init() {
            this.$el = $(this.el)
        },
        render(data) {
            let { songs } = data
            songs.map((song) => {
                let $li = $(this.template
                    .replace('{{song.name}}', song.name.slice(0, 6).concat('...'))
                    .replace('{{song.cover}}', song.cover)
                    .replace('{{song.id}}', song.id)
                )
                this.$el.find('ul').append($li)

            })
        }
    }
    let model = {
        data: {
            songs: []
        },
        find() {
            var query = new AV.Query('Playlist')
            return query.find().then((songs) => {
                this.data.songs = songs.map((song) => {
                    //return { id: song.id, ...song.attributes }
                    return Object.assign({ id: song.id }, song.attributes)
                })
                return songs
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.model.find().then(() => {
                this.view.render(this.model.data)
            })
            this.bindEvents()
        },
        bindEvents() {

        }
    }
    controller.init(view, model)
}