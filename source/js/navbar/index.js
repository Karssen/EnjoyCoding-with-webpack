/**
 * Created by Артем on 15.02.2016.
 */
'use strict';


class NavBar{
    constructor(options){
        this._navbar = options.navbar;
        this._menuContainer = options.menuContainer;
        this._expand = this._menuContainer.dataset.expand;

        this._navbar.addEventListener('click', this._onNavBarClick.bind(this));
        window.addEventListener('resize', this._onNavBarResize.bind(this));
    }

    _onNavBarClick(event){
        let target = event.target;
        let button = target.closest('.nav-bar--toggle');

        if(!button) return;

        $(this._menuContainer).slideToggle(500);

    }
    _onNavBarResize(event){
        let width = +window.innerWidth;

        if(width > 768){
            this._menuContainer.removeAttribute('style');
        } else{
            this.navBarClose();
        }

    }

    navBarClose(){
        this._menuContainer.style.display = 'none';
        this._expand = false;
    }
}

module.exports = NavBar;