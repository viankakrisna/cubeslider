(function ($) {
    $.fn.cubeSlider = function (options) {
        this.each(function () {
            var el = $(this);
            var settings = $.extend({
                onTop: true,
                fullWidth: true,
                scrolled: false,
                counter: 0,
                scrollDuration: 1000,
                headerElement: '#header',
                captionElement: '.cube-caption',
                controlElement: '.control',
                caption: el.find(this.captionElement),
                content: el.find('> div > div:first-child'),
                control: el.parent().find(this.controlElement),
                addClasser: function () {
                    el.parent().addClass('cubeSlider-wrapper');
                    el.find('> div:nth-child(1)').addClass('active');
                    el.find('> div:nth-child(2)').addClass('after');
                    el.find('> div:nth-child(4)').addClass('before');
                },
                appender: function () {
                    el.parent().append('<div class="control"> <a href="#" class="prev"><i class="fa fa-chevron-up"></i></a> <a href="#" class="next"><i class="fa fa-chevron-down"></i></a> </div>');
                    el.find('> div > div').append('<div class="text-center"><a href="#scrollDown" class="cube-exit"><i class="fa fa-chevron-down"></i></a></div>');
                    settings.control.find('.prev').after('<div class="captions"></div>');
                },
                positioner: function () {
                    if (settings.onTop) {
                        $('body').css({
                            padding: 0
                        });
                    }
                },
                fullWidther: function () {
                    if (settings.fullWidth) {
                        var widths = [];
                        el.parents().each(function () {
                            widths.push($(this).width())
                        });
                        var max = document.documentElement.clientWidth;
                        var min = Math.min.apply(Math, widths);
                        var margin = (max - min) / 2;
                        if (margin < 0) {
                            margin = 0;
                        }
                        el.parent().css({
                            position: 'relative',
                            left: -margin,
                            width: max,
                            height: document.documentElement.clientHeight
                        });
                    }
                },
                contentStyler: function () {
                    settings.content.css({
                        marginTop: (($(window).height() + $(settings.headerElement).height()) - settings.content.height()) / 2
                    });
                    settings.content.css({
                        "webkitTransition": 'transform 1s, opacity 500ms 0s',
                        "MozTransition": 'transform 1s, opacity 500ms 0s',
                        "msTransition": 'transform 1s, opacity 500ms 0s',
                        "transition": 'transform 1s, opacity 500ms 0s',
                        "webkitTransform": "translateY(-25%)",
                        "MozTransform": "translateY(-25%)",
                        "msTransform": "translateY(-25%)",
                        "OTransform": "translateY(-25%)",
                        "transform": 'translateY(-25%)'
                    });
                    settings.fullWidther();
                },
                nextSide: function (e) {
                    if (!settings.scrolled) {
                        settings.counter += 1;
                        settings.content.css({
                            opacity: 0,
                            "webkitTransform": "translateY(10vh)",
                            "MozTransform": "translateY(10vh)",
                            "msTransform": "translateY(10vh)",
                            "OTransform": "translateY(10vh)",
                            "transform": "translateY(10vh)"
                        });
                        setTimeout(function () {
                            settings.content.css({
                                opacity: 1,
                                "webkitTransform": "translateY(-25%)",
                                "MozTransform": "translateY(-25%)",
                                "msTransform": "translateY(-25%)",
                                "OTransform": "translateY(-25%)",
                                "transform": 'translateY(-25%)'
                            });
                        }, 1000);
                        el.css({
                            "webkitTransform": 'translateZ( -50vh) rotateX(' + settings.counter * 90 + 'deg)',
                            "MozTransform": 'translateZ( -50vh) rotateX(' + settings.counter * 90 + 'deg)',
                            "msTransform": 'translateZ( -50vh) rotateX(' + settings.counter * 90 + 'deg)',
                            "OTransform": 'translateZ( -50vh) rotateX(' + settings.counter * 90 + 'deg)',
                            "transform": 'translateZ( -50vh) rotateX(' + settings.counter * 90 + 'deg)'
                        });
                        cfx.showCaption('.captions > div', settings.counter);
                        e.preventDefault();
                        settings.scrolled = true;
                        setTimeout(function () {
                            settings.scrolled = false;
                        }, 2000);
                    } else {
                        return false;
                    }
                },
                prevSide: function (e) {
                    if (!settings.scrolled) {
                        settings.counter -= 1;
                        settings.content.css({
                            "webkitTransform": "translateY(-10vh)",
                            "MozTransform": "translateY(-10vh)",
                            "msTransform": "translateY(-10vh)",
                            "OTransform": "translateY(-10vh)",
                            "transform": "translateY(-10vh)"
                        });
                        setTimeout(function () {
                            settings.content.css({
                                "webkitTransform": "translateY(-25%)",
                                "MozTransform": "translateY(-25%)",
                                "msTransform": "translateY(-25%)",
                                "OTransform": "translateY(-25%)",
                                "transform": "translateY(-25%)"
                            });
                        }, 1000);
                        el.css({
                            "webkitTransform": 'translateZ( -50vh) rotateX(' + settings.counter * 90 + 'deg)',
                            "MozTransform": 'translateZ( -50vh) rotateX(' + settings.counter * 90 + 'deg)',
                            "msTransform": 'translateZ( -50vh) rotateX(' + settings.counter * 90 + 'deg)',
                            "OTransform": 'translateZ( -50vh) rotateX(' + settings.counter * 90 + 'deg)',
                            "transform": 'translateZ( -50vh) rotateX(' + settings.counter * 90 + 'deg)'
                        });
                        cfx.showCaption('.captions > div', settings.counter);
                        e.preventDefault();
                        settings.scrolled = true;
                        setTimeout(function () {
                            settings.scrolled = false;
                        }, 2000);
                    } else {
                        return false;
                    }
                },
                moveOnMouseWheel: function (e) {
                    if ($('body').scrollTop() === 0) {
                        e.preventDefault();
                        if (e.originalEvent.wheelDelta < 0) {
                            $('.next').click();
                        } else {
                            $('.prev').click();
                        }
                    }
                },
                moveOnSwipe: function () {
                    el.swipe({
                        swipeDown: function () {
                            $('.prev').click();
                        },
                        swipeUp: function () {
                            $('.next').click();
                        }
                    });
                },
                checkIfOnTop: function () {
                    if ($(window).scrollTop() === 0) {
                        $(settings.headerElement).css({
                            background: 'transparent'
                        });
                    } else {
                        $(headerElement).css({
                            background: '#ce3c32'
                        });
                    }
                },
                eventsHandler: function () {
                    $(window).on('load resize', function () {
                        settings.contentStyler()
                    });
                    $('.cubeSlider-wrapper .next').on('click', function (e) {
                        settings.nextSide(e);
                    });
                    $('.cubeSlider-wrapper .prev').on('click', function (e) {
                        settings.prevSide(e);
                    });
                    el.on('mousewheel', function (e) {
                        settings.moveOnMouseWheel(e)
                    });
                    $('[href="#scrollDown"]').on('click', function (e) {
                        e.preventDefault();
                        settings.scrollIt();
                    });
                    settings.moveOnSwipe();
                },
                scrollIt: function () {
                    setTimeout(function () {
                        $('body').animate({
                            scrollTop: $(window).height()
                        }, settings.scrollDuration);
                    }, 250);
                },
            }, options);
            settings.addClasser();
            settings.appender();
            settings.checkIfOnTop();
            settings.positioner();
            settings.contentStyler();
            settings.eventsHandler();
            $(this).show();
        });
    }
}(jQuery));
jQuery(document).ready(function ($) {
    $('.cubeSlider').cubeSlider();
});
