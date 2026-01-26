import { createElement } from '../render.js';

export default class SortingView {
  constructor(sorts = [
    { id: 'day', label: 'Day', checked: true, disabled: false },
    { id: 'event', label: 'Event', checked: false, disabled: true },
    { id: 'time', label: 'Time', checked: false, disabled: false },
    { id: 'price', label: 'Price', checked: false, disabled: false },
    { id: 'offer', label: 'Offers', checked: false, disabled: true },
  ]) {
    this.sorts = sorts;
    this.element = null;
  }

  getSortTemplate(sort) {
    return `<div class="trip-sort__item  trip-sort__item--${sort.id}">
      <input id="sort-${sort.id}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort.id}"${sort.checked ? ' checked' : ''}${sort.disabled ? ' disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sort.id}">${sort.label}</label>
    </div>`;
  }

  getTemplate() {
    const sortsHTML = this.sorts.map((sort) => this.getSortTemplate(sort)).join('');
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortsHTML}
    </form>`;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
