import FormView from './form-view.js';
import { getOffersByType } from '../model/mock-data.js';

export default class EditFormView extends FormView {
  constructor(point, destination, offers) {
    super(point);
    this.destination = destination;
    this.allOffers = offers;
  }

  getTemplate() {
    const { type, startTime, endTime, basePrice, selectedOffers } = this.point;
    const destinationData = this.destination || {};
    const typeOffers = getOffersByType(type) || {};
    const offersForForm = Object.values(typeOffers).map((offer) => ({
      id: offer.id,
      title: offer.title,
      price: offer.price,
      selected: selectedOffers.includes(offer.id),
    }));
    const offersTemplate = this.getOffersTemplate(offersForForm);
    const eventTypesTemplate = this.getEventTypesTemplate(type);
    const destinationName = destinationData.name || '';

    const offersSection = offersForForm.length > 0 ? `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersTemplate}
        </div>
      </section>
    ` : '';

    const destinationSection = destinationData.name && (destinationData.description || destinationData.photos?.length > 0) ? `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationData.description || ''}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${(destinationData.photos || []).map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join('')}
          </div>
        </div>
      </section>
    ` : '';

    return `<li class="trip-events__item">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Chamonix"></option>
              <option value="Geneva"></option>
              <option value="Paris"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="button">Delete</button>
        </header>
        <section class="event__details">
          ${offersSection}
          ${destinationSection}
        </section>
      </form>
    </li>`;
  }
}
