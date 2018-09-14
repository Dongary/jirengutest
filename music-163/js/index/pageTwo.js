{
    let view = {
        el: '.pageTwo',
        init() {
            this.$el = $(this.el)
        },
        show() {
            this.$el.addClass('active')
        },
        hide() {
            this.$el.removeClass('active')
        }
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
            this.loadMoudle1()
            this.loadMoudle2()
        },
        bindEvents() {
            window.eventHub.on('selectTab', (tabName) => {
                if (tabName === 'page-two') {
                    this.view.show()
                } else {
                    this.view.hide()
                }
            })
        },
        loadMoudle1() {
            let script1 = document.createElement('script')
            script1.src = './js/index/pageTwo-1.js'
            script1.onload = function() {

            }
            document.body.appendChild(script1)
        },
        loadMoudle2() {
            let script2 = document.createElement('script')
            script2.src = './js/index/pageTwo-2.js'
            script2.onload = function() {

            }
            document.body.appendChild(script2)
        }
    }
    controller.init(view, model)
}