$(document).ready(function () {

//fixed header
//===========================

    let headerIntro = $('.header-intro');
    let header = $('.header');
    let headerHeight = header.outerHeight();

    function marginMenu() {
        headerIntro.css({'padding-top': headerHeight})
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
        let container = $(".header-list, .burger");

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
    let headerSlider = $(".header-slider");
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

        function slide() {  //функція яка в залежності від довжини масиву і індекса енлементу поя кому був клік перетягує слайдер
            let distanceCarousel = sliderIndex * itemPercentCarousel
            let translateXCarousel = `translateX(-${distanceCarousel}%)`

            headerCarousel.css({'transform': translateXCarousel})
        }
    })

    //stages
//===========================
    let stageItem = $(".stage-item");
    let stageItemActive = 'stage-item__active'
    let stageName = $(".stage-name ");
    let stageNameActive = 'stage-name__active'

    stageItem.click(function () {
        stageItem.removeClass(stageItemActive);
        $(this).addClass(stageItemActive);

        stageName.removeClass(stageNameActive);
        $(this).closest('.stages').find(stageName).addClass(stageNameActive);

    })

    //calculator
//===========================
    let confirmMoney = $(".confirm-money")
    let rangeSum = $(".range-of-sum");
    let inputPrice = $(".input-price")
    let rangeDuration = $(".range-of-durations");
    let inputDuration = $(".input-duration");

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); //ділимо на розряди
    }

    rangeSum.slider({ // перший слайдер
        animate: "slow",
        range: "min",
        min: 500000,
        max: 1000000,
        step: 50000,
        value: 700000,
        slide: function (event, ui) {
            inputPrice.val(numberWithSpaces(ui.value) + (' ₽'));
        },
        change: function (event, ui) {
            calculatorConfirm();
        }
    });
    inputPrice.val(numberWithSpaces(rangeSum.slider('value')) + (' ₽')); // дефолтне значення


    rangeDuration.slider({ // другий слайдер
        animate: "slow",
        range: "min",
        min: 1,
        max: 12,
        value: 3,
        slide: function (event, ui) {
            inputDuration.val(ui.value + (' мес.'));
        },
        change: function (event, ui) {
            calculatorConfirm();
        }
    });
    inputDuration.val(rangeDuration.slider("value") + (' мес.')); // дефолтне значення


    function calculatorConfirm() {    // калькулятор, який ділить, округлює  і присвоює
        let result = (rangeSum.slider("value") / rangeDuration.slider("value"));
        let resultRounding = result.toFixed();
        numberWithSpaces(resultRounding);
        let resultChange = confirmMoney.text(numberWithSpaces(resultRounding) + ' ₽');
    }

    // значення інпута в слайдер + валідація

    function keyUp(inputName, sliderName, min, max, size) {
        let inputValue = inputName.val();
        let sum = inputValue.replace(/\s/g, ''); //в інпуті лежить хуйня з пробілами зараз, я беру без пробілів цифри
        let numbSum = parseInt(sum);

        if (numbSum < min) {              // це якщо дурачок введе мало цифр вони стануть моїм мінімумом
            numbSum = min
        } else if (isNaN(numbSum) === true) {  // це якщо дурачок не введе нічого
            numbSum = min
        } else if (numbSum > max) {
            numbSum = max     // це якщо дурачок не введе багато цифр
        }
        sliderName.slider('value', numbSum);  // це я буду звертатись до кого жного слайдера через перемінну  sliderName

        inputName.blur(function () {
           inputName.val(numbSum + size);  // це валідая для самого інпута
        })
    }


    inputPrice.keyup(function () {
        keyUp(inputPrice, rangeSum, 500000, 1000000, ' ₽')
    });
    inputDuration.keyup(function () {
        keyUp(inputDuration, rangeDuration, 1, 12, ' мес.')
    });


}); //end
