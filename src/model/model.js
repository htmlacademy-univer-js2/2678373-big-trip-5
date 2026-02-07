import { getAllPoints, getDestinations, getAllOffers, getOffersByType } from '../utils/pointsUtils.js';

export default class Model {
  #points = [];
  #destinations = {};
  #offers = {};
  constructor() {
    this.#points = getAllPoints();
    this.#destinations = getDestinations();
    this.#offers = getAllOffers();
  }

  set points(points) {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getDestinationById(id) {
    return this.#destinations[id];
  }

  getOffersByType(type) {
    return getOffersByType(type);
  }
}
