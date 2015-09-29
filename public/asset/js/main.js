//globals

registerAlready=false;

var $ = jQuery.noConflict();
jQuery(function($) {
    "use strict";
    $(".loading").addClass("active");
    $(window).load(function() {
        $(".loading").addClass("full");
        $(".home").removeClass("active");
        setTimeout(function() {
            $(".loader .logo").css("opacity", '0')
        }, 100);
        setTimeout(function() {
            $(".loading").fadeOut("slow")
        }, 1500);
        setTimeout(function() {
            $("#preloader").removeClass("visible")
        }, 2000);
        setTimeout(function() {
            $(".home").addClass("active")
        }, 2000);
    });
    $(".background.video").each(function() {
        $(".stop-button").on('click', function() {
            $(".stop-button").toggleClass('fa-play').toggleClass('fa-pause');
            var videoBG = document.getElementById("video");
            if (videoBG.paused)
                videoBG.play();
            else
                videoBG.pause();
        });
        $(".volume-button").on('click', function() {
            $(".volume-button").toggleClass('fa-volume-off').toggleClass('fa-volume-up');
            $("video").prop('muted', !$("video").prop('muted'));
        });
    });
    $(".background.youtube").each(function() {
        $(".volume-button").on('click', function() {
            $('#video').toggleVolume();
            $(".volume-button").toggleClass('fa-volume-up').toggleClass('fa-volume-off');
        });

        function sh1() {
            $('#video').playYTP();
            $(".stop-button").removeClass('fa-play');
            $(".stop-button").addClass('fa-pause');
        }

        function sh2() {
            $('#video').pauseYTP();
            $(".stop-button").removeClass('fa-pause');
            $(".stop-button").addClass('fa-play');
        }
        var fixpreparex = 0;
        if (fixpreparex == 0) {
            $(".stop-button").on('click', function() {
                fixpreparex = 1;
                sh2();
            });
        } else {}
        $('#video').on("YTPPause", function() {
            if (fixpreparex == 1) {
                $(".stop-button").on('click', function() {
                    fixpreparex = 2;
                    sh1();
                });
            } else {}
        });
        $('#video').on("YTPStart", function() {
            if (fixpreparex == 2) {
                $(".stop-button").on('click', function() {
                    fixpreparex = 1;
                    sh2();
                });
            } else {}
        });
    });
    $(".player").each(function() {
        $(".player").mb_YTPlayer();
    });
    $(".zoom").each(function() {
        $("#slider").kenburnsy({
            fullscreen: true
        });
    });
    $(".bubble").each(function() {
        $(".bubble").pobubble({
            color: "#ffffff",
            ammount: 7,
            min: .1,
            max: .3,
            time: 60,
            vertical: true,
            horizontal: true,
            style: 'circle'
        });
    });
    $(".slider").each(function() {
        $('#slider').phoenix({
            delay: 6000,
            fullscreen: true,
            dots: false,
            keys: false,
        });
    });
    $(".snow").each(function() {
        snowBind();
    });
    $(".star").each(function() {
        postars($('.cover')[0]).init();
    });
    $(".rain").each(function() {
        function getURLParameter(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
        }
        var image = document.getElementById('background');
        image.onload = function() {
            var engine = new RainyDay('rain', 'background', window.innerWidth, window.innerHeight, 1, getURLParameter("blur") || 15);
            var preset = getURLParameter("preset") || 1;
            if (preset == 1) {
                engine.gravity = engine.GRAVITY_NON_LINEAR;
                engine.trail = engine.TRAIL_DROPS;
                engine.rain([engine.preset(3, 3, 0.88), engine.preset(5, 5, 0.9), engine.preset(6, 2, 1)], 100);
            } else if (preset == 2) {
                engine.gravity = engine.GRAVITY_NON_LINEAR;
                engine.trail = engine.TRAIL_DROPS;
                engine.VARIABLE_GRAVITY_ANGLE = Math.PI / 8;
                engine.rain([engine.preset(0, 2, 0.5), engine.preset(4, 4, 1)], 50);
            } else if (preset == 3) {
                engine.gravity = engine.GRAVITY_NON_LINEAR;
                engine.trail = engine.TRAIL_SMUDGE;
                engine.rain([engine.preset(0, 2, 0.5), engine.preset(4, 4, 1)], 50);
            }
        };
        image.crossOrigin = "anonymous";
        image.src = "asset/img/rain.jpg";
    });
    $(".origami").each(function() {
        var container = document.getElementById('origami');
        var worigmai = Math.floor(window.innerWidth / 65);
        var horigmai = Math.floor(window.innerHeight / 58);
        var renderer = new FSS.CanvasRenderer();
        var scene = new FSS.Scene();
        var light = new FSS.Light('#006fbe', '#f8a00');
        var geometry = new FSS.Plane(window.innerWidth, window.innerHeight, worigmai, horigmai);
        var material = new FSS.Material('#FFFFFF', '#FFFFFF');
        var mesh = new FSS.Mesh(geometry, material);
        var now, start = Date.now();

        function initialise() {
            scene.add(mesh);
            scene.add(light);
            container.appendChild(renderer.element);
            window.addEventListener('resize', resize);
        }

        function resize() {
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }

        function animate() {
            now = Date.now() - start;
            light.setPosition(300 * Math.sin(now * 0.001), 200 * Math.cos(now * 0.0005), 60);
            renderer.render(scene);
            requestAnimationFrame(animate);
        }
        initialise();
        resize();
        animate();
    });
    $(".textslider").each(function() {
        $('.textslider').flexslider({
            animation: "fade",
            animationLoop: true,
            slideshowSpeed: 5000,
            animationSpeed: 600,
            controlNav: false,
            directionNav: false,
            keyboard: false,
        });
    });
    $(".textrotate").each(function() {
        $(".textrotate").textrotator({
            animation: "flipUp",
            speed: 2500
        });
    });
    $(".portfolio-item").each(function() {
        $('.portfolio-item a').nivoLightbox({
            effect: 'slideDown'
        });
    });
    $("#counter").each(function() {
        $(window).resize(function() {
            $('#counter').TimeCircles().rebuild();
        });
        $("#counter").TimeCircles({
            "animation": "smooth",
            "bg_width": 0.4,
            "fg_width": 0.013333333333333334,
            "circle_bg_color": "rgba(0,0,0,0.5)",
            "time": {
                "Days": {
                    "text": "Days",
                    "color": "#000000",
                    "show": true
                },
                "Hours": {
                    "text": "Hours",
                    "color": "#000000",
                    "show": true
                },
                "Minutes": {
                    "text": "Minutes",
                    "color": "#000000",
                    "show": true
                },
                "Seconds": {
                    "text": "Seconds",
                    "color": "#000000",
                    "show": true
                }
            }
        });
    });
    $(".portfolio").each(function() {
        $(".portfolio").owlCarousel({
            items: 3,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [980, 2],
            itemsTablet: [768, 2],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            autoPlay: true,
            stopOnHover: false,
            pagination: true,
            paginationNumbers: false
        });
    });
    $(".features").each(function() {
        $(".features").owlCarousel({
            items: 3,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [980, 2],
            itemsTablet: [768, 2],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            autoPlay: true,
            stopOnHover: false,
            pagination: true,
            paginationNumbers: false
        });
    });
    $("section").niceScroll({
        cursorcolor: 'rgba(0,0,0,0.7)',
        cursorborder: '1px solid rgba(0,0,0,0.7)',
        cursoropacitymin: '0',
        cursoropacitymax: '1',
        cursorwidth: '3px',
        zindex: 9999999,
        horizrailenabled: false,
    });
    $("#contactform").each(function() {
        $('.contactform').validate({
            highlight: function(element, errorClass) {
                $(element).fadeOut(function() {
                    $(element).fadeIn();
                });
            },
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                subject: {
                    required: true,
                    minlength: 2
                },
                message: {
                    required: true,
                    minlength: 5
                }
            },
            messages: {
                name: "<i class='icon-caution'></i>",
                email: {
                    required: "<i class='icon-caution'></i>",
                    email: "<i class='icon-caution'></i>"
                },
                subject: "<i class='icon-caution'></i>",
                message: "<i class='icon-caution'></i>"
            },
            submitHandler: function(form) {

            	if($('#message').val().length<3 || $('#email').val().length<3){

            		alert("Please fill in the contact form");
            		return false;
            	}

                $(form).ajaxSubmit({
                    type: "POST",
                    data: {'email':$('#email').val(), 'msg':$('#message').val(), '_csrf':$('#csrfContact').val()},
                    url: "/api/messageUs",
                    complete: function() {
                        $('.contactform :input').attr('disabled', 'disabled');
                        $('.contactform').fadeTo("slow", 0.15, function() {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $("#contactform .waiting").delay(400).slideDown("slow");
                            $("#contactform .waiting").delay(1000).slideUp("fast");
                            $('.contact-message .alert-success').delay(1000).slideDown("slow");
                            $(".contact-message").delay(2000).slideDown("slow");
                            $(".contact-message").delay(7000).slideUp("slow");
                        });
                    },
                    /*: function() {
                        $('.contactform').fadeTo("slow", 0.15, function() {
                            $("#contactform .waiting").delay(400).slideDown("slow");
                            $("#contactform .waiting").delay(1000).slideUp("fast");
                            $('.contact-message .alert-danger').delay(1000).slideDown("slow");
                            $(".contact-message").delay(2000).slideDown("slow");
                            $(".contact-message").delay(7000).slideUp("slow");
                        });
                    }*/
                });
            }
        });
    });
    $("#subscribeform").each(function() {
        var $form = $('.subscribeform');
        $('.subscribeform .submit').on('click', function(event) {
            if (event)
                event.preventDefault();
            register($form);
        });

        function register($form) {

        	var theEmail = $('#subscribeform input').val();

        	if($('#subscribeform input').val().indexOf('@')==-1 || $('#subscribeform input').val().length<5){
        		alert("Please submit a valid e-mail address");
        		return false;
        	}
        	$('#subscribeform input').val('adding you...');
        	if(registerAlready==true){
        		alert("You are already registered");
        		return false;
        	}

        	registerAlready=true;
            $.ajax({
                type: 'GET',
                url: '/api/sendWelcome',
                data: {'email':theEmail},
                cache: false,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
               
                complete: function(data) {
                		

                		console.log(data.responseText)
                	
                      
                       setTimeout(function(){
                       	$('#subscribeform input').val(theEmail);
                       }, 2000)
                        $(".subscribe-message").delay(0).slideUp("fast");
                        $("#subscribeform .waiting").delay(0).slideDown("slow");
                        $("#subscribeform .waiting").delay(1).slideUp("fast");
                        $(".subscribe-message").delay(1500).slideDown("slow");
                        setTimeout(function() {
                            $('.subscribe-message').html('<div class="alert alert-success" role="alert"><i class="ion-happy-outline pull-left" aria-hidden="true"></i><span>' + 'Awesome! We sent you a confirmation email.</span></div>');
                        }, 100);
                        setTimeout(function() {
                            $('.subscribe-message').slideUp("slow")
                        }, 8000);
                
                }
            });
        }
    });
    $('.external').click(function(e) {
        e.preventDefault();
        $('a[href="' + $(this).attr('href') + '"]').tab('show');
    })
    $('.external').on('click', function() {
        setTimeout(function() {
            $('.cover-overlay').addClass('visible').css('visibility', 'visible');
        }, 0);
        setTimeout(function() {
            $('.cover-overlay').removeClass('visible').css('visibility', 'hidden');
        }, 900);
    });
    $('.navigation a').on('click', function() {
        setTimeout(function() {
            $("body").removeClass("end-loading")
        }, 100);
        setTimeout(function() {
            $('.nav-button').toggleClass('active');
        }, 200);
        setTimeout(function() {
            $('#header').toggleClass('visible');
        }, 200);
        setTimeout(function() {
            $("body").addClass("end-loading")
        }, 600);
    });
    $('.nav-button').on('click', function() {
        $(this).toggleClass('active');
        $('#header').toggleClass('visible');
    });
    $('.map-btn').on('click', function() {
        $('#map').toggleClass('visible');
        $('.map-content').toggleClass('visible');
        $('.overlay').toggleClass('visible');
        $('.close-button').toggleClass('visible');
    });
    $('.clock-btn').on('click', function() {
    	
    	 $('#map').toggleClass('visible');
        $('.map-content').toggleClass('visible');
        $('.overlay').toggleClass('visible');
        $('.close-button').toggleClass('visible');
    	/*
        $('#clock').toggleClass('visible');
        $('.clock-content').toggleClass('visible');
        $('.overlay').toggleClass('visible');
        $('.close-button').toggleClass('visible');
        */
    });
    $('.close-button').on('click', function() {
        $('.close-button').toggleClass('visible');
        $('.overlay').toggleClass('visible');
        if ($(".map-content").hasClass("visible")) {
            $(".map-content").toggleClass("visible");
        } else {
            $('.clock-content').toggleClass('visible');
        }
    });
    Modernizr.addTest('cssvhunit', function() {
        var bool;
        Modernizr.testStyles("#modernizr { height: 50vh; }", function(elem, rule) {
            var height = parseInt(window.innerHeight / 2, 10),
                compStyle = parseInt((window.getComputedStyle ? getComputedStyle(elem, null) : elem.currentStyle)["height"], 10);
            bool = !! (compStyle == height);
        });
        return bool;
    });
    $(function() {
        if (!Modernizr.cssvhunit) {
            var windowH = $(window).height();
            $('section,.intro,#map-content').css({
                'height': ($(window).height() - 40) + 'px'
            });
        }
    });
    Modernizr.addTest('csswidth', function() {
        var bool;
        Modernizr.testStyles("#modernizr { width: 50vw; }", function(elem, rule) {
            var width = parseInt(window.innerWidth / 2, 10),
                compStyle = parseInt((window.getComputedStyle ? getComputedStyle(elem, null) : elem.currentStyle)["width"], 10);
            bool = !! (compStyle == width);
        });
        return bool;
    });
    $(function() {
        if (!Modernizr.csswidth) {
            var windowW = $(window).width();
            $('#map-content,.owl-carousel .owl-wrapper-outer').css({
                'width': ($(window).width() - 40) + 'px'
            });
        }
    });
});
