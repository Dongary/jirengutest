window.$ = function(nodeOrSelector) {
    let nodes = {}
    if (typeof nodeOrSelector === 'string') {
        let temp = document.querySelectorAll(nodeOrSelector)
        for (let i = 0; i < temp.length; i++) {
            nodes[i] = temp[i]
        }
        nodes.length = temp.length
    } else if (nodeOrSelector instanceof Node) {
        nodes = {
            0: nodeOrSelector,
            length: 1
        }
    }

    nodes.addClass = function(classes) {
        classes.forEach((value) => {
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].classList.add(value)
            }
        })
    }
    nodes.setText = function(text) {
        if (text === undefined) {
            var texts = []
            for (let i = 0; i < nodes.length; i++) {
                texts.push(nodes[i].textContent)
            }
            return texts
        } else {
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].textContent = text
            }
        }
    }
    return nodes
}

//获取某个节点的兄弟节点
Node.prototype.getSiblings = function() {
    var allChildren = this.parentNode.children
    var array = {
        length: 0
    }
    for (let i = 0; i < allChildren.length; i++) {
        if (allChildren[i] !== this) {
            array[array.length] = allChildren[i]
            array.length += 1
        }
    }
    return array
}