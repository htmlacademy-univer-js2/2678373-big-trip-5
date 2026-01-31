import AbstractView from '../framework/view/abstract-view.js';

export default class TripInfoView extends AbstractView {
  #tripData = {};
  constructor(tripData = {}) {
    super();
    this.#tripData = tripData;
  }

  get template() {
    const { title, dates, cost } = this.#tripData;

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


}
