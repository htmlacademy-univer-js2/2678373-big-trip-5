import { createElement } from '../render.js';

export default class EventsListView {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return '<ul class="trip-events__list"></ul>';
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  getListElement() {
    return this.getElement();
  }

  removeElement() {
    this.element = null;
  }
}
