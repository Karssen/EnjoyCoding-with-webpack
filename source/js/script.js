/**
 * Created by Артем on 06.01.2016.
 */
'use strict';
//require('../less/style.less');

if(NODE_ENV == 'development'){
    console.log('Some text');
}

let Swipe = require('./slider/index.js');
let Modal = require('./modal/index.js');
let MainMenu = require('./menu/index.js');
let NavBar = require('./navbar/index.js');

exports.MainMenu = MainMenu; // экспортирует во внешний скрипт возможность использования нашего класса.

document.addEventListener("DOMContentLoaded", ready);

function ready(){
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

    let mainMenuOptions = {
        element: document.querySelector('.main-navigation')
    };
    let mainMenu = new MainMenu(mainMenuOptions);

    function onClick(event){
        mainMenu.closeItem();
    }

    let slider = new Swipe(document.getElementById('slider'), {
        startSlide: 1,
        speed: 1000,
        auto: 3000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem) {},
        transitionEnd: function(index, elem) {}
    });

    let modal = new Modal();

    let navbarOptions = {
      navbar: document.getElementById('nav-bar'),
        menuContainer: document.getElementById('nav-bar__container')
    };

    let navBar = new NavBar(navbarOptions);
    if(+window.innerWidth <= 768){
        navBar.navBarClose();
    }

}