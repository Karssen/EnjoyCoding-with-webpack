/**
 * Created by Artem on 03.03.2016.
 */
'use strict';

class Select{
    constructor(options){
        this._elem = options.elem;

        this._elem.addEventListener('click', this._onClick.bind(this));
    }

    _onClick(event){
        let target = event.target;
        let opener = target.closest('[data-role=select-opener]');

        if(!opener) return;

        let list = this._elem.querySelector('.select__list');

        $(list).slideToggle(300);

    }
}

module.exports = Select;