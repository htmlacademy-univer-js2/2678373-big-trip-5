import { getAllPoints, getDestinations, getAllOffers, getOffersByType } from '../utils/pointsUtils.js';

export default class Model {
  constructor() {
    this.points = getAllPoints();
    this.destinations = getDestinations();
    this.offers = getAllOffers();
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getDestinationById(id) {
    return this.destinations[id];
  }

  getOffersByType(type) {
    return getOffersByType(type);
  }
}
