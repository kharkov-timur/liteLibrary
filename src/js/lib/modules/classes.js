import $ from '../core';

// Метод добавления классов. На вход принимает список классов
$.prototype.addClass = function (...classNames) {
  for (let i = 0; i < this.length; i++) {
    this[i].classList.add(...classNames);
  }
  return this;
};1

// Метод удаления классов. На вход принимает список классов
$.prototype.removeClass = function (...classNames) {
  for (let i = 0; i < this.length; i++) {
    this[i].classList.remove(...classNames);
  }
  return this;
};

// Метод переключения классов. На вход принимает класс
$.prototype.toggleClass = function (className) {
  for (let i = 0; i < this.length; i++) {
    this[i].classList.toggle(className);
  }
  return this;
};