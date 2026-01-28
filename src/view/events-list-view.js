import AbstractView from '../framework/view/abstract-view.js';
import { createElement } from '../render.js';

export default class EventsListView extends AbstractView {
  constructor() {
    super();
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
