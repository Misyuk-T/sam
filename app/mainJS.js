$(document).ready(function () {

//fixed header
//===========================

    let headerIntro = $('.header-intro');
    let header = $('.header');
    let headerHeight = header.outerHeight();

    function marginMenu() {
        headerIntro.css({'padding-top':headerHeight})
    }
    marginMenu();

//burger
//===========================
    let burger = $(".burger");
    let burgerItem = $(".burger-item");
    let headerList = $(".header-list");
    let listItem = $(".list-item");

    burger.click(function () {
        headerList.toggleClass('burger-list');
        burgerItem.toggleClass('burger-item__rotate');
        listItem.toggleClass('burger-list__item');
    });

    $(document).mouseup(function (e) {
        var container = $(".header-list, .burger");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0 && burgerItem.hasClass('burger-item__rotate')) {
            headerList.removeClass('burger-list');
            burgerItem.removeClass('burger-item__rotate');
            listItem.removeClass('burger-list__item');
        }
    });


//header slider
//===========================
    let sliderBtn = $(".review-item");
    let headerSlider =$(".header-slider");
    let headerCarousel = $(".header-carousel");
    let headerSliderItem = $(".header-slider__item");
    let carouselLenght = headerSliderItem.length; //дізнаємось довжину масиву
    let itemPercentCarousel = (100 / carouselLenght); //визначаємо відсоток ширини одного айтему

    sliderBtn.click(function () {
        sliderBtn.each(function () {
        $(this).removeClass('active')
        })                                //показуємо стрілку на активній вкладці табу(слайдера)
        $(this).addClass('active');

        let sliderIndex = $(this).index(); //визначамо індекс елемента по якому клікнули і заносимо його в змінну
        slide();

        function slide(){  //функція яка в залежності від довжини масиву і індекса енлементу поя кому був клік перетягує слайдер
            let distanceCarousel = sliderIndex * itemPercentCarousel
            let translateXCarousel = `translateX(-${distanceCarousel}%)`

            headerCarousel.css({'transform': translateXCarousel})
        }
    })




}); //end
