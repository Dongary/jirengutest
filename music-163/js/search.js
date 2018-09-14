{
    let view = {
        el: '.pageThree',
        template: `
        <li>
         <a href="./playSong.html?id={{song.id}}">
            <span class="songName">{{song.name}}</span>
            <span class="singer">{{song.singer}}</span>
         </a>
        </li>
       `,
        init() {
            this.$el = $(this.el)
        },
        render(data) {
            let $li = $(this.template
                .replace('{{song.name}}', data[0].name.slice(0, 6).concat('...'))
                .replace('{{song.singer}}', data[0].singer.slice(0, 8))
                .replace('{{song.id}}', data[0].id)
            )
            this.$el.find('ul').append($li)


        }
    }
    let model = {
        data: {
            songs: [],
        },
        get() {
            var query = new AV.Query('Song')
            return query.find().then((songs) => {

                this.data.songs = songs.map((song) => {
                    return { id: song.id, ...song.attributes }
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
            this.model.get().then((songs) => {

            })
            this.bindEvents()
        },
        bindEvents() {
            $(this.view.el).on('click', '.searchmouse', () => {
                let textvalue = $('.pageThree').find('input').val()
                let songs = this.model.data.songs
                var newsongs = []
                for (let i = 0; i < songs.length; i++) {
                    if (textvalue === songs[i].name) {

                        newsongs[0] = songs[i]
                    }
                }
                if (newsongs.length == 1) {
                    this.view.render(newsongs)
                    $('.pageThree').find('input').val('')
                } else {
                    $('.pageThree').find('input').val('')
                    alert('暂未找到相关歌曲')
                }

            })
        },

    }
    controller.init(view, model)
}