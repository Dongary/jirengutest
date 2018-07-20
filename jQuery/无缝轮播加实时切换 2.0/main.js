let $buttons = $('#buttons>div')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0
makeFakeSlides()
bindEvents()
$(next).on('click', function() {
    goToSlide(current + 1)
})
$(previous).on('click', function() {
    goToSlide(current - 1)
})

let timer = setInterval(function() {
    goToSlide(current + 1)
}, 3000)

$('.container').on('mouseenter', function() {
    window.clearInterval(timer)
})
$('.container').on('mouseleave', function() {
    timer = setInterval(function() {
        goToSlide(current + 1)
    }, 3000)
})

function bindEvents() {
    $('#buttons').on('click', 'div', function(event) {
        let $button = $(event.currentTarget)
        let index = $button.index()
        goToSlide(index)
    })
}


function goToSlide(index) {
    if (index > $buttons.length - 1) {
        index = 0
    } else if (index < 0) {
        index = $buttons.length - 1
    }
    if (current === $buttons.length - 1 && index === 0) {
        $slides.css({ transform: `translateX(${-($buttons.length + 1)*400}px)` }).one('transitionend', function() {
            $slides.hide().offset()
            $slides.css({ transform: `translateX(${-(index+1)*400}px)` }).show()
        })

    } else if (current === 0 && index === $buttons.length - 1) {
        $slides.css({ transform: `translateX(0px)` }).one('transitionend', function() {
            $slides.hide().offset()

            $slides.css({ transform: `translateX(${-(index+1)*400}px)` }).show()
        })

    } else {
        $slides.css({ transform: `translateX(${-(index+1)*400}px)` })

    }
    current = index
}

function makeFakeSlides() {
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
    $slides.css({ transform: 'translateX(-400px)' })
    setTimeout(function() {
        $slides.css({ transition: 'all 1s' })
    }, 0)
}