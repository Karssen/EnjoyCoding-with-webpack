/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp_name_"];
/******/ 	window["webpackJsonp_name_"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		4:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"about","1":"contacts","2":"lessons","3":"script"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

	/**
	 * Created by ����� on 11.02.2016.
	 */
	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Modal = function () {
	        function Modal(options) {
	                _classCallCheck(this, Modal);

	                document.body.addEventListener('click', this._onModalOpenClick.bind(this));
	                document.body.addEventListener('click', this._onModalCloseClick.bind(this));
	                document.body.addEventListener('modalAppearence', this._onModalAppearance.bind(this));
	        }

	        _createClass(Modal, [{
	                key: '_onModalOpenClick',
	                value: function _onModalOpenClick(event) {
	                        var target = event.target;
	                        var modalOpen = target.closest('[data-role=modal-open]');
	                        var scrollWidth = this._findScrollWidth();

	                        if (!modalOpen) return;

	                        var href = modalOpen.getAttribute('href').slice(1);
	                        var modalWindow = document.getElementById(href);

	                        modalWindow.classList.add('modal--show');

	                        document.body.style.overflow = 'hidden';
	                        document.body.style.paddingRight = scrollWidth + 'px';

	                        var appearence = new CustomEvent('modalAppearence', {
	                                bubbles: true
	                        });

	                        modalWindow.dispatchEvent(appearence);
	                }
	        }, {
	                key: '_onModalCloseClick',
	                value: function _onModalCloseClick(event) {
	                        var target = event.target;
	                        var modalClose = target.closest('[data-role=modal-close]');

	                        if (!modalClose) return;

	                        var modalWindow = modalClose.closest('.modal');

	                        modalWindow.classList.remove('modal--show');
	                        document.body.style.overflow = '';
	                        document.body.style.paddingRight = '';

	                        var container = modalWindow.querySelector('.modal__container');

	                        container.style.visibility = 'hidden';
	                        container.style.height = '';
	                        container.style.width = '';
	                }
	        }, {
	                key: '_onModalAppearance',
	                value: function _onModalAppearance(event) {
	                        var target = event.target;
	                        var container = target.querySelector('.modal__container');
	                        var coords = container.getBoundingClientRect();
	                        var width = coords.width;
	                        var height = coords.height;
	                        var widthKef = undefined,
	                            heightKef = undefined;
	                        var time = 100;
	                        this._animate(function (timePassed) {
	                                widthKef = time / width;
	                                heightKef = time / height;

	                                container.style.visibility = 'visible';
	                                container.style.height = timePassed / heightKef + "px";
	                                container.style.width = timePassed / widthKef + "px";
	                        }, time);
	                }
	        }, {
	                key: '_animate',
	                value: function _animate(draw, duration) {
	                        var start = performance.now();

	                        requestAnimationFrame(function animate(time) {
	                                var timePassed = time - start;

	                                if (timePassed > duration) timePassed = duration;

	                                draw(timePassed);

	                                if (timePassed < duration) {
	                                        requestAnimationFrame(animate);
	                                }
	                        });
	                }
	        }, {
	                key: '_findScrollWidth',
	                value: function _findScrollWidth() {
	                        var div = document.createElement('div');

	                        div.style.overflowY = 'scroll';
	                        div.style.width = '50px';
	                        div.style.height = '50px';

	                        div.style.visibility = 'hidden';

	                        document.body.appendChild(div);
	                        var scrollWidth = div.offsetWidth - div.clientWidth;
	                        document.body.removeChild(div);

	                        return scrollWidth;
	                }
	        }]);

	        return Modal;
	}();

		module.exports = Modal;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by ����� on 15.01.2016.
	 */
	'use strict';
	//require('../../less/style.less');

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MainMenu = function () {
	    function MainMenu(options) {
	        _classCallCheck(this, MainMenu);

	        this._elem = options.element;

	        this._elem.addEventListener('click', this._onClick.bind(this));
	        this._elem.addEventListener('select', this._onItemSelect.bind(this));
	    }
	    //private method

	    _createClass(MainMenu, [{
	        key: '_onClick',
	        value: function _onClick(event) {
	            event.stopPropagation(); //����������� �������� ���� ���������� ����
	            var target = event.target;
	            var menuItem = target.closest('.main-navigation__item');
	            var dropDown = target.closest('[data-toggle=dropdown]');
	            var select = new CustomEvent('select', {
	                bubbles: true
	            });

	            menuItem.dispatchEvent(select);

	            if (!dropDown) {
	                return;
	            }

	            event.preventDefault();
	            var dropDownItem = dropDown.parentElement;
	            var dropDownMenu = dropDownItem.querySelector('.dropdown-menu');

	            dropDownMenu.classList.toggle('open');
	        }
	    }, {
	        key: '_onItemSelect',
	        value: function _onItemSelect(event) {
	            var target = event.target.closest('.dropdown-item');

	            if (!target) {
	                this.closeItem();
	            }
	        }

	        //public method

	    }, {
	        key: 'closeItem',
	        value: function closeItem() {
	            var allDropDowns = this._elem.querySelectorAll('.dropdown-menu');

	            [].forEach.call(allDropDowns, function (item, index, arr) {
	                if (item.classList.contains('open')) {
	                    item.classList.remove('open');
	                }
	            });
	        }
	    }]);

	    return MainMenu;
	}();

		module.exports = MainMenu;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by ����� on 15.02.2016.
	 */
	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavBar = function () {
	    function NavBar(options) {
	        _classCallCheck(this, NavBar);

	        this._navbar = options.navbar;
	        this._menuContainer = options.menuContainer;
	        this._expand = this._menuContainer.dataset.expand;

	        this._navbar.addEventListener('click', this._onNavBarClick.bind(this));
	        window.addEventListener('resize', this._onNavBarResize.bind(this));
	    }

	    _createClass(NavBar, [{
	        key: '_onNavBarClick',
	        value: function _onNavBarClick(event) {
	            var target = event.target;
	            var button = target.closest('.nav-bar--toggle');

	            if (!button) return;

	            $(this._menuContainer).slideToggle(500);
	        }
	    }, {
	        key: '_onNavBarResize',
	        value: function _onNavBarResize(event) {
	            var width = +window.innerWidth;

	            if (width > 768) {
	                this._menuContainer.removeAttribute('style');
	            } else {
	                this.navBarClose();
	            }
	        }
	    }, {
	        key: 'navBarClose',
	        value: function navBarClose() {
	            this._menuContainer.style.display = 'none';
	            this._expand = false;
	        }
	    }]);

	    return NavBar;
	}();

		module.exports = NavBar;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGU5MDc4ZjYzODhlNjA2OTU0OWRhIiwid2VicGFjazovLy9zb3VyY2UvanMvbW9kYWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL3NvdXJjZS9qcy9tZW51L2luZGV4LmpzIiwid2VicGFjazovLy9zb3VyY2UvanMvbmF2YmFyL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBfbmFtZV9cIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBfbmFtZV9cIl0gPSBmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhjaHVua0lkcywgbW9yZU1vZHVsZXMpIHtcbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCBjYWxsYmFja3MgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKVxuIFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2guYXBwbHkoY2FsbGJhY2tzLCBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pO1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihjaHVua0lkcywgbW9yZU1vZHVsZXMpO1xuIFx0XHR3aGlsZShjYWxsYmFja3MubGVuZ3RoKVxuIFx0XHRcdGNhbGxiYWNrcy5zaGlmdCgpLmNhbGwobnVsbCwgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdGlmKG1vcmVNb2R1bGVzWzBdKSB7XG4gXHRcdFx0aW5zdGFsbGVkTW9kdWxlc1swXSA9IDA7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyBcIjBcIiBtZWFucyBcImFscmVhZHkgbG9hZGVkXCJcbiBcdC8vIEFycmF5IG1lYW5zIFwibG9hZGluZ1wiLCBhcnJheSBjb250YWlucyBjYWxsYmFja3NcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdDQ6MFxuIFx0fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCwgY2FsbGJhY2spIHtcbiBcdFx0Ly8gXCIwXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMClcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBhbiBhcnJheSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdLnB1c2goY2FsbGJhY2spO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbY2FsbGJhY2tdO1xuIFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiBcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0c2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiBcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0c2NyaXB0LmFzeW5jID0gdHJ1ZTtcblxuIFx0XHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgKHtcIjBcIjpcImFib3V0XCIsXCIxXCI6XCJjb250YWN0c1wiLFwiMlwiOlwibGVzc29uc1wiLFwiM1wiOlwic2NyaXB0XCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCI7XG4gXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlOTA3OGY2Mzg4ZTYwNjk1NDlkYVxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IO+/ve+/ve+/ve+/ve+/vSBvbiAxMS4wMi4yMDE2LlxyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuY2xhc3MgTW9kYWx7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKXtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uTW9kYWxPcGVuQ2xpY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uTW9kYWxDbG9zZUNsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW9kYWxBcHBlYXJlbmNlJywgdGhpcy5fb25Nb2RhbEFwcGVhcmFuY2UuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTW9kYWxPcGVuQ2xpY2soZXZlbnQpe1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgbGV0IG1vZGFsT3BlbiA9IHRhcmdldC5jbG9zZXN0KCdbZGF0YS1yb2xlPW1vZGFsLW9wZW5dJyk7XHJcbiAgICAgICAgbGV0IHNjcm9sbFdpZHRoID0gdGhpcy5fZmluZFNjcm9sbFdpZHRoKCk7XHJcblxyXG4gICAgICAgIGlmKCFtb2RhbE9wZW4pIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGhyZWYgPSBtb2RhbE9wZW4uZ2V0QXR0cmlidXRlKCdocmVmJykuc2xpY2UoMSk7XHJcbiAgICAgICAgbGV0IG1vZGFsV2luZG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaHJlZik7XHJcblxyXG4gICAgICAgIG1vZGFsV2luZG93LmNsYXNzTGlzdC5hZGQoJ21vZGFsLS1zaG93Jyk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IHNjcm9sbFdpZHRoICsgJ3B4JztcclxuXHJcbiAgICAgICAgbGV0IGFwcGVhcmVuY2UgPSBuZXcgQ3VzdG9tRXZlbnQoJ21vZGFsQXBwZWFyZW5jZScsIHtcclxuICAgICAgICAgICAgYnViYmxlczogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtb2RhbFdpbmRvdy5kaXNwYXRjaEV2ZW50KGFwcGVhcmVuY2UpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBfb25Nb2RhbENsb3NlQ2xpY2soZXZlbnQpe1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgbGV0IG1vZGFsQ2xvc2UgPSB0YXJnZXQuY2xvc2VzdCgnW2RhdGEtcm9sZT1tb2RhbC1jbG9zZV0nKTtcclxuXHJcbiAgICAgICAgaWYoIW1vZGFsQ2xvc2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG1vZGFsV2luZG93ID0gbW9kYWxDbG9zZS5jbG9zZXN0KCcubW9kYWwnKTtcclxuXHJcbiAgICAgICAgbW9kYWxXaW5kb3cuY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWwtLXNob3cnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnJztcclxuXHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IG1vZGFsV2luZG93LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcnO1xyXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbk1vZGFsQXBwZWFyYW5jZShldmVudCl7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY29udGFpbmVyJyk7XHJcbiAgICAgICAgbGV0IGNvb3JkcyA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBsZXQgd2lkdGggPSBjb29yZHMud2lkdGg7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IGNvb3Jkcy5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHdpZHRoS2VmLCBoZWlnaHRLZWY7XHJcbiAgICAgICAgbGV0IHRpbWUgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0ZSgodGltZVBhc3NlZCkgPT4ge1xyXG4gICAgICAgICAgICB3aWR0aEtlZiA9IHRpbWUvd2lkdGg7XHJcbiAgICAgICAgICAgIGhlaWdodEtlZiA9IHRpbWUvaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB0aW1lUGFzc2VkL2hlaWdodEtlZiArIFwicHhcIjtcclxuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gdGltZVBhc3NlZC93aWR0aEtlZiArIFwicHhcIjtcclxuXHJcbiAgICAgICAgfSwgdGltZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9hbmltYXRlKGRyYXcsIGR1cmF0aW9uKXtcclxuICAgICAgICB2YXIgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uIGFuaW1hdGUodGltZSkge1xyXG4gICAgICAgICAgICB2YXIgdGltZVBhc3NlZCA9IHRpbWUgLSBzdGFydDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aW1lUGFzc2VkID4gZHVyYXRpb24pIHRpbWVQYXNzZWQgPSBkdXJhdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGRyYXcodGltZVBhc3NlZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGltZVBhc3NlZCA8IGR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2ZpbmRTY3JvbGxXaWR0aCgpe1xyXG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgZGl2LnN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xyXG4gICAgICAgIGRpdi5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG5cclxuICAgICAgICBkaXYuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgbGV0IHNjcm9sbFdpZHRoID0gZGl2Lm9mZnNldFdpZHRoIC0gZGl2LmNsaWVudFdpZHRoO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZGl2KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNjcm9sbFdpZHRoO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWw7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc291cmNlL2pzL21vZGFsL2luZGV4LmpzXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkg77+977+977+977+977+9IG9uIDE1LjAxLjIwMTYuXHJcbiAqL1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4vL3JlcXVpcmUoJy4uLy4uL2xlc3Mvc3R5bGUubGVzcycpO1xyXG5cclxuXHJcblxyXG5jbGFzcyBNYWluTWVudVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2VsZW0gPSBvcHRpb25zLmVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuX2VsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuX2VsZW0uYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0JywgdGhpcy5fb25JdGVtU2VsZWN0LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgLy9wcml2YXRlIG1ldGhvZFxyXG5cclxuICAgIF9vbkNsaWNrKGV2ZW50KXtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy/vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+9XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICBsZXQgbWVudUl0ZW0gPSB0YXJnZXQuY2xvc2VzdCgnLm1haW4tbmF2aWdhdGlvbl9faXRlbScpO1xyXG4gICAgICAgIGxldCBkcm9wRG93biA9IHRhcmdldC5jbG9zZXN0KCdbZGF0YS10b2dnbGU9ZHJvcGRvd25dJyk7XHJcbiAgICAgICAgbGV0IHNlbGVjdCA9IG5ldyBDdXN0b21FdmVudCgnc2VsZWN0Jywge1xyXG4gICAgICAgICAgICBidWJibGVzOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1lbnVJdGVtLmRpc3BhdGNoRXZlbnQoc2VsZWN0KTtcclxuXHJcbiAgICAgICAgaWYoIWRyb3BEb3duKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBsZXQgZHJvcERvd25JdGVtID0gZHJvcERvd24ucGFyZW50RWxlbWVudDtcclxuICAgICAgICBsZXQgZHJvcERvd25NZW51ID0gZHJvcERvd25JdGVtLnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1tZW51Jyk7XHJcblxyXG4gICAgICAgIGRyb3BEb3duTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9vbkl0ZW1TZWxlY3QoZXZlbnQpe1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmRyb3Bkb3duLWl0ZW0nKTtcclxuXHJcbiAgICAgICAgaWYoIXRhcmdldCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VJdGVtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9wdWJsaWMgbWV0aG9kXHJcblxyXG4gICAgY2xvc2VJdGVtKCl7XHJcbiAgICAgICAgbGV0IGFsbERyb3BEb3ducyA9IHRoaXMuX2VsZW0ucXVlcnlTZWxlY3RvckFsbCgnLmRyb3Bkb3duLW1lbnUnKTtcclxuXHJcbiAgICAgICAgW10uZm9yRWFjaC5jYWxsKGFsbERyb3BEb3ducywgZnVuY3Rpb24oaXRlbSxpbmRleCxhcnIpe1xyXG4gICAgICAgICAgICBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKXtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWFpbk1lbnU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc291cmNlL2pzL21lbnUvaW5kZXguanNcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSDvv73vv73vv73vv73vv70gb24gMTUuMDIuMjAxNi5cclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG5jbGFzcyBOYXZCYXJ7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKXtcclxuICAgICAgICB0aGlzLl9uYXZiYXIgPSBvcHRpb25zLm5hdmJhcjtcclxuICAgICAgICB0aGlzLl9tZW51Q29udGFpbmVyID0gb3B0aW9ucy5tZW51Q29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMuX2V4cGFuZCA9IHRoaXMuX21lbnVDb250YWluZXIuZGF0YXNldC5leHBhbmQ7XHJcblxyXG4gICAgICAgIHRoaXMuX25hdmJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uTmF2QmFyQ2xpY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX29uTmF2QmFyUmVzaXplLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbk5hdkJhckNsaWNrKGV2ZW50KXtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGxldCBidXR0b24gPSB0YXJnZXQuY2xvc2VzdCgnLm5hdi1iYXItLXRvZ2dsZScpO1xyXG5cclxuICAgICAgICBpZighYnV0dG9uKSByZXR1cm47XHJcblxyXG4gICAgICAgICQodGhpcy5fbWVudUNvbnRhaW5lcikuc2xpZGVUb2dnbGUoNTAwKTtcclxuXHJcbiAgICB9XHJcbiAgICBfb25OYXZCYXJSZXNpemUoZXZlbnQpe1xyXG4gICAgICAgIGxldCB3aWR0aCA9ICt3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgICAgICAgaWYod2lkdGggPiA3Njgpe1xyXG4gICAgICAgICAgICB0aGlzLl9tZW51Q29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubmF2QmFyQ2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5hdkJhckNsb3NlKCl7XHJcbiAgICAgICAgdGhpcy5fbWVudUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuX2V4cGFuZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE5hdkJhcjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAq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