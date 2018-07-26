! function() {
    var view = document.querySelector('#mySlides')
    var mySwiper = new Swiper(view.querySelector('.swiper-container'), {
        loop: true,

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
}.call()