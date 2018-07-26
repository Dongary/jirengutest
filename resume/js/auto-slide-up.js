let specialTags = document.querySelectorAll('[data-x]')
for (let i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add('offset')
}
setTimeout(function() {
    findClosestAndRemoveOffset()
}, 888)
window.addEventListener('scroll', function() {
    findClosestAndRemoveOffset()
})


function findClosestAndRemoveOffset() {
    let specialTags = document.querySelectorAll('[data-x]')
    let minIndex = 0
    for (let i = 1; i < specialTags.length; i++) {
        if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
            minIndex = i
        }
    }
    let id = specialTags[minIndex].id
    let href = document.querySelector('a[href="#' + id + '"]')
    let li = href.parentNode
    let broandme = li.parentNode.children
    for (let i = 0; i < broandme.length; i++) {
        broandme[i].classList.remove('highlight')
    }
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset')
        specialTags[i].classList.remove('animate')
    }
    specialTags[minIndex].classList.remove('offset')
    specialTags[minIndex].classList.add('animate')
    li.classList.add('highlight')
}