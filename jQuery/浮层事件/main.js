let index = true;
clickMe.addEventListener('click', function() {
    let indexstr = index ? "block" : "none"
    popover.style.display = indexstr
    index = !index
})
wrapper.addEventListener('click', function(e) {
    e.stopPropagation()
})
document.addEventListener('click', function() {
    popover.style.display = 'none'
    index = true;
})