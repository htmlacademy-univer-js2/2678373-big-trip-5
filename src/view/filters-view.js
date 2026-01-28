import AbstractView from '../framework/view/abstract-view.js';
import { createElement } from '../render.js';

export default class FiltersView extends AbstractView {
  constructor(filters = [
    { id: 'everything', label: 'Everything', checked: true },
    { id: 'future', label: 'Future', checked: false },
    { id: 'present', label: 'Present', checked: false },
    { id: 'past', label: 'Past', checked: false },
  ]) {
    super();
    this.filters = filters;
    this.element = null;
  }

  getFilterTemplate(filter) {
    return `<div class="trip-filters__filter">
      <input id="filter-${filter.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.id}"${filter.checked ? ' checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${filter.id}">${filter.label}</label>
    </div>`;
  }

  getTemplate() {
    const filtersHTML = this.filters.map((filter, index) => this.getFilterTemplate(filter, index)).join('');
    return `<form class="trip-filters" action="#" method="get">
      ${filtersHTML}
      <button class="visually-hidden" type="submit">Accept filter</button>
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
