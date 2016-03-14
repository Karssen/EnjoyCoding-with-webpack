/**
 * Created by Артем on 11.02.2016.
 */
'use strict';

class Modal{
    constructor(options){

        document.body.addEventListener('click', this._onModalOpenClick.bind(this));
        document.body.addEventListener('click', this._onModalCloseClick.bind(this));
        document.body.addEventListener('modalAppearence', this._onModalAppearance.bind(this));
    }

    _onModalOpenClick(event){
        let target = event.target;
        let modalOpen = target.closest('[data-role=modal-open]');
        let scrollWidth = this._findScrollWidth();

        if(!modalOpen) return;

        let href = modalOpen.getAttribute('href').slice(1);
        let modalWindow = document.getElementById(href);

        modalWindow.classList.add('modal--show');

        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = scrollWidth + 'px';

        let appearence = new CustomEvent('modalAppearence', {
            bubbles: true
        });

        modalWindow.dispatchEvent(appearence);

    }

    _onModalCloseClick(event){
        let target = event.target;
        let modalClose = target.closest('[data-role=modal-close]');

        if(!modalClose) return;

        let modalWindow = modalClose.closest('.modal');

        modalWindow.classList.remove('modal--show');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        let container = modalWindow.querySelector('.modal__container');

        container.style.visibility = 'hidden';
        container.style.height = '';
        container.style.width = '';
    }

    _onModalAppearance(event){
        let target = event.target;
        let container = target.querySelector('.modal__container');
        let coords = container.getBoundingClientRect();
        let width = coords.width;
        let height = coords.height;
        let widthKef, heightKef;
        let time = 100;
        this._animate((timePassed) => {
            widthKef = time/width;
            heightKef = time/height;

            container.style.visibility = 'visible';
            container.style.height = timePassed/heightKef + "px";
            container.style.width = timePassed/widthKef + "px";

        }, time);

    }

    _animate(draw, duration){
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

    _findScrollWidth(){
        let div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';

        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);

        return scrollWidth;
    }


}

module.exports = Modal;