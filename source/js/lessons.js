/**
 * Created by Artem on 03.03.2016.
 */
'use strict';

let Select = require('./select/index.js');
let Modal = require('./modal/index.js');
let MainMenu = require('./menu/index.js');
let NavBar = require('./navbar/index.js');

document.addEventListener("DOMContentLoaded", ready);

function ready(){
    document.addEventListener('click', onClick);

    let mainMenuOptions = {
        element: document.querySelector('.main-navigation')
    };
    let mainMenu = new MainMenu(mainMenuOptions);

    function onClick(event){
        mainMenu.closeItem();
    }

    let modal = new Modal();

    let navbarOptions = {
        navbar: document.getElementById('nav-bar'),
        menuContainer: document.getElementById('nav-bar__container')
    };

    let navBar = new NavBar(navbarOptions);
    if(+window.innerWidth <= 768){
        navBar.navBarClose();
    }

    let selectOptions = {
        elem: document.getElementById('division')
    };

    let select = new Select(selectOptions);
}