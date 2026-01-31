import AbstractView from '../framework/view/abstract-view.js';

export default class FiltersView extends AbstractView {
  #filters = [];
  constructor(filters = [
    { id: 'everything', label: 'Everything', checked: true },
    { id: 'future', label: 'Future', checked: false },
    { id: 'present', label: 'Present', checked: false },
    { id: 'past', label: 'Past', checked: false },
  ]) {
    super();
    this.#filters = filters;
  }

  getFilterTemplate(filter) {
    return `<div class="trip-filters__filter">
      <input id="filter-${filter.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.id}"${filter.checked ? ' checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${filter.id}">${filter.label}</label>
    </div>`;
  }

  get template() {
    const filtersHTML = this.#filters.map((filter, index) => this.getFilterTemplate(filter, index)).join('');
    return `<form class="trip-filters" action="#" method="get">
      ${filtersHTML}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
  }

}
