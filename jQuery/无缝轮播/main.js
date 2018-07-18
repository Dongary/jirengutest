var index = 0;
Initialize()
setInterval("auto()", 3000)






function Initialize() {
    $('.images>img:nth-child(1)').addClass('current')
    $('.images>img:nth-child(2)').addClass('enter')
}

function auto() {
    i = index % 3
    var imglist = $('.images>img')
    if (i === 0) {
        makeLeave($(imglist[i]))
        makeCurrent($(imglist[i + 1]))
        makeEneter($(imglist[i + 2]))
        index = index + 1
    } else if (i === 1) {
        makeLeave($(imglist[i]))
        makeCurrent($(imglist[i + 1]))
        makeEneter($(imglist[i - 1]))
        index = index + 1
    } else {
        makeLeave($(imglist[i]))
        makeCurrent($(imglist[i - 2]))
        makeEneter($(imglist[i - 1]))
        index = index + 1

    }
}

function makeCurrent($node) {
    $node.removeClass('enter leave').addClass('current')
}

function makeLeave($node) {
    $node.removeClass('enter current').addClass('leave')
}

function makeEneter($node) {
    $node.removeClass('current leave').addClass('enter')
}

/*if (i === 0) {
    $(imglist[i]).removeClass('current').addClass('leave')
    $(imglist[i + 1]).removeClass('enter').addClass('current')
    $(imglist[i + 2]).removeClass('leave').addClass('enter')
    index = index + 1
} else if (i === 1) {
    $(imglist[i]).removeClass('current').addClass('leave')
    $(imglist[i + 1]).removeClass('enter').addClass('current')
    $(imglist[i - 1]).removeClass('leave').addClass('enter')
    index = index + 1
} else {
    $(imglist[i]).removeClass('current').addClass('leave')
    $(imglist[i - 2]).removeClass('enter').addClass('current')
    $(imglist[i - 1]).removeClass('leave').addClass('enter')
    index = index + 1

}*/