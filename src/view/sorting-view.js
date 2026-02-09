import AbstractView from '../framework/view/abstract-view.js';

export default class SortingView extends AbstractView {
  #sorts = [];
  #onSortingChange = null;
  constructor({ sorts = [
    { id: 'day', label: 'Day', checked: false, disabled: false },
    { id: 'event', label: 'Event', checked: false, disabled: true },
    { id: 'time', label: 'Time', checked: false, disabled: false },
    { id: 'price', label: 'Price', checked: false, disabled: false },
    { id: 'offer', label: 'Offers', checked: false, disabled: true },
  ],
  onSortingChange
  }) {
    super();
    this.#sorts = sorts;
    this.#onSortingChange = onSortingChange;
    this.element.addEventListener('change', this.#sortingChangeHandler);
  }

  getSortTemplate(sort) {
    return `<div class="trip-sort__item  trip-sort__item--${sort.id}">
      <input
        id="sort-${sort.id}"
        class="trip-sort__input
        visually-hidden"
        type="radio"
        data-sort-type="${sort.id}"
        name="trip-sort"
        value="sort-${sort.id}"${sort.checked ? ' checked' : ''}${sort.disabled ? ' disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sort.id}">${sort.label}</label>
    </div>`;
  }

  get template() {
    const sortsHTML = this.#sorts.map((sort) => this.getSortTemplate(sort)).join('');
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortsHTML}
    </form>`;
  }

  #sortingChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    const sortingType = evt.target.dataset.sortType;
    this.#onSortingChange(sortingType);
  };
}
