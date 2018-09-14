{
    let view = {
        el: '.SongLists>.SongList',
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
        find(id) {
            var playlist = AV.Object.createWithoutData('Playlist', id)
            var query = new AV.Query('Song');
            query.equalTo('dependent', playlist);
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