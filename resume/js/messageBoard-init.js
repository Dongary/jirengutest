! function() {

    var model = Model({ resourceName: 'MessageBoard' })
    var view = View('section.messageboard')

    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function(view, model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function() {
            this.model.fetch().then(
                (messages) => {
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        li.innerText = `${item.name}: ${item.content}`
                        this.messageList.appendChild(li)
                    })
                }
            )
        },
        saveMessage: function() {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save({ // Promise 对象  
                'name': name,
                'content': content
            }).then(function(object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                    //messageList.appendChild(li)
                messageList.insertBefore(li, messageList.childNodes[0])
                myForm.querySelector('input[name=name]').value = ''
                myForm.querySelector('input[name=content]').value = ''
            })
        },
        bindEvents: function() {
            this.form.addEventListener('submit', (event) => {
                event.preventDefault()
                this.saveMessage()
            })
        },

    }

    controller.init(view, model)

}.call()