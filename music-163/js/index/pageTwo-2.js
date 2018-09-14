{
    let view = {
        el: 'section.hotSongList',
        template: `
         <li>
           <div class="onlySong">
             <span class="songName">{{song.name}}</span>
             <span class="singer">{{song.singer}}</span>
           </div>
           <a href="./playSong.html?id={{song.id}}" class="playButton">
             <svg class="icon" aria-hidden="true">
               <use xlink:href="#icon-play2"></use>
             </svg>
           </a>
         </li>
        `,
        init() {
            this.$el = $(this.el)
        },
        render(data) {
            let { songs } = data
            songs = songs.slice(0, 6)
            songs.map((song) => {
                let $li = $(this.template
                    .replace('{{song.name}}', song.name)
                    .replace('{{song.singer}}', song.singer)
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
            var query = new AV.Query('Song')
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