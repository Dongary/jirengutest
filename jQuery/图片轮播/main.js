var allButtos = $('#buttons > span')

for (let i = 0; i < allButtos.length; i++) {
    $(allButtos[i]).on('click', function(event) {
        var index = $(event.currentTarget).index()
        var p = index * -500
        $('#images').css({
            transform: 'translate(' + p + 'px)'
        })
        n = index
        activeButton(allButtos.eq(n))
    })
}

var n = 0;
var size = allButtos.length
playSlide(n % size)
var timerId = setTimer()

function setTimer() {
    return timerId = setInterval(() => {
        n += 1
        playSlide(n % size)
    }, 3000)
}

function playSlide(event) {
    allButtos.eq(event).trigger('click')
}

function activeButton($button) {
    $button.addClass('red').siblings('.red').removeClass('red')
}
$('.window').on('mouseenter', function() {
    window.clearInterval(timerId)
})
$('.window').on('mouseleave', function() {
    timerId = setTimer()
})