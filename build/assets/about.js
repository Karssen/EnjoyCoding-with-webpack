var about =
webpackJsonp_name_([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';

	var Modal = __webpack_require__(1);
	var MainMenu = __webpack_require__(2);
	var NavBar = __webpack_require__(3);

	exports.MainMenu = MainMenu; // ������������ �� ������� ������ ����������� ������������� ������ ������.

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc291cmNlL2pzL2Fib3V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgTW9kYWwgPSByZXF1aXJlKCcuL21vZGFsL2luZGV4LmpzJyk7XHJcbmxldCBNYWluTWVudSA9IHJlcXVpcmUoJy4vbWVudS9pbmRleC5qcycpO1xyXG5sZXQgTmF2QmFyID0gcmVxdWlyZSgnLi9uYXZiYXIvaW5kZXguanMnKTtcclxuXHJcbmV4cG9ydHMuTWFpbk1lbnUgPSBNYWluTWVudTsgLy8g77+977+977+977+977+977+977+977+977+977+977+977+9IO+/ve+/vSDvv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vS5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHJlYWR5KTtcclxuXHJcbmZ1bmN0aW9uIHJlYWR5KCl7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xyXG5cclxuICAgIGxldCBtYWluTWVudU9wdGlvbnMgPSB7XHJcbiAgICAgICAgZWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2aWdhdGlvbicpXHJcbiAgICB9O1xyXG4gICAgbGV0IG1haW5NZW51ID0gbmV3IE1haW5NZW51KG1haW5NZW51T3B0aW9ucyk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25DbGljayhldmVudCl7XHJcbiAgICAgICAgbWFpbk1lbnUuY2xvc2VJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1vZGFsID0gbmV3IE1vZGFsKCk7XHJcblxyXG4gICAgbGV0IG5hdmJhck9wdGlvbnMgPSB7XHJcbiAgICAgICAgbmF2YmFyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2LWJhcicpLFxyXG4gICAgICAgIG1lbnVDb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXYtYmFyX19jb250YWluZXInKVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgbmF2QmFyID0gbmV3IE5hdkJhcihuYXZiYXJPcHRpb25zKTtcclxuICAgIGlmKCt3aW5kb3cuaW5uZXJXaWR0aCA8PSA3Njgpe1xyXG4gICAgICAgIG5hdkJhci5uYXZCYXJDbG9zZSgpO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc291cmNlL2pzL2Fib3V0LmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBREE7QUFwQkE7OzsiLCJzb3VyY2VSb290IjoiIn0=