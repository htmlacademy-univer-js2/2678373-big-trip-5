import { DESTINATIONS, OFFERS_BY_TYPE, MOCK_POINTS } from '../model/mock-data.js';

export function getDestinations() {
  return DESTINATIONS;
}

export function getOffersByType(type) {
  return OFFERS_BY_TYPE[type] || {};
}

export function getAllPoints() {
  return MOCK_POINTS;
}

export function getAllOffers() {
  const allOffers = {};
  Object.values(OFFERS_BY_TYPE).forEach((offersMap) => {
    Object.assign(allOffers, offersMap);
  });
  return allOffers;
}

export function getOffersByTypeForForm(type) {
  const offers = getOffersByType(type);
  return Object.values(offers).map((offer) => ({
    id: offer.id,
    title: offer.title,
    price: offer.price,
    selected: false,
  }));
}
