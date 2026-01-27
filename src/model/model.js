import { generateMockPoints, getDestinations, getAllOffers, getOffersByType } from './mock-data.js';

export default class Model {
  constructor() {
    this.points = generateMockPoints();
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

  getOfferById(id) {
    return this.offers[id];
  }

  getOffersByType(type) {
    return getOffersByType(type);
  }
}
