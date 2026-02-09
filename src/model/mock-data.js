
import { generateId } from '../utils/generateUUID.js';

const DESTINATIONS = {
  'amsterdam': {
    id: 'amsterdam',
    name: 'Amsterdam',
    description:
      'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    photos: [
      'https://loremflickr.com/248/152?random=1',
      'https://loremflickr.com/248/152?random=2',
      'https://loremflickr.com/248/152?random=3',
    ],
  },
  'chamonix': {
    id: 'chamonix',
    name: 'Chamonix',
    description:
      'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    photos: [
      'https://loremflickr.com/248/152?random=4',
      'https://loremflickr.com/248/152?random=5',
    ],
  },
  'geneva': {
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
  },
  'paris': {
    id: 'paris',
    name: 'Paris',
    description:
      'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    photos: [
      'https://loremflickr.com/248/152?random=11',
      'https://loremflickr.com/248/152?random=12',
      'https://loremflickr.com/248/152?random=13',
    ],
  },
};

const OFFERS_BY_TYPE = {
  'taxi': {
    'luggage-taxi': {id: 'luggage-taxi', title: 'Order Uber', price: 20 },
  },
  'bus': {
    'wifi-bus': {id: 'wifi-bus', title: 'Add WiFi', price: 5},
    'luggage-bus': {id: 'luggage-bus', title: 'Add luggage', price: 50},
  },
  'train': {
    'seat-selection': {id: 'seat-selection', title: 'Choose seats', price: 5},
    'meal': {id:'meal', title: 'Add meal', price: 15 },
  },
  'ship': {
    'cabin': {id:'cabin', title: 'Add cabin', price: 80 },
    'meal-ship': {id:'meal-ship', title: 'Add meal', price:15 },
  },
  'drive': {
    'rent-car': {id: 'rent-car', title: 'Rent a car', price: 200},
    'wifi-drive': {id: 'wifi-drive', title: 'Add WiFi', price: 5},
  },
  'flight': {
    'luggage': { id: 'luggage', title: 'Add luggage', price: 30 } ,
    'comfort': {id: 'comfort', title: 'Switch to comfort class', price: 100},
    'meal-flight': {id: 'meal-flight', title: 'Add meal', price: 15},
    'seats': {id :'seats', title: 'Choose seats', price: 5},
    'train-upgrade': {id: 'train-upgrade', title: 'Travel by train', price: 40},
  },
  'check-in': {
    'upgrade-room': {id: 'upgrade-room', title: 'Upgrade room', price: 150},
    'breakfast': {id: 'breakfast', title: 'Add breakfast', price: 20},
  },
  'sightseeing': {
    'guide': { id: 'guide', title: 'Book a guide', price: 60 },
    'tour': { id: 'tour', title: 'Add extra tour', price: 40 } ,
  },
  'restaurant': {
    'wine': { id: 'wine', title: 'Add wine', price: 25 },
    'dessert': { id: 'dessert', title: 'Add dessert', price:10 },
  },
};

const MOCK_POINTS = [
  {
    id: generateId(),
    type: 'taxi',
    destination: 'amsterdam',
    dateFrom: new Date('2019-03-18T10:30'),
    dateTo: new Date('2019-03-18T11:00'),
    price: 20,
    offers: ['luggage-taxi'],
    isFavorite: true
  },
  {
    id: generateId(),
    type: 'flight',
    destination: 'chamonix',
    dateFrom: new Date('2019-03-18T12:25'),
    dateTo: new Date('2019-03-18T13:35'),
    price: 160,
    offers: ['luggage', 'comfort'],
    isFavorite: false
  },
  {
    id: generateId(),
    type: 'train',
    destination: 'chamonix',
    dateFrom: new Date('2019-03-18T14:30'),
    dateTo: new Date('2019-03-18T16:05'),
    price: 160,
    offers: ['rent-car'],
    isFavorite: true
  },
  {
    id: generateId(),
    type: 'check-in',
    destination: 'geneva',
    dateFrom: new Date('2019-03-19T00:00'),
    dateTo: new Date('2019-03-20T00:00'),
    price: 80,
    offers: ['upgrade-room', 'breakfast'],
    isFavorite: false
  },
  {
    id: generateId(),
    type: 'check-in',
    destination: 'paris',
    dateFrom: new Date('2026-03-19T00:00'),
    dateTo: new Date('2026-03-20T00:00'),
    price: 80,
    offers: ['upgrade-room', 'breakfast'],
    isFavorite: false
  },
  {
    id: generateId(),
    type: 'check-in',
    destination: 'paris',
    dateFrom: new Date('2026-02-09T00:00'),
    dateTo: new Date('2026-02-20T00:00'),
    price: 80,
    offers: ['upgrade-room', 'breakfast'],
    isFavorite: false
  },
];
export { DESTINATIONS, OFFERS_BY_TYPE, MOCK_POINTS };
