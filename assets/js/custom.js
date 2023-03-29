jQuery(document).ready(function() {
    jQuery('ul li a').click(function() {
        jQuery('li a').removeClass("active");
        jQuery(this).addClass("active");
    });
});

 

jQuery(document).ready(function() {
    (function () {
		
   //////////////////////
	// Utils
  //////////////////////
    function throttle(fn, delay, scope) {
        // Default delay
        delay = delay || 250;
        var last, defer;
        return function () {
            var context = scope || this,
                now = +new Date(),
                args = arguments;
            if (last && now < last + delay) {
                clearTimeout(defer);
                defer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, delay);
            } else {
                last = now;
                fn.apply(context, args);
            }
        }
    }

    function extend(destination, source) {
        for (var k in source) {
            if (source.hasOwnProperty(k)) {
                destination[k] = source[k];
            }
        }
        return destination;
    }
  
   //////////////////////
	// END Utils
  //////////////////////
  
   //////////////////////
   // Scroll Module
   //////////////////////

    var ScrollManager = (function () {

        var defaults = {

                steps: null,
                navigationContainer: null,
                links: null,
                scrollToTopBtn: null,

                navigationElementClass: '#Quick-navigation',
                currentStepClass: 'current',
                smoothScrollEnabled: true,
                stepsCheckEnabled: true,

                // Callbacks
                onScroll: null,

                onStepChange: function (step) {
                    var self = this;
                    var relativeLink = [].filter.call(options.links, function (link) {
                        link.classList.remove(self.currentStepClass);
                        return link.hash === '#' + step.id;
                    });
                    relativeLink[0].classList.add(self.currentStepClass);
                },

                // Provide a default scroll animation
                smoothScrollAnimation: function (target) {
                    $('html, body').animate({
                        scrollTop: target
                    }, 'slow');
                }
            },

            options = {};

        // Privates
        var _animation = null,
            currentStep = null,
            throttledGetScrollPosition = null;

        return {

            scrollPosition: 0,

            init: function (opts) {

                options = extend(defaults, opts);

                if (options.steps === null) {
                    console.warn('Smooth scrolling require some sections or steps to scroll to :)');
                    return false;
                }

                // Allow to customize the animation engine ( jQuery / GSAP / velocity / ... )
                _animation = function (target) {
                    target = typeof target === 'number' ? target : $(target).offset().top;
                    return options.smoothScrollAnimation(target);
                };

                // Activate smooth scrolling
                if (options.smoothScrollEnabled)  this.smoothScroll();

                // Scroll to top handling
                if (options.scrollToTopBtn) {
                    options.scrollToTopBtn.addEventListener('click', function () {
                        options.smoothScrollAnimation(0);
                    });
                }

                // Throttle for performances gain
                throttledGetScrollPosition = throttle(this.getScrollPosition).bind(this);
                window.addEventListener('scroll', throttledGetScrollPosition);
                window.addEventListener('resize', throttledGetScrollPosition);

                this.getScrollPosition();
            },

            getScrollPosition: function () {
                this.scrollPosition = window.pageYOffset || window.scrollY;
                if (options.stepsCheckEnabled) this.checkActiveStep();
                if (typeof  options.onScroll === 'function') options.onScroll(this.scrollPosition);
            },

            scrollPercentage: function () {
                var body = document.body,
                    html = document.documentElement,
                    documentHeight = Math.max(body.scrollHeight, body.offsetHeight,
                        html.clientHeight, html.scrollHeight, html.offsetHeight);

                var percentage = Math.round(this.scrollPosition / (documentHeight - window.innerHeight) * 100);
                if (percentage < 0)  percentage = 0;
                if (percentage > 100)  percentage = 100;
                return percentage;
            },

            doSmoothScroll: function (e) {
                if (e.target.nodeName === 'A') {
                    e.preventDefault();
                    if (location.pathname.replace(/^\//, '') === e.target.pathname.replace(/^\//, '') && location.hostname === e.target.hostname) {
                        var targetStep = document.querySelector(e.target.hash);
                        targetStep ? _animation(targetStep) : console.warn('Hi! You should give an animation callback function to the Scroller module! :)');
                    }
                }
            },

            smoothScroll: function () {
                if (options.navigationContainer !== null) options.navigationContainer.addEventListener('click', this.doSmoothScroll);
            },

            checkActiveStep: function () {
                var scrollPosition = this.scrollPosition;

                [].forEach.call(options.steps, function (step) {
                    var bBox = step.getBoundingClientRect(),
                        position = step.offsetTop,
                        height = position + bBox.height;

                    if (scrollPosition >= position && scrollPosition < height && currentStep !== step) {
                        currentStep = step;
                        step.classList.add(self.currentStepClass);
                        if (typeof options.onStepChange === 'function') options.onStepChange(step);
                    }
                    step.classList.remove(options.currentStepClass);
                });
            },

            destroy: function () {
                window.removeEventListener('scroll', throttledGetScrollPosition);
                window.removeEventListener('resize', throttledGetScrollPosition);
                options.navigationContainer.removeEventListener('click', this.doSmoothScroll);
            }
        }
    })();
     //////////////////////
     // END scroll Module
     //////////////////////
  
  
    //////////////////////
    // APP init
    //////////////////////
        steps = document.querySelectorAll('.js-scroll-step'),
        navigationContainer = document.querySelector('.Quick-navigation'),
        links = navigationContainer.querySelectorAll('a'),

    ScrollManager.init({
        steps: steps,
        links: links,
      
    });
  
    //////////////////////
    // END APP init
    //////////////////////

})();
});

$(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".animations", {
        scrollTrigger: {
            trigger: '.animations',
            pin: true,
            scrub: 1
        },
        scale: 0.5,
        duration: 1,
        opacity: 0
    });
});

$(document).ready(function () {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".our_ethos",
            start: "center bottom", //animation start
            end: "center center", //animation end
            scrub: true,
            pin: false
        }
    })
    .from('.ethos_img', { y: 50, opacity:0, duration: 0.4})
    .from('.ethos_heading', { y: -50, opacity:0, duration: 0.2}) 
    .from('.ethos_paragraph', { y: 50, opacity:0, duration: 0.4})
    
});

$(document).ready(function(){
    gsap.timeline({
        scrollTrigger: {
            trigger: ".inner_card",
            start: "center bottom", //animation start
            end: "center center", //animation end
            scrub: 1,
            pin: false
        }
    })
    .from('.img_sec', { y: -50, opacity: 0, duration: 0.2})
    .from('.cardanime1', { y: 50, opacity: 0, duration: 0.2})
    .from('.cardanime2', { y: 50, opacity: 0, duration: 0.2})
});

$(document).ready(function(){
    gsap.timeline({
        scrollTrigger: {
           // trigger: ".gemplay_section",
            start: "center bottom", //animation start
            end: "center center", //animation end
            scrub: 1,
            pin: false
        }
    })
    .from('.gemplay_anime', {y: 70, opacity: 0, duration: 0.2})
});

$(document).ready(function(){
    gsap.timeline({
        scrollTrigger: {
            trigger: ".action_section",
            start: "top bottom", //animation start
            end: "center center", //animation end
            scrub: 1,
            pin: false
        }
    })
    .from('.action_img', {x: -30, opacity: 0, duration: 0.2})
    .from('.action_content', {x: 20, opacity: 0, duration: 0.2})
    .from('.action_heading', {y: 15, opacity: 0, duration: 0.2})
    .from('.x', {y: 40, opacity: 0, duration: 0.2})
    .from('.y', {y: 35, opacity: 0, duration: 0.2})
    .from('.z', {y: 30, opacity: 0, duration: 0.2})
    .from('.l', {y: 25, opacity: 0, duration: 0.2})
});

$(document).ready(function(){
    gsap.timeline({
        scrollTrigger: {
            trigger: ".download_section",
            start: "center bottom", //animation start
            end: "center center", //animation end
            scrub: 1,
            pin: false
        }
    })
    .from('.download_heading', {y: -80, opacity: 0, duration: 0.2})
    .from('.textamimes', {y: 40, opacity: 0, duration: 0.2})
    .from('.textamimes2', {y: 40, opacity: 0, duration: 0.2})
    .from('.icon_animation', {y: 40, opacity: 0, duration: 0.2})
});



