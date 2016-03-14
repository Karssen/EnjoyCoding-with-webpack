var contacts =
webpackJsonp_name_([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Artem on 10.03.2016.
	 */
	'use strict';

	var Modal = __webpack_require__(1);
	var MainMenu = __webpack_require__(2);
	var NavBar = __webpack_require__(3);

	document.addEventListener("DOMContentLoaded", ready);

	function ready() {
	    document.addEventListener('click', onClick);

	    var mainMenuOptions = {
	        element: document.querySelector('.main-navigation')
	    };
	    var mainMenu = new MainMenu(mainMenuOptions);

	    function onClick(event) {
	        mainMenu.closeItem();
	    }

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

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc291cmNlL2pzL2NvbnRhY3RzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGVtIG9uIDEwLjAzLjIwMTYuXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgTW9kYWwgPSByZXF1aXJlKCcuL21vZGFsL2luZGV4LmpzJyk7XHJcbmxldCBNYWluTWVudSA9IHJlcXVpcmUoJy4vbWVudS9pbmRleC5qcycpO1xyXG5sZXQgTmF2QmFyID0gcmVxdWlyZSgnLi9uYXZiYXIvaW5kZXguanMnKTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHJlYWR5KTtcclxuXHJcbmZ1bmN0aW9uIHJlYWR5KCl7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xyXG5cclxuICAgIGxldCBtYWluTWVudU9wdGlvbnMgPSB7XHJcbiAgICAgICAgZWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2aWdhdGlvbicpXHJcbiAgICB9O1xyXG4gICAgbGV0IG1haW5NZW51ID0gbmV3IE1haW5NZW51KG1haW5NZW51T3B0aW9ucyk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25DbGljayhldmVudCl7XHJcbiAgICAgICAgbWFpbk1lbnUuY2xvc2VJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1vZGFsID0gbmV3IE1vZGFsKCk7XHJcblxyXG4gICAgbGV0IG5hdmJhck9wdGlvbnMgPSB7XHJcbiAgICAgICAgbmF2YmFyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2LWJhcicpLFxyXG4gICAgICAgIG1lbnVDb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXYtYmFyX19jb250YWluZXInKVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgbmF2QmFyID0gbmV3IE5hdkJhcihuYXZiYXJPcHRpb25zKTtcclxuICAgIGlmKCt3aW5kb3cuaW5uZXJXaWR0aCA8PSA3Njgpe1xyXG4gICAgICAgIG5hdkJhci5uYXZCYXJDbG9zZSgpO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNvdXJjZS9qcy9jb250YWN0cy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQXBCQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==