import AbstractView from '../framework/view/abstract-view.js';

export default class FormView extends AbstractView {
  #point = {};
  #allOffers = {};
  constructor(point = {}, allOffers = {}) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
  }

  get template() {
    const { type = 'taxi', destination = '', offers = [] } = this.#point;

    const eventTypesTemplate = this.getEventTypesTemplate(type);
    const offersForForm = this.#buildOffersForForm(offers);
    const offersTemplate = this.getOffersTemplate(offersForForm);

    return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypesTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              <!-- Options будут динамически добавляться -->
            </datalist>
          </div>
        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offersTemplate}
            </div>
          </section>
        </section>
      </form>
      </li>
    `;
  }

  getEventTypesTemplate(type) {
    const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
    return types.map((eventType) => `
      <div class="event__type-item">
        <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}" ${type === eventType ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</label>
      </div>
    `).join('');
  }

  getOffersTemplate(offers = []) {
    return offers.map((offer) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${offer.selected ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `).join('');
  }

  #buildOffersForForm(selectedOfferIds = []) {
    return Object.values(this.#allOffers).map((offer) => ({
      id: offer.id,
      title: offer.title,
      price: offer.price,
      selected: selectedOfferIds.includes(offer.id),
    }));
  }
}
