import AbstractView from '../framework/view/abstract-view.js';
import { createElement } from '../render.js';

export default class TripInfoView extends AbstractView {
  constructor(tripData = {}) {
    super();
    this.tripData = tripData;
    this.element = null;
  }

  getTemplate() {
    const { title, dates, cost } = this.tripData;

    return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>

        <p class="trip-info__dates">${dates}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`;
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
