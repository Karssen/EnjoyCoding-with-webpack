var script =
webpackJsonp_name_([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Артем on 06.01.2016.
	 */
	'use strict';
	//require('../less/style.less');

	if (true) {
	    console.log('Some text');
	}

	var Swipe = __webpack_require__(5);
	var Modal = __webpack_require__(1);
	var MainMenu = __webpack_require__(2);
	var NavBar = __webpack_require__(3);

	exports.MainMenu = MainMenu; // экспортирует во внешний скрипт возможность использования нашего класса.

	document.addEventListener("DOMContentLoaded", ready);

	function ready() {
	    /* <nav class="main-navigation">
	         <ul class="main-navigation__list">
	         <li class="main-navigation__item"><a class="main-navigation__link" href="#">Пункт меню 1</a></li>
	     <li class="main-navigation__iteTm"><a class="main-navigation__link" href="#">Пункт меню 2</a></li>
	     <li class="main-navigation__item dropdown-item">
	         <a class="main-navigation__link" data-toggle="dropdown" href="#">Пункт меню 3
	     <span class="caret"></span>
	         </a>
	         <ul class="dropdown-menu">
	         <li class="dropdown-menu__item"><a class="dropdown-menu__link" href="#">1</a></li>
	     <li class="dropdown-menu__item"><a class="dropdown-menu__link" href="#">2</a></li>
	     <li class="dropdown-menu__item"><a class="dropdown-menu__link" href="#">3</a></li>
	     </ul>
	     </li>
	     <li class="main-navigation__item"><a class="main-navigation__link" href="#">Пункт меню 4</a></li>
	     <li class="main-navigation__item dropdown-item">
	         <a class="main-navigation__link" data-toggle="dropdown" href="#">Пункт меню 5
	     <span class="caret"></span>
	         </a>
	         <ul class="dropdown-menu">
	         <li class="dropdown-menu__item"><a class="dropdown-menu__link" href="#">1</a></li>
	     <li class="dropdown-menu__item dropdown-item">
	         <a class="main-navigation__link" data-toggle="dropdown" href="#">Пункт меню 3
	     <span class="caret"></span>
	         </a>
	         <ul class="dropdown-menu dropdown-menu--right">
	         <li class="dropdown-menu__item"><a class="dropdown-menu__link" href="#">1</a></li>
	     <li class="dropdown-menu__item"><a class="dropdown-menu__link" href="#">2</a></li>
	     <li class="dropdown-menu__item"><a class="dropdown-menu__link" href="#">3</a></li>
	     </ul>
	     </li>
	     <li class="dropdown-menu__item"><a class="dropdown-menu__link" href="#">3</a></li>
	     </ul>
	     </li>
	     </ul>
	     </nav>*/
	    document.addEventListener('click', onClick);

	    var mainMenuOptions = {
	        element: document.querySelector('.main-navigation')
	    };
	    var mainMenu = new MainMenu(mainMenuOptions);

	    function onClick(event) {
	        mainMenu.closeItem();
	    }

	    var slider = new Swipe(document.getElementById('slider'), {
	        startSlide: 1,
	        speed: 1000,
	        auto: 3000,
	        continuous: true,
	        disableScroll: false,
	        stopPropagation: false,
	        callback: function callback(index, elem) {},
	        transitionEnd: function transitionEnd(index, elem) {}
	    });

	    var modal = new Modal();

	    var navbarOptions = {
	        navbar: document.getElementById('nav-bar'),
	        menuContainer: document.getElementById('nav-bar__container')
	    };

	    var navBar = new NavBar(navbarOptions);
	    if (+window.innerWidth <= 768) {
	        navBar.navBarClose();
	    }
		}

/***/ },

/***/ 5:
/***/ function(module, exports) {

	'use strict';

	/**
	 * Created by ����� on 08.02.2016.
	 */

	module.exports = function Swipe(container, options) {

	    "use strict";

	    // utilities
	
	    var noop = function noop() {}; // simple no operation function
	    var offloadFn = function offloadFn(fn) {
	        setTimeout(fn || noop, 0);
	    }; // offload a functions execution

	    // check browser capabilities
	    var browser = {
	        addEventListener: !!window.addEventListener,
	        touch: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
	        transitions: function (temp) {
	            var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
	            for (var i in props) {
	                if (temp.style[props[i]] !== undefined) return true;
	            }return false;
	        }(document.createElement('swipe'))
	    };

	    // quit if no root element
	    if (!container) return;
	    var element = container.children[0];
	    var slides, slidePos, width, length;
	    options = options || {};
	    var index = parseInt(options.startSlide, 10) || 0;
	    var speed = options.speed || 300;
	    options.continuous = options.continuous !== undefined ? options.continuous : true;

	    function _setup() {

	        // cache slides
	        slides = element.children;
	        length = slides.length;

	        // set continuous to false if only one slide
	        if (slides.length < 2) options.continuous = false;

	        //special case if two slides
	        if (browser.transitions && options.continuous && slides.length < 3) {
	            element.appendChild(slides[0].cloneNode(true));
	            element.appendChild(element.children[1].cloneNode(true));
	            slides = element.children;
	        }

	        // create an array to store current positions of each slide
	        slidePos = new Array(slides.length);

	        // determine width of each slide
	        width = container.getBoundingClientRect().width || container.offsetWidth;

	        element.style.width = slides.length * width + 'px';

	        // stack elements
	        var pos = slides.length;
	        while (pos--) {

	            var slide = slides[pos];

	            slide.style.width = width + 'px';
	            slide.setAttribute('data-index', pos);

	            if (browser.transitions) {
	                slide.style.left = pos * -width + 'px';
	                move(pos, index > pos ? -width : index < pos ? width : 0, 0);
	            }
	        }

	        // reposition elements before and after index
	        if (options.continuous && browser.transitions) {
	            move(circle(index - 1), -width, 0);
	            move(circle(index + 1), width, 0);
	        }

	        if (!browser.transitions) element.style.left = index * -width + 'px';

	        container.style.visibility = 'visible';
	    }

	    function _prev() {

	        if (options.continuous) _slide(index - 1);else if (index) _slide(index - 1);
	    }

	    function _next() {

	        if (options.continuous) _slide(index + 1);else if (index < slides.length - 1) _slide(index + 1);
	    }

	    function circle(index) {

	        // a simple positive modulo using slides.length
	        return (slides.length + index % slides.length) % slides.length;
	    }

	    function _slide(to, slideSpeed) {

	        // do nothing if already on requested slide
	        if (index == to) return;

	        if (browser.transitions) {

	            var direction = Math.abs(index - to) / (index - to); // 1: backward, -1: forward

	            // get the actual position of the slide
	            if (options.continuous) {
	                var natural_direction = direction;
	                direction = -slidePos[circle(to)] / width;

	                // if going forward but to < index, use to = slides.length + to
	                // if going backward but to > index, use to = -slides.length + to
	                if (direction !== natural_direction) to = -direction * slides.length + to;
	            }

	            var diff = Math.abs(index - to) - 1;

	            // move all the slides between index and to in the right direction
	            while (diff--) {
	                move(circle((to > index ? to : index) - diff - 1), width * direction, 0);
	            }to = circle(to);

	            move(index, width * direction, slideSpeed || speed);
	            move(to, 0, slideSpeed || speed);

	            if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place
	        } else {
	
	                to = circle(to);
	                animate(index * -width, to * -width, slideSpeed || speed);
	                //no fallback for a circular continuous if the browser does not accept transitions
	            }

	        index = to;
	        offloadFn(options.callback && options.callback(index, slides[index]));
	    }

	    function move(index, dist, speed) {

	        translate(index, dist, speed);
	        slidePos[index] = dist;
	    }

	    function translate(index, dist, speed) {

	        var slide = slides[index];
	        var style = slide && slide.style;

	        if (!style) return;

	        style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = speed + 'ms';

	        style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
	        style.msTransform = style.MozTransform = style.OTransform = 'translateX(' + dist + 'px)';
	    }

	    function animate(from, to, speed) {

	        // if not an animation, just reposition
	        if (!speed) {

	            element.style.left = to + 'px';
	            return;
	        }

	        var start = +new Date();

	        var timer = setInterval(function () {

	            var timeElap = +new Date() - start;

	            if (timeElap > speed) {

	                element.style.left = to + 'px';

	                if (delay) begin();

	                options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

	                clearInterval(timer);
	                return;
	            }

	            element.style.left = (to - from) * (Math.floor(timeElap / speed * 100) / 100) + from + 'px';
	        }, 4);
	    }

	    // setup auto slideshow
	    var delay = options.auto || 0;
	    var interval;

	    function begin() {

	        interval = setTimeout(_next, delay);
	    }

	    function _stop() {

	        delay = 0;
	        clearTimeout(interval);
	    }

	    // setup initial vars
	    var _start = {};
	    var delta = {};
	    var isScrolling;

	    // setup event capturing
	    var events = {

	        handleEvent: function handleEvent(event) {

	            switch (event.type) {
	                case 'touchstart':
	                    this.start(event);break;
	                case 'touchmove':
	                    this.move(event);break;
	                case 'touchend':
	                    offloadFn(this.end(event));break;
	                case 'webkitTransitionEnd':
	                case 'msTransitionEnd':
	                case 'oTransitionEnd':
	                case 'otransitionend':
	                case 'transitionend':
	                    offloadFn(this.transitionEnd(event));break;
	                case 'resize':
	                    offloadFn(_setup);break;
	            }

	            if (options.stopPropagation) event.stopPropagation();
	        },
	        start: function start(event) {

	            var touches = event.touches[0];

	            // measure start values
	            _start = {

	                // get initial touch coords
	                x: touches.pageX,
	                y: touches.pageY,

	                // store time to determine touch duration
	                time: +new Date()

	            };

	            // used for testing first move event
	            isScrolling = undefined;

	            // reset delta and end measurements
	            delta = {};

	            // attach touchmove and touchend listeners
	            element.addEventListener('touchmove', this, false);
	            element.addEventListener('touchend', this, false);
	        },
	        move: function move(event) {

	            // ensure swiping with one touch and not pinching
	            if (event.touches.length > 1 || event.scale && event.scale !== 1) return;

	            if (options.disableScroll) event.preventDefault();

	            var touches = event.touches[0];

	            // measure change in x and y
	            delta = {
	                x: touches.pageX - _start.x,
	                y: touches.pageY - _start.y
	            };

	            // determine if scrolling test has run - one time test
	            if (typeof isScrolling == 'undefined') {
	                isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
	            }

	            // if user is not trying to scroll vertically
	            if (!isScrolling) {

	                // prevent native scrolling
	                event.preventDefault();

	                // stop slideshow
	                _stop();

	                // increase resistance if first or last slide
	                if (options.continuous) {
	                    // we don't add resistance at the end

	                    translate(circle(index - 1), delta.x + slidePos[circle(index - 1)], 0);
	                    translate(index, delta.x + slidePos[index], 0);
	                    translate(circle(index + 1), delta.x + slidePos[circle(index + 1)], 0);
	                } else {

	                    delta.x = delta.x / (!index && delta.x > 0 // if first slide and sliding left
	                     || index == slides.length - 1 // or if last slide and sliding right
	                     && delta.x < 0 // and if sliding at all
	                    ? Math.abs(delta.x) / width + 1 : // determine resistance level
	                    1); // no resistance if false

	                    // translate 1:1
	                    translate(index - 1, delta.x + slidePos[index - 1], 0);
	                    translate(index, delta.x + slidePos[index], 0);
	                    translate(index + 1, delta.x + slidePos[index + 1], 0);
	                }
	            }
	        },
	        end: function end(event) {

	            // measure duration
	            var duration = +new Date() - _start.time;

	            // determine if slide attempt triggers next/prev slide
	            var isValidSlide = Number(duration) < 250 // if slide duration is less than 250ms
	             && Math.abs(delta.x) > 20 // and if slide amt is greater than 20px
	             || Math.abs(delta.x) > width / 2; // or if slide amt is greater than half the width

	            // determine if slide attempt is past start and end
	            var isPastBounds = !index && delta.x > 0 // if first slide and slide amt is greater than 0
	             || index == slides.length - 1 && delta.x < 0; // or if last slide and slide amt is less than 0

	            if (options.continuous) isPastBounds = false;

	            // determine direction of swipe (true:right, false:left)
	            var direction = delta.x < 0;

	            // if not scrolling vertically
	            if (!isScrolling) {

	                if (isValidSlide && !isPastBounds) {

	                    if (direction) {

	                        if (options.continuous) {
	                            // we need to get the next in this direction in place

	                            move(circle(index - 1), -width, 0);
	                            move(circle(index + 2), width, 0);
	                        } else {
	                            move(index - 1, -width, 0);
	                        }

	                        move(index, slidePos[index] - width, speed);
	                        move(circle(index + 1), slidePos[circle(index + 1)] - width, speed);
	                        index = circle(index + 1);
	                    } else {
	                        if (options.continuous) {
	                            // we need to get the next in this direction in place

	                            move(circle(index + 1), width, 0);
	                            move(circle(index - 2), -width, 0);
	                        } else {
	                            move(index + 1, width, 0);
	                        }

	                        move(index, slidePos[index] + width, speed);
	                        move(circle(index - 1), slidePos[circle(index - 1)] + width, speed);
	                        index = circle(index - 1);
	                    }

	                    options.callback && options.callback(index, slides[index]);
	                } else {

	                    if (options.continuous) {

	                        move(circle(index - 1), -width, speed);
	                        move(index, 0, speed);
	                        move(circle(index + 1), width, speed);
	                    } else {

	                        move(index - 1, -width, speed);
	                        move(index, 0, speed);
	                        move(index + 1, width, speed);
	                    }
	                }
	            }

	            // kill touchmove and touchend event listeners until touchstart called again
	            element.removeEventListener('touchmove', events, false);
	            element.removeEventListener('touchend', events, false);
	        },
	        transitionEnd: function transitionEnd(event) {

	            if (parseInt(event.target.getAttribute('data-index'), 10) == index) {

	                if (delay) begin();

	                options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
	            }
	        }

	    };

	    // trigger setup
	    _setup();

	    // start auto slideshow if applicable
	    if (delay) begin();

	    // add event listeners
	    if (browser.addEventListener) {

	        // set touchstart event on element
	        if (browser.touch) element.addEventListener('touchstart', events, false);

	        if (browser.transitions) {
	            element.addEventListener('webkitTransitionEnd', events, false);
	            element.addEventListener('msTransitionEnd', events, false);
	            element.addEventListener('oTransitionEnd', events, false);
	            element.addEventListener('otransitionend', events, false);
	            element.addEventListener('transitionend', events, false);
	        }

	        // set resize event on window
	        window.addEventListener('resize', events, false);
	    } else {

	        window.onresize = function () {
	            _setup();
	        }; // to play nice with old IE
	    }
	
	    // expose the Swipe API
	    return {
	        setup: function setup() {

	            _setup();
	        },
	        slide: function slide(to, speed) {

	            // cancel slideshow
	            _stop();

	            _slide(to, speed);
	        },
	        prev: function prev() {

	            // cancel slideshow
	            _stop();

	            _prev();
	        },
	        next: function next() {

	            // cancel slideshow
	            _stop();

	            _next();
	        },
	        stop: function stop() {

	            // cancel slideshow
	            _stop();
	        },
	        getPos: function getPos() {

	            // return current index position
	            return index;
	        },
	        getNumSlides: function getNumSlides() {

	            // return total number of slides
	            return length;
	        },
	        kill: function kill() {

	            // cancel slideshow
	            _stop();

	            // reset element
	            element.style.width = '';
	            element.style.left = '';

	            // reset slides
	            var pos = slides.length;
	            while (pos--) {

	                var slide = slides[pos];
	                slide.style.width = '';
	                slide.style.left = '';

	                if (browser.transitions) translate(pos, 0, 0);
	            }

	            // removed event listeners
	            if (browser.addEventListener) {

	                // remove current event listeners
	                element.removeEventListener('touchstart', events, false);
	                element.removeEventListener('webkitTransitionEnd', events, false);
	                element.removeEventListener('msTransitionEnd', events, false);
	                element.removeEventListener('oTransitionEnd', events, false);
	                element.removeEventListener('otransitionend', events, false);
	                element.removeEventListener('transitionend', events, false);
	                window.removeEventListener('resize', events, false);
	            } else {

	                window.onresize = null;
	            }
	        }
	    };
	};

	if (window.jQuery || window.Zepto) {
	    (function ($) {
	        $.fn.Swipe = function (params) {
	            return this.each(function () {
	                $(this).data('Swipe', new Swipe($(this)[0], params));
	            });
	        };
	    })(window.jQuery || window.Zepto);
		}

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NvdXJjZS9qcy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vL3NvdXJjZS9qcy9zbGlkZXIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5INCQ0YDRgtC10Lwgb24gMDYuMDEuMjAxNi5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuLy9yZXF1aXJlKCcuLi9sZXNzL3N0eWxlLmxlc3MnKTtcblxuaWYoTk9ERV9FTlYgPT0gJ2RldmVsb3BtZW50Jyl7XG4gICAgY29uc29sZS5sb2coJ1NvbWUgdGV4dCcpO1xufVxuXG5sZXQgU3dpcGUgPSByZXF1aXJlKCcuL3NsaWRlci9pbmRleC5qcycpO1xubGV0IE1vZGFsID0gcmVxdWlyZSgnLi9tb2RhbC9pbmRleC5qcycpO1xubGV0IE1haW5NZW51ID0gcmVxdWlyZSgnLi9tZW51L2luZGV4LmpzJyk7XG5sZXQgTmF2QmFyID0gcmVxdWlyZSgnLi9uYXZiYXIvaW5kZXguanMnKTtcblxuZXhwb3J0cy5NYWluTWVudSA9IE1haW5NZW51OyAvLyDRjdC60YHQv9C+0YDRgtC40YDRg9C10YIg0LLQviDQstC90LXRiNC90LjQuSDRgdC60YDQuNC/0YIg0LLQvtC30LzQvtC20L3QvtGB0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDQvdCw0YjQtdCz0L4g0LrQu9Cw0YHRgdCwLlxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCByZWFkeSk7XG5cbmZ1bmN0aW9uIHJlYWR5KCl7XG4gICAvKiA8bmF2IGNsYXNzPVwibWFpbi1uYXZpZ2F0aW9uXCI+XG4gICAgICAgIDx1bCBjbGFzcz1cIm1haW4tbmF2aWdhdGlvbl9fbGlzdFwiPlxuICAgICAgICA8bGkgY2xhc3M9XCJtYWluLW5hdmlnYXRpb25fX2l0ZW1cIj48YSBjbGFzcz1cIm1haW4tbmF2aWdhdGlvbl9fbGlua1wiIGhyZWY9XCIjXCI+0J/Rg9C90LrRgiDQvNC10L3RjiAxPC9hPjwvbGk+XG4gICAgPGxpIGNsYXNzPVwibWFpbi1uYXZpZ2F0aW9uX19pdGVUbVwiPjxhIGNsYXNzPVwibWFpbi1uYXZpZ2F0aW9uX19saW5rXCIgaHJlZj1cIiNcIj7Qn9GD0L3QutGCINC80LXQvdGOIDI8L2E+PC9saT5cbiAgICA8bGkgY2xhc3M9XCJtYWluLW5hdmlnYXRpb25fX2l0ZW0gZHJvcGRvd24taXRlbVwiPlxuICAgICAgICA8YSBjbGFzcz1cIm1haW4tbmF2aWdhdGlvbl9fbGlua1wiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBocmVmPVwiI1wiPtCf0YPQvdC60YIg0LzQtdC90Y4gM1xuICAgIDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPlxuICAgICAgICA8bGkgY2xhc3M9XCJkcm9wZG93bi1tZW51X19pdGVtXCI+PGEgY2xhc3M9XCJkcm9wZG93bi1tZW51X19saW5rXCIgaHJlZj1cIiNcIj4xPC9hPjwvbGk+XG4gICAgPGxpIGNsYXNzPVwiZHJvcGRvd24tbWVudV9faXRlbVwiPjxhIGNsYXNzPVwiZHJvcGRvd24tbWVudV9fbGlua1wiIGhyZWY9XCIjXCI+MjwvYT48L2xpPlxuICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLW1lbnVfX2l0ZW1cIj48YSBjbGFzcz1cImRyb3Bkb3duLW1lbnVfX2xpbmtcIiBocmVmPVwiI1wiPjM8L2E+PC9saT5cbiAgICA8L3VsPlxuICAgIDwvbGk+XG4gICAgPGxpIGNsYXNzPVwibWFpbi1uYXZpZ2F0aW9uX19pdGVtXCI+PGEgY2xhc3M9XCJtYWluLW5hdmlnYXRpb25fX2xpbmtcIiBocmVmPVwiI1wiPtCf0YPQvdC60YIg0LzQtdC90Y4gNDwvYT48L2xpPlxuICAgIDxsaSBjbGFzcz1cIm1haW4tbmF2aWdhdGlvbl9faXRlbSBkcm9wZG93bi1pdGVtXCI+XG4gICAgICAgIDxhIGNsYXNzPVwibWFpbi1uYXZpZ2F0aW9uX19saW5rXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGhyZWY9XCIjXCI+0J/Rg9C90LrRgiDQvNC10L3RjiA1XG4gICAgPHNwYW4gY2xhc3M9XCJjYXJldFwiPjwvc3Bhbj5cbiAgICAgICAgPC9hPlxuICAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XG4gICAgICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLW1lbnVfX2l0ZW1cIj48YSBjbGFzcz1cImRyb3Bkb3duLW1lbnVfX2xpbmtcIiBocmVmPVwiI1wiPjE8L2E+PC9saT5cbiAgICA8bGkgY2xhc3M9XCJkcm9wZG93bi1tZW51X19pdGVtIGRyb3Bkb3duLWl0ZW1cIj5cbiAgICAgICAgPGEgY2xhc3M9XCJtYWluLW5hdmlnYXRpb25fX2xpbmtcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgaHJlZj1cIiNcIj7Qn9GD0L3QutGCINC80LXQvdGOIDNcbiAgICA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPlxuICAgICAgICA8L2E+XG4gICAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS0tcmlnaHRcIj5cbiAgICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24tbWVudV9faXRlbVwiPjxhIGNsYXNzPVwiZHJvcGRvd24tbWVudV9fbGlua1wiIGhyZWY9XCIjXCI+MTwvYT48L2xpPlxuICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLW1lbnVfX2l0ZW1cIj48YSBjbGFzcz1cImRyb3Bkb3duLW1lbnVfX2xpbmtcIiBocmVmPVwiI1wiPjI8L2E+PC9saT5cbiAgICA8bGkgY2xhc3M9XCJkcm9wZG93bi1tZW51X19pdGVtXCI+PGEgY2xhc3M9XCJkcm9wZG93bi1tZW51X19saW5rXCIgaHJlZj1cIiNcIj4zPC9hPjwvbGk+XG4gICAgPC91bD5cbiAgICA8L2xpPlxuICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLW1lbnVfX2l0ZW1cIj48YSBjbGFzcz1cImRyb3Bkb3duLW1lbnVfX2xpbmtcIiBocmVmPVwiI1wiPjM8L2E+PC9saT5cbiAgICA8L3VsPlxuICAgIDwvbGk+XG4gICAgPC91bD5cbiAgICA8L25hdj4qL1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XG5cbiAgICBsZXQgbWFpbk1lbnVPcHRpb25zID0ge1xuICAgICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1uYXZpZ2F0aW9uJylcbiAgICB9O1xuICAgIGxldCBtYWluTWVudSA9IG5ldyBNYWluTWVudShtYWluTWVudU9wdGlvbnMpO1xuXG4gICAgZnVuY3Rpb24gb25DbGljayhldmVudCl7XG4gICAgICAgIG1haW5NZW51LmNsb3NlSXRlbSgpO1xuICAgIH1cblxuICAgIGxldCBzbGlkZXIgPSBuZXcgU3dpcGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcicpLCB7XG4gICAgICAgIHN0YXJ0U2xpZGU6IDEsXG4gICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICBhdXRvOiAzMDAwLFxuICAgICAgICBjb250aW51b3VzOiB0cnVlLFxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZSxcbiAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiBmYWxzZSxcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKGluZGV4LCBlbGVtKSB7fSxcbiAgICAgICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24oaW5kZXgsIGVsZW0pIHt9XG4gICAgfSk7XG5cbiAgICBsZXQgbW9kYWwgPSBuZXcgTW9kYWwoKTtcblxuICAgIGxldCBuYXZiYXJPcHRpb25zID0ge1xuICAgICAgbmF2YmFyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2LWJhcicpLFxuICAgICAgICBtZW51Q29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2LWJhcl9fY29udGFpbmVyJylcbiAgICB9O1xuXG4gICAgbGV0IG5hdkJhciA9IG5ldyBOYXZCYXIobmF2YmFyT3B0aW9ucyk7XG4gICAgaWYoK3dpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCl7XG4gICAgICAgIG5hdkJhci5uYXZCYXJDbG9zZSgpO1xuICAgIH1cblxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNvdXJjZS9qcy9zY3JpcHQuanNcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSDvv73vv73vv73vv73vv70gb24gMDguMDIuMjAxNi5cclxuICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFN3aXBlKGNvbnRhaW5lciwgb3B0aW9ucykge1xyXG5cclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8vIHV0aWxpdGllc1xyXG4gICAgdmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9OyAvLyBzaW1wbGUgbm8gb3BlcmF0aW9uIGZ1bmN0aW9uXHJcbiAgICB2YXIgb2ZmbG9hZEZuID0gZnVuY3Rpb24oZm4pIHsgc2V0VGltZW91dChmbiB8fCBub29wLCAwKSB9OyAvLyBvZmZsb2FkIGEgZnVuY3Rpb25zIGV4ZWN1dGlvblxyXG5cclxuICAgIC8vIGNoZWNrIGJyb3dzZXIgY2FwYWJpbGl0aWVzXHJcbiAgICB2YXIgYnJvd3NlciA9IHtcclxuICAgICAgICBhZGRFdmVudExpc3RlbmVyOiAhIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyLFxyXG4gICAgICAgIHRvdWNoOiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gsXHJcbiAgICAgICAgdHJhbnNpdGlvbnM6IChmdW5jdGlvbih0ZW1wKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9wcyA9IFsndHJhbnNpdGlvblByb3BlcnR5JywgJ1dlYmtpdFRyYW5zaXRpb24nLCAnTW96VHJhbnNpdGlvbicsICdPVHJhbnNpdGlvbicsICdtc1RyYW5zaXRpb24nXTtcclxuICAgICAgICAgICAgZm9yICggdmFyIGkgaW4gcHJvcHMgKSBpZiAodGVtcC5zdHlsZVsgcHJvcHNbaV0gXSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N3aXBlJykpXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHF1aXQgaWYgbm8gcm9vdCBlbGVtZW50XHJcbiAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG4gICAgdmFyIGVsZW1lbnQgPSBjb250YWluZXIuY2hpbGRyZW5bMF07XHJcbiAgICB2YXIgc2xpZGVzLCBzbGlkZVBvcywgd2lkdGgsIGxlbmd0aDtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgdmFyIGluZGV4ID0gcGFyc2VJbnQob3B0aW9ucy5zdGFydFNsaWRlLCAxMCkgfHwgMDtcclxuICAgIHZhciBzcGVlZCA9IG9wdGlvbnMuc3BlZWQgfHwgMzAwO1xyXG4gICAgb3B0aW9ucy5jb250aW51b3VzID0gb3B0aW9ucy5jb250aW51b3VzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNvbnRpbnVvdXMgOiB0cnVlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldHVwKCkge1xyXG5cclxuICAgICAgICAvLyBjYWNoZSBzbGlkZXNcclxuICAgICAgICBzbGlkZXMgPSBlbGVtZW50LmNoaWxkcmVuO1xyXG4gICAgICAgIGxlbmd0aCA9IHNsaWRlcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIC8vIHNldCBjb250aW51b3VzIHRvIGZhbHNlIGlmIG9ubHkgb25lIHNsaWRlXHJcbiAgICAgICAgaWYgKHNsaWRlcy5sZW5ndGggPCAyKSBvcHRpb25zLmNvbnRpbnVvdXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy9zcGVjaWFsIGNhc2UgaWYgdHdvIHNsaWRlc1xyXG4gICAgICAgIGlmIChicm93c2VyLnRyYW5zaXRpb25zICYmIG9wdGlvbnMuY29udGludW91cyAmJiBzbGlkZXMubGVuZ3RoIDwgMykge1xyXG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHNsaWRlc1swXS5jbG9uZU5vZGUodHJ1ZSkpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQuY2hpbGRyZW5bMV0uY2xvbmVOb2RlKHRydWUpKTtcclxuICAgICAgICAgICAgc2xpZGVzID0gZWxlbWVudC5jaGlsZHJlbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhbiBhcnJheSB0byBzdG9yZSBjdXJyZW50IHBvc2l0aW9ucyBvZiBlYWNoIHNsaWRlXHJcbiAgICAgICAgc2xpZGVQb3MgPSBuZXcgQXJyYXkoc2xpZGVzLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIGRldGVybWluZSB3aWR0aCBvZiBlYWNoIHNsaWRlXHJcbiAgICAgICAgd2lkdGggPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggfHwgY29udGFpbmVyLm9mZnNldFdpZHRoO1xyXG5cclxuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gKHNsaWRlcy5sZW5ndGggKiB3aWR0aCkgKyAncHgnO1xyXG5cclxuICAgICAgICAvLyBzdGFjayBlbGVtZW50c1xyXG4gICAgICAgIHZhciBwb3MgPSBzbGlkZXMubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlKHBvcy0tKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2xpZGUgPSBzbGlkZXNbcG9zXTtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBwb3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJyb3dzZXIudHJhbnNpdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnN0eWxlLmxlZnQgPSAocG9zICogLXdpZHRoKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICBtb3ZlKHBvcywgaW5kZXggPiBwb3MgPyAtd2lkdGggOiAoaW5kZXggPCBwb3MgPyB3aWR0aCA6IDApLCAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlcG9zaXRpb24gZWxlbWVudHMgYmVmb3JlIGFuZCBhZnRlciBpbmRleFxyXG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMgJiYgYnJvd3Nlci50cmFuc2l0aW9ucykge1xyXG4gICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleC0xKSwgLXdpZHRoLCAwKTtcclxuICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMSksIHdpZHRoLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghYnJvd3Nlci50cmFuc2l0aW9ucykgZWxlbWVudC5zdHlsZS5sZWZ0ID0gKGluZGV4ICogLXdpZHRoKSArICdweCc7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcmV2KCkge1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSBzbGlkZShpbmRleC0xKTtcclxuICAgICAgICBlbHNlIGlmIChpbmRleCkgc2xpZGUoaW5kZXgtMSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHNsaWRlKGluZGV4KzEpO1xyXG4gICAgICAgIGVsc2UgaWYgKGluZGV4IDwgc2xpZGVzLmxlbmd0aCAtIDEpIHNsaWRlKGluZGV4KzEpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaXJjbGUoaW5kZXgpIHtcclxuXHJcbiAgICAgICAgLy8gYSBzaW1wbGUgcG9zaXRpdmUgbW9kdWxvIHVzaW5nIHNsaWRlcy5sZW5ndGhcclxuICAgICAgICByZXR1cm4gKHNsaWRlcy5sZW5ndGggKyAoaW5kZXggJSBzbGlkZXMubGVuZ3RoKSkgJSBzbGlkZXMubGVuZ3RoO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzbGlkZSh0bywgc2xpZGVTcGVlZCkge1xyXG5cclxuICAgICAgICAvLyBkbyBub3RoaW5nIGlmIGFscmVhZHkgb24gcmVxdWVzdGVkIHNsaWRlXHJcbiAgICAgICAgaWYgKGluZGV4ID09IHRvKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChicm93c2VyLnRyYW5zaXRpb25zKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gTWF0aC5hYnMoaW5kZXgtdG8pIC8gKGluZGV4LXRvKTsgLy8gMTogYmFja3dhcmQsIC0xOiBmb3J3YXJkXHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGFjdHVhbCBwb3NpdGlvbiBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5hdHVyYWxfZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gLXNsaWRlUG9zW2NpcmNsZSh0byldIC8gd2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgZ29pbmcgZm9yd2FyZCBidXQgdG8gPCBpbmRleCwgdXNlIHRvID0gc2xpZGVzLmxlbmd0aCArIHRvXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBnb2luZyBiYWNrd2FyZCBidXQgdG8gPiBpbmRleCwgdXNlIHRvID0gLXNsaWRlcy5sZW5ndGggKyB0b1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiAhPT0gbmF0dXJhbF9kaXJlY3Rpb24pIHRvID0gIC1kaXJlY3Rpb24gKiBzbGlkZXMubGVuZ3RoICsgdG87XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZGlmZiA9IE1hdGguYWJzKGluZGV4LXRvKSAtIDE7XHJcblxyXG4gICAgICAgICAgICAvLyBtb3ZlIGFsbCB0aGUgc2xpZGVzIGJldHdlZW4gaW5kZXggYW5kIHRvIGluIHRoZSByaWdodCBkaXJlY3Rpb25cclxuICAgICAgICAgICAgd2hpbGUgKGRpZmYtLSkgbW92ZSggY2lyY2xlKCh0byA+IGluZGV4ID8gdG8gOiBpbmRleCkgLSBkaWZmIC0gMSksIHdpZHRoICogZGlyZWN0aW9uLCAwKTtcclxuXHJcbiAgICAgICAgICAgIHRvID0gY2lyY2xlKHRvKTtcclxuXHJcbiAgICAgICAgICAgIG1vdmUoaW5kZXgsIHdpZHRoICogZGlyZWN0aW9uLCBzbGlkZVNwZWVkIHx8IHNwZWVkKTtcclxuICAgICAgICAgICAgbW92ZSh0bywgMCwgc2xpZGVTcGVlZCB8fCBzcGVlZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jb250aW51b3VzKSBtb3ZlKGNpcmNsZSh0byAtIGRpcmVjdGlvbiksIC0od2lkdGggKiBkaXJlY3Rpb24pLCAwKTsgLy8gd2UgbmVlZCB0byBnZXQgdGhlIG5leHQgaW4gcGxhY2VcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHRvID0gY2lyY2xlKHRvKTtcclxuICAgICAgICAgICAgYW5pbWF0ZShpbmRleCAqIC13aWR0aCwgdG8gKiAtd2lkdGgsIHNsaWRlU3BlZWQgfHwgc3BlZWQpO1xyXG4gICAgICAgICAgICAvL25vIGZhbGxiYWNrIGZvciBhIGNpcmN1bGFyIGNvbnRpbnVvdXMgaWYgdGhlIGJyb3dzZXIgZG9lcyBub3QgYWNjZXB0IHRyYW5zaXRpb25zXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbmRleCA9IHRvO1xyXG4gICAgICAgIG9mZmxvYWRGbihvcHRpb25zLmNhbGxiYWNrICYmIG9wdGlvbnMuY2FsbGJhY2soaW5kZXgsIHNsaWRlc1tpbmRleF0pKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3ZlKGluZGV4LCBkaXN0LCBzcGVlZCkge1xyXG5cclxuICAgICAgICB0cmFuc2xhdGUoaW5kZXgsIGRpc3QsIHNwZWVkKTtcclxuICAgICAgICBzbGlkZVBvc1tpbmRleF0gPSBkaXN0O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoaW5kZXgsIGRpc3QsIHNwZWVkKSB7XHJcblxyXG4gICAgICAgIHZhciBzbGlkZSA9IHNsaWRlc1tpbmRleF07XHJcbiAgICAgICAgdmFyIHN0eWxlID0gc2xpZGUgJiYgc2xpZGUuc3R5bGU7XHJcblxyXG4gICAgICAgIGlmICghc3R5bGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID1cclxuICAgICAgICAgICAgc3R5bGUuTW96VHJhbnNpdGlvbkR1cmF0aW9uID1cclxuICAgICAgICAgICAgICAgIHN0eWxlLm1zVHJhbnNpdGlvbkR1cmF0aW9uID1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZS5PVHJhbnNpdGlvbkR1cmF0aW9uID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gc3BlZWQgKyAnbXMnO1xyXG5cclxuICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBkaXN0ICsgJ3B4LDApJyArICd0cmFuc2xhdGVaKDApJztcclxuICAgICAgICBzdHlsZS5tc1RyYW5zZm9ybSA9XHJcbiAgICAgICAgICAgIHN0eWxlLk1velRyYW5zZm9ybSA9XHJcbiAgICAgICAgICAgICAgICBzdHlsZS5PVHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIGRpc3QgKyAncHgpJztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYW5pbWF0ZShmcm9tLCB0bywgc3BlZWQpIHtcclxuXHJcbiAgICAgICAgLy8gaWYgbm90IGFuIGFuaW1hdGlvbiwganVzdCByZXBvc2l0aW9uXHJcbiAgICAgICAgaWYgKCFzcGVlZCkge1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gdG8gKyAncHgnO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gK25ldyBEYXRlO1xyXG5cclxuICAgICAgICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aW1lRWxhcCA9ICtuZXcgRGF0ZSAtIHN0YXJ0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRpbWVFbGFwID4gc3BlZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSB0byArICdweCc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGF5KSBiZWdpbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9wdGlvbnMudHJhbnNpdGlvbkVuZCAmJiBvcHRpb25zLnRyYW5zaXRpb25FbmQuY2FsbChldmVudCwgaW5kZXgsIHNsaWRlc1tpbmRleF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gKCggKHRvIC0gZnJvbSkgKiAoTWF0aC5mbG9vcigodGltZUVsYXAgLyBzcGVlZCkgKiAxMDApIC8gMTAwKSApICsgZnJvbSkgKyAncHgnO1xyXG5cclxuICAgICAgICB9LCA0KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0dXAgYXV0byBzbGlkZXNob3dcclxuICAgIHZhciBkZWxheSA9IG9wdGlvbnMuYXV0byB8fCAwO1xyXG4gICAgdmFyIGludGVydmFsO1xyXG5cclxuICAgIGZ1bmN0aW9uIGJlZ2luKCkge1xyXG5cclxuICAgICAgICBpbnRlcnZhbCA9IHNldFRpbWVvdXQobmV4dCwgZGVsYXkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdG9wKCkge1xyXG5cclxuICAgICAgICBkZWxheSA9IDA7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGludGVydmFsKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHNldHVwIGluaXRpYWwgdmFyc1xyXG4gICAgdmFyIHN0YXJ0ID0ge307XHJcbiAgICB2YXIgZGVsdGEgPSB7fTtcclxuICAgIHZhciBpc1Njcm9sbGluZztcclxuXHJcbiAgICAvLyBzZXR1cCBldmVudCBjYXB0dXJpbmdcclxuICAgIHZhciBldmVudHMgPSB7XHJcblxyXG4gICAgICAgIGhhbmRsZUV2ZW50OiBmdW5jdGlvbihldmVudCkge1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0b3VjaHN0YXJ0JzogdGhpcy5zdGFydChldmVudCk7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndG91Y2htb3ZlJzogdGhpcy5tb3ZlKGV2ZW50KTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0b3VjaGVuZCc6IG9mZmxvYWRGbih0aGlzLmVuZChldmVudCkpOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3dlYmtpdFRyYW5zaXRpb25FbmQnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbXNUcmFuc2l0aW9uRW5kJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ29UcmFuc2l0aW9uRW5kJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ290cmFuc2l0aW9uZW5kJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RyYW5zaXRpb25lbmQnOiBvZmZsb2FkRm4odGhpcy50cmFuc2l0aW9uRW5kKGV2ZW50KSk7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncmVzaXplJzogb2ZmbG9hZEZuKHNldHVwKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnN0b3BQcm9wYWdhdGlvbikgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXNbMF07XHJcblxyXG4gICAgICAgICAgICAvLyBtZWFzdXJlIHN0YXJ0IHZhbHVlc1xyXG4gICAgICAgICAgICBzdGFydCA9IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgaW5pdGlhbCB0b3VjaCBjb29yZHNcclxuICAgICAgICAgICAgICAgIHg6IHRvdWNoZXMucGFnZVgsXHJcbiAgICAgICAgICAgICAgICB5OiB0b3VjaGVzLnBhZ2VZLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHN0b3JlIHRpbWUgdG8gZGV0ZXJtaW5lIHRvdWNoIGR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICB0aW1lOiArbmV3IERhdGVcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyB1c2VkIGZvciB0ZXN0aW5nIGZpcnN0IG1vdmUgZXZlbnRcclxuICAgICAgICAgICAgaXNTY3JvbGxpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyByZXNldCBkZWx0YSBhbmQgZW5kIG1lYXN1cmVtZW50c1xyXG4gICAgICAgICAgICBkZWx0YSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgLy8gYXR0YWNoIHRvdWNobW92ZSBhbmQgdG91Y2hlbmQgbGlzdGVuZXJzXHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcywgZmFsc2UpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcywgZmFsc2UpO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBlbnN1cmUgc3dpcGluZyB3aXRoIG9uZSB0b3VjaCBhbmQgbm90IHBpbmNoaW5nXHJcbiAgICAgICAgICAgIGlmICggZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxIHx8IGV2ZW50LnNjYWxlICYmIGV2ZW50LnNjYWxlICE9PSAxKSByZXR1cm5cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRpc2FibGVTY3JvbGwpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXNbMF07XHJcblxyXG4gICAgICAgICAgICAvLyBtZWFzdXJlIGNoYW5nZSBpbiB4IGFuZCB5XHJcbiAgICAgICAgICAgIGRlbHRhID0ge1xyXG4gICAgICAgICAgICAgICAgeDogdG91Y2hlcy5wYWdlWCAtIHN0YXJ0LngsXHJcbiAgICAgICAgICAgICAgICB5OiB0b3VjaGVzLnBhZ2VZIC0gc3RhcnQueVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgaWYgc2Nyb2xsaW5nIHRlc3QgaGFzIHJ1biAtIG9uZSB0aW1lIHRlc3RcclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgaXNTY3JvbGxpbmcgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGlzU2Nyb2xsaW5nID0gISEoIGlzU2Nyb2xsaW5nIHx8IE1hdGguYWJzKGRlbHRhLngpIDwgTWF0aC5hYnMoZGVsdGEueSkgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgdXNlciBpcyBub3QgdHJ5aW5nIHRvIHNjcm9sbCB2ZXJ0aWNhbGx5XHJcbiAgICAgICAgICAgIGlmICghaXNTY3JvbGxpbmcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IG5hdGl2ZSBzY3JvbGxpbmdcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gc3RvcCBzbGlkZXNob3dcclxuICAgICAgICAgICAgICAgIHN0b3AoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpbmNyZWFzZSByZXNpc3RhbmNlIGlmIGZpcnN0IG9yIGxhc3Qgc2xpZGVcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIHsgLy8gd2UgZG9uJ3QgYWRkIHJlc2lzdGFuY2UgYXQgdGhlIGVuZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoY2lyY2xlKGluZGV4LTEpLCBkZWx0YS54ICsgc2xpZGVQb3NbY2lyY2xlKGluZGV4LTEpXSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKGluZGV4LCBkZWx0YS54ICsgc2xpZGVQb3NbaW5kZXhdLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoY2lyY2xlKGluZGV4KzEpLCBkZWx0YS54ICsgc2xpZGVQb3NbY2lyY2xlKGluZGV4KzEpXSwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEueCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhLnggL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoICghaW5kZXggJiYgZGVsdGEueCA+IDAgICAgICAgICAgICAgICAvLyBpZiBmaXJzdCBzbGlkZSBhbmQgc2xpZGluZyBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBpbmRleCA9PSBzbGlkZXMubGVuZ3RoIC0gMSAgICAgICAgLy8gb3IgaWYgbGFzdCBzbGlkZSBhbmQgc2xpZGluZyByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZGVsdGEueCA8IDAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBpZiBzbGlkaW5nIGF0IGFsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICggTWF0aC5hYnMoZGVsdGEueCkgLyB3aWR0aCArIDEgKSAgICAgIC8vIGRldGVybWluZSByZXNpc3RhbmNlIGxldmVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDEgKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBubyByZXNpc3RhbmNlIGlmIGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSAxOjFcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoaW5kZXgtMSwgZGVsdGEueCArIHNsaWRlUG9zW2luZGV4LTFdLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoaW5kZXgsIGRlbHRhLnggKyBzbGlkZVBvc1tpbmRleF0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZShpbmRleCsxLCBkZWx0YS54ICsgc2xpZGVQb3NbaW5kZXgrMV0sIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuZDogZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIG1lYXN1cmUgZHVyYXRpb25cclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gK25ldyBEYXRlIC0gc3RhcnQudGltZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRldGVybWluZSBpZiBzbGlkZSBhdHRlbXB0IHRyaWdnZXJzIG5leHQvcHJldiBzbGlkZVxyXG4gICAgICAgICAgICB2YXIgaXNWYWxpZFNsaWRlID1cclxuICAgICAgICAgICAgICAgIE51bWJlcihkdXJhdGlvbikgPCAyNTAgICAgICAgICAgICAgICAvLyBpZiBzbGlkZSBkdXJhdGlvbiBpcyBsZXNzIHRoYW4gMjUwbXNcclxuICAgICAgICAgICAgICAgICYmIE1hdGguYWJzKGRlbHRhLngpID4gMjAgICAgICAgICAgICAvLyBhbmQgaWYgc2xpZGUgYW10IGlzIGdyZWF0ZXIgdGhhbiAyMHB4XHJcbiAgICAgICAgICAgICAgICB8fCBNYXRoLmFicyhkZWx0YS54KSA+IHdpZHRoLzI7ICAgICAgLy8gb3IgaWYgc2xpZGUgYW10IGlzIGdyZWF0ZXIgdGhhbiBoYWxmIHRoZSB3aWR0aFxyXG5cclxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHNsaWRlIGF0dGVtcHQgaXMgcGFzdCBzdGFydCBhbmQgZW5kXHJcbiAgICAgICAgICAgIHZhciBpc1Bhc3RCb3VuZHMgPVxyXG4gICAgICAgICAgICAgICAgIWluZGV4ICYmIGRlbHRhLnggPiAwICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGZpcnN0IHNsaWRlIGFuZCBzbGlkZSBhbXQgaXMgZ3JlYXRlciB0aGFuIDBcclxuICAgICAgICAgICAgICAgIHx8IGluZGV4ID09IHNsaWRlcy5sZW5ndGggLSAxICYmIGRlbHRhLnggPCAwOyAgICAvLyBvciBpZiBsYXN0IHNsaWRlIGFuZCBzbGlkZSBhbXQgaXMgbGVzcyB0aGFuIDBcclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbnRpbnVvdXMpIGlzUGFzdEJvdW5kcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIGRpcmVjdGlvbiBvZiBzd2lwZSAodHJ1ZTpyaWdodCwgZmFsc2U6bGVmdClcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRlbHRhLnggPCAwO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgbm90IHNjcm9sbGluZyB2ZXJ0aWNhbGx5XHJcbiAgICAgICAgICAgIGlmICghaXNTY3JvbGxpbmcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZFNsaWRlICYmICFpc1Bhc3RCb3VuZHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgeyAvLyB3ZSBuZWVkIHRvIGdldCB0aGUgbmV4dCBpbiB0aGlzIGRpcmVjdGlvbiBpbiBwbGFjZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4LTEpLCAtd2lkdGgsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgrMiksIHdpZHRoLCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlKGluZGV4LTEsIC13aWR0aCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUoaW5kZXgsIHNsaWRlUG9zW2luZGV4XS13aWR0aCwgc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleCsxKSwgc2xpZGVQb3NbY2lyY2xlKGluZGV4KzEpXS13aWR0aCwgc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGNpcmNsZShpbmRleCsxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykgeyAvLyB3ZSBuZWVkIHRvIGdldCB0aGUgbmV4dCBpbiB0aGlzIGRpcmVjdGlvbiBpbiBwbGFjZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzEpLCB3aWR0aCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlKGNpcmNsZShpbmRleC0yKSwgLXdpZHRoLCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlKGluZGV4KzEsIHdpZHRoLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZShpbmRleCwgc2xpZGVQb3NbaW5kZXhdK3dpZHRoLCBzcGVlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4LTEpLCBzbGlkZVBvc1tjaXJjbGUoaW5kZXgtMSldK3dpZHRoLCBzcGVlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gY2lyY2xlKGluZGV4LTEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2sgJiYgb3B0aW9ucy5jYWxsYmFjayhpbmRleCwgc2xpZGVzW2luZGV4XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29udGludW91cykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZShjaXJjbGUoaW5kZXgtMSksIC13aWR0aCwgc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlKGluZGV4LCAwLCBzcGVlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUoY2lyY2xlKGluZGV4KzEpLCB3aWR0aCwgc3BlZWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZShpbmRleC0xLCAtd2lkdGgsIHNwZWVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZShpbmRleCwgMCwgc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlKGluZGV4KzEsIHdpZHRoLCBzcGVlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGtpbGwgdG91Y2htb3ZlIGFuZCB0b3VjaGVuZCBldmVudCBsaXN0ZW5lcnMgdW50aWwgdG91Y2hzdGFydCBjYWxsZWQgYWdhaW5cclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBldmVudHMsIGZhbHNlKVxyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZXZlbnRzLCBmYWxzZSlcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmFuc2l0aW9uRW5kOiBmdW5jdGlvbihldmVudCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhcnNlSW50KGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApID09IGluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGF5KSBiZWdpbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9wdGlvbnMudHJhbnNpdGlvbkVuZCAmJiBvcHRpb25zLnRyYW5zaXRpb25FbmQuY2FsbChldmVudCwgaW5kZXgsIHNsaWRlc1tpbmRleF0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHRyaWdnZXIgc2V0dXBcclxuICAgIHNldHVwKCk7XHJcblxyXG4gICAgLy8gc3RhcnQgYXV0byBzbGlkZXNob3cgaWYgYXBwbGljYWJsZVxyXG4gICAgaWYgKGRlbGF5KSBiZWdpbigpO1xyXG5cclxuXHJcbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICBpZiAoYnJvd3Nlci5hZGRFdmVudExpc3RlbmVyKSB7XHJcblxyXG4gICAgICAgIC8vIHNldCB0b3VjaHN0YXJ0IGV2ZW50IG9uIGVsZW1lbnRcclxuICAgICAgICBpZiAoYnJvd3Nlci50b3VjaCkgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZXZlbnRzLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmIChicm93c2VyLnRyYW5zaXRpb25zKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21zVHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ29UcmFuc2l0aW9uRW5kJywgZXZlbnRzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignb3RyYW5zaXRpb25lbmQnLCBldmVudHMsIGZhbHNlKTtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZXZlbnRzLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZXQgcmVzaXplIGV2ZW50IG9uIHdpbmRvd1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBldmVudHMsIGZhbHNlKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7IHNldHVwKCkgfTsgLy8gdG8gcGxheSBuaWNlIHdpdGggb2xkIElFXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIGV4cG9zZSB0aGUgU3dpcGUgQVBJXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHNldHVwKCk7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKHRvLCBzcGVlZCkge1xyXG5cclxuICAgICAgICAgICAgLy8gY2FuY2VsIHNsaWRlc2hvd1xyXG4gICAgICAgICAgICBzdG9wKCk7XHJcblxyXG4gICAgICAgICAgICBzbGlkZSh0bywgc3BlZWQpO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHByZXY6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy8gY2FuY2VsIHNsaWRlc2hvd1xyXG4gICAgICAgICAgICBzdG9wKCk7XHJcblxyXG4gICAgICAgICAgICBwcmV2KCk7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjYW5jZWwgc2xpZGVzaG93XHJcbiAgICAgICAgICAgIHN0b3AoKTtcclxuXHJcbiAgICAgICAgICAgIG5leHQoKTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGNhbmNlbCBzbGlkZXNob3dcclxuICAgICAgICAgICAgc3RvcCgpO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFBvczogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvLyByZXR1cm4gY3VycmVudCBpbmRleCBwb3NpdGlvblxyXG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0TnVtU2xpZGVzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHJldHVybiB0b3RhbCBudW1iZXIgb2Ygc2xpZGVzXHJcbiAgICAgICAgICAgIHJldHVybiBsZW5ndGg7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBraWxsOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGNhbmNlbCBzbGlkZXNob3dcclxuICAgICAgICAgICAgc3RvcCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVzZXQgZWxlbWVudFxyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gJyc7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVzZXQgc2xpZGVzXHJcbiAgICAgICAgICAgIHZhciBwb3MgPSBzbGlkZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB3aGlsZShwb3MtLSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IHNsaWRlc1twb3NdO1xyXG4gICAgICAgICAgICAgICAgc2xpZGUuc3R5bGUud2lkdGggPSAnJztcclxuICAgICAgICAgICAgICAgIHNsaWRlLnN0eWxlLmxlZnQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYnJvd3Nlci50cmFuc2l0aW9ucykgdHJhbnNsYXRlKHBvcywgMCwgMCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyByZW1vdmVkIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgICAgICBpZiAoYnJvd3Nlci5hZGRFdmVudExpc3RlbmVyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBldmVudHMsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGV2ZW50cywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtc1RyYW5zaXRpb25FbmQnLCBldmVudHMsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb1RyYW5zaXRpb25FbmQnLCBldmVudHMsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3RyYW5zaXRpb25lbmQnLCBldmVudHMsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGV2ZW50cywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGV2ZW50cywgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub25yZXNpemUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcbmlmICggd2luZG93LmpRdWVyeSB8fCB3aW5kb3cuWmVwdG8gKSB7XHJcbiAgICAoZnVuY3Rpb24oJCkge1xyXG4gICAgICAgICQuZm4uU3dpcGUgPSBmdW5jdGlvbihwYXJhbXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZGF0YSgnU3dpcGUnLCBuZXcgU3dpcGUoJCh0aGlzKVswXSwgcGFyYW1zKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCB3aW5kb3cualF1ZXJ5IHx8IHdpbmRvdy5aZXB0byApXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzb3VyY2UvanMvc2xpZGVyL2luZGV4LmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQTs7O0FBR0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBREE7QUFuRUE7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTs7QUFIQTtBQUtBO0FBTEE7QUFNQTtBQUFBO0FBQ0E7O0FBUEE7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBSEE7QUFDQTs7QUFWQTtBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUxBO0FBQ0E7O0FBREE7QUFXQTtBQUNBO0FBQ0E7QUFIQTtBQUNBOztBQVhBO0FBQ0E7O0FBREE7QUFDQTtBQXFCQTtBQUNBOztBQXZCQTtBQTBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBUEE7QUFDQTs7QUEzQkE7QUEwQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFoREE7QUFDQTtBQW1EQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7O0FBRUE7QUFIQTtBQUNBO0FBTUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSEE7QUFNQTtBQUNBO0FBQ0E7OztBQUhBO0FBQUE7QUFDQTtBQVNBO0FBQ0E7O0FBaEJBO0FBa0JBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBekJBO0FBQUE7QUE2QkE7QUFDQTs7QUFIQTtBQUNBO0FBTUE7QUFDQTtBQXhDQTtBQUNBO0FBMENBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFkQTtBQUNBO0FBbUJB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