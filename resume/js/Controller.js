window.Controller = function(options) {
    var init = options.init
    bindEvents = options.bindEvents

    var object = {
        view: null,
        model: null,
        init: function(view, model) {
            this.view = view
            this.model = model
            this.model.init()
            options.bindEvents.call(this)
            init.call(object, view, model)
        },
    }

    return object
}