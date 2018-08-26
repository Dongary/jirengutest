{
    let view = {
        el: '#tabs',
        init() {
            this.$el = $(this.el)
        }
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
        },
        bindEvents() {
            this.view.$el.on('click', 'div', (e) => {
                let $div = $(e.currentTarget)
                let tabName = $div.attr('data-tab-name')
                $div.addClass('active').siblings().removeClass('active')
                window.eventHub.emit('selectTab', tabName)
            })
        }
    }
    controller.init(view, model)
}