$(document).ready(function () {

//fixed header (margin-top for header intro)
//===========================
    let header = $('.header');
    if (header.length) {

        let headerIntro = $('.header-intro');
        let headerHeight = header.outerHeight();

        function marginMenu() {
            headerIntro.css({'padding-top': headerHeight})
        }
        marginMenu();

//show/hide burger menu
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
    }

    //stages
//===========================

let getCredit = $('.get-credit')
    if (getCredit.length) {

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
    }

    //calculator
//===========================
    let creditCalculator = $('.credit-calculator')
    if (creditCalculator) {

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
            value: 1000000,
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
            value: 5,
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

        function keyUp(inputName, sliderName, min, max, size, step) {
            let inputValue = inputName.val();
            let sum = inputValue.replace(/\s/g, ''); // беру без пробілів цифри
            let numbSum = parseInt(sum);
            let roundSum = (Math.round(numbSum / step) * step)


            if (roundSum < min) {              // це якщо дурачок введе мало цифр вони стануть моїм мінімумом
                roundSum = min
            } else if (isNaN(roundSum) === true) {  // це якщо дурачок не введе нічого
                roundSum = min
            } else if (roundSum > max) {
                roundSum = max;     // це якщо дурачок не введе багато цифр
            }

            sliderName.slider('value', roundSum);  // це я буду звертатись до кого жного слайдера через перемінну  sliderName

            inputName.blur(function () {
                inputName.val(numberWithSpaces(roundSum) + size);  // це валід для самого інпута
            })
        }


        inputPrice.keyup(function () {
            keyUp(inputPrice, rangeSum, 500000, 1000000, ' ₽', 50000)
        });
        inputDuration.keyup(function () {
            keyUp(inputDuration, rangeDuration, 1, 12, ' мес.', 1)
        });
    }

//MEDIA PLAYER
//===========================
    let videoWindow = $('.video');
    if (videoWindow.length) {

        let video = $('.video')[0];
        video.onloadedmetadata = function () {
// запускаєм плеер тільки при отриманні метадати

            let btn = $('.video-btn');
            let btnSvg = $('.play-svg')
            let playIcon = $('.play-icon')

            function triggerVideo() { // button play/pause

                if (video.paused || video.ended) {
                    video.play()
                } else {
                    video.pause()
                }
            }

            function playPauseSvg() {
                if (video.paused || video.ended) {
                    btnSvg.attr({href: '#play'})
                } else {
                    btnSvg.attr({href: '#pause'})
                }
            }

            function toggleMedia() {
                btn.toggleClass('video-btn-hide')
                videoWindow.toggleClass('video-blur')

            }

            btn.click(function () {
                triggerVideo();
                toggleMedia();
                playPauseSvg()
            });

            videoWindow.click(function () {
                triggerVideo();
                toggleMedia();
                playPauseSvg();
            })

            playIcon.click(function () {
                triggerVideo();
                toggleMedia();
                playPauseSvg();
            })


// volume slider

            let videoVolume = $(".video-volume");
            let videoDurationUI = $(".video-duration");
            let spanTime = $(".current-time")
            let spanMaxTime = $(".max-time")
            let btnVolume = $('.volume-icon')
            let volumeSvg = $(`.volume-svg`)

            spanMaxTime.text(secondsToTime(video.duration));

            function secondsToTime(time) {
                let h = Math.floor(time / (60 * 60)),
                    dm = time % (60 * 60),
                    m = Math.floor(dm / 60),
                    ds = dm % 60,
                    s = Math.ceil(ds);
                if (s === 60) {
                    s = 0;
                    m = m + 1;
                }
                if (s < 10) {
                    s = '0' + s;
                }
                if (m === 60) {
                    m = 0;
                    h = h + 1;
                }
                if (m < 10) {
                    m = '0' + m;
                }
                if (h === 0) {
                    fulltime = m + ':' + s;
                } else {
                    fulltime = h + ':' + m + ':' + s;
                }
                return fulltime;
            }

// volume slider

            videoVolume.slider({
                animate: "fast",
                range: "min",
                min: 0,
                max: 1,
                step: 0.00001,
                value: 0.5,
                slide: function (event, ui) {
                    video.volume = ui.value
                    volumeBeforeClick = ui.value
                    svgChange();
                },
                change: function (event, ui) {
                    video.volume = ui.value;
                    svgChange();
                }
            });

            video.volume = videoVolume.slider("value")
            let volumeBeforeClick = videoVolume.slider('value');
            svgChange();

            btnVolume.click(function () {
                iconMuteUnmute();
                svgChange();
            })

            function iconMuteUnmute() {
                if (videoVolume.slider('value') > 0) {
                    videoVolume.slider("value", 0);
                } else {
                    videoVolume.slider("value", volumeBeforeClick);
                }
            }

            function svgChange() {
                if (video.volume === 0) {
                    volumeSvg.attr({href: `#volume-0`})
                } else if (0.50 > video.volume > 0) {
                    volumeSvg.attr({href: `#volume-1`})
                } else {
                    volumeSvg.attr({href: `#volume-2`})
                }
            }

// duration slider

            videoDurationUI.slider({
                animate: "fast",
                range: "min",
                min: 0,
                max: video.duration,
                step: 0.01,
                value: 0,
                slide: function (event, ui) {
                    spanTime.text(secondsToTime(videoDurationUI.slider("value")));
                    video.currentTime = ui.value
                }
            });

            video.ontimeupdate = function () {
                videoDurationUI.slider('value', this.currentTime)
                spanTime.text(secondsToTime(videoDurationUI.slider("value")));
            };


            video.onended = function () {
                toggleMedia();
                playPauseSvg();
            }

        }//end player metadata function
    } //end player function


}); //end ready page function






