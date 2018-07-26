! function() {
    var view = document.querySelector('#topNavBar')
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            view.classList.add('fixedbar');
        } else {
            view.classList.remove('fixedbar');
            listone.classList.remove('highlight');
        }
    })
}.call()