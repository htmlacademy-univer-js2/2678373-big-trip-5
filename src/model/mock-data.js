import Destination from './destination.js';
import Offer from './offer.js';
import Point from './point.js';

const DESTINATIONS = {
  'amsterdam': new Destination({
    id: 'amsterdam',
    name: 'Amsterdam',
    description:
      'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    photos: [
      'https://loremflickr.com/248/152?random=1',
      'https://loremflickr.com/248/152?random=2',
      'https://loremflickr.com/248/152?random=3',
    ],
  }),
  'chamonix': new Destination({
    id: 'chamonix',
    name: 'Chamonix',
    description:
      'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    photos: [
      'https://loremflickr.com/248/152?random=4',
      'https://loremflickr.com/248/152?random=5',
    ],
  }),
  'geneva': new Destination({
    id: 'geneva',
    name: 'Geneva',
    description:
      'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    photos: [
      'https://loremflickr.com/248/152?random=6',
      'https://loremflickr.com/248/152?random=7',
      'https://loremflickr.com/248/152?random=8',
      'https://loremflickr.com/248/152?random=9',
      'https://loremflickr.com/248/152?random=10',
    ],
  }),
  'paris': new Destination({
    id: 'paris',
    name: 'Paris',
    description:
      'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    photos: [
      'https://loremflickr.com/248/152?random=11',
      'https://loremflickr.com/248/152?random=12',
      'https://loremflickr.com/248/152?random=13',
    ],
  }),
};

// Offers by type
const OFFERS_BY_TYPE = {
  'taxi': {
    'luggage-taxi': new Offer('luggage-taxi', 'Order Uber', 20),
  },
  'bus': {
    'wifi-bus': new Offer('wifi-bus', 'Add WiFi', 5),
    'luggage-bus': new Offer('luggage-bus', 'Add luggage', 50),
  },
  'train': {
    'seat-selection': new Offer('seat-selection', 'Choose seats', 5),
    'meal': new Offer('meal', 'Add meal', 15),
  },
  'ship': {
    'cabin': new Offer('cabin', 'Add cabin', 80),
    'meal-ship': new Offer('meal-ship', 'Add meal', 15),
  },
  'drive': {
    'rent-car': new Offer('rent-car', 'Rent a car', 200),
    'wifi-drive': new Offer('wifi-drive', 'Add WiFi', 5),
  },
  'flight': {
    'luggage': new Offer('luggage', 'Add luggage', 30),
    'comfort': new Offer('comfort', 'Switch to comfort class', 100),
    'meal-flight': new Offer('meal-flight', 'Add meal', 15),
    'seats': new Offer('seats', 'Choose seats', 5),
    'train-upgrade': new Offer('train-upgrade', 'Travel by train', 40),
  },
  'check-in': {
    'upgrade-room': new Offer('upgrade-room', 'Upgrade room', 150),
    'breakfast': new Offer('breakfast', 'Add breakfast', 20),
  },
  'sightseeing': {
    'guide': new Offer('guide', 'Book a guide', 60),
    'tour': new Offer('tour', 'Add extra tour', 40),
  },
  'restaurant': {
    'wine': new Offer('wine', 'Add wine', 25),
    'dessert': new Offer('dessert', 'Add dessert', 10),
  },
};

export function getDestinations() {
  return DESTINATIONS;
}

export function getOffersByType(type) {
  return OFFERS_BY_TYPE[type] || {};
}

export function generateMockPoints() {
  return [
    new Point(
      'taxi',
      'amsterdam',
      new Date('2019-03-18T10:30'),
      new Date('2019-03-18T11:00'),
      20,
      ['luggage-taxi'],
      true
    ),
    new Point(
      'flight',
      'chamonix',
      new Date('2019-03-18T12:25'),
      new Date('2019-03-18T13:35'),
      160,
      ['luggage', 'comfort'],
      false
    ),
    new Point(
      'drive',
      'chamonix',
      new Date('2019-03-18T14:30'),
      new Date('2019-03-18T16:05'),
      160,
      ['rent-car'],
      true
    ),
    new Point(
      'check-in',
      'geneva',
      new Date('2019-03-19T00:00'),
      new Date('2019-03-20T00:00'),
      80,
      ['upgrade-room', 'breakfast'],
      false
    ),
    new Point(
      'sightseeing',
      'paris',
      new Date('2019-03-20T10:00'),
      new Date('2019-03-20T14:00'),
      45,
      ['guide'],
      true
    ),
  ];
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
