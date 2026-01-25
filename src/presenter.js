import { render, RenderPosition } from './render.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import RoadPoint from './view/road-point.js';
import EditForm from './view/edit-form.js';

export default class Presenter {
  constructor() {
    this.filtersContainer = document.querySelector('.trip-controls__filters');
    this.sortingContainer = document.querySelector('.trip-events');
    this.eventsListContainer = document.querySelector('.trip-events__list');
  }

  init() {
    const filtersComponent = new FiltersView();
    render(filtersComponent, this.filtersContainer);

    const sortingComponent = new SortingView();
    render(sortingComponent, this.sortingContainer, RenderPosition.AFTERBEGIN);

    if (!this.eventsListContainer) {
      this.eventsListContainer = document.createElement('ul');
      this.eventsListContainer.className = 'trip-events__list';
      this.sortingContainer.appendChild(this.eventsListContainer);
    }

    const editFormData = {
      type: 'flight',
      title: 'Geneva',
      startTime: '19/03/19 00:00',
      endTime: '19/03/19 00:00',
      price: 160,
      destination: 'Geneva',
      offers: [
        { id: 'luggage', title: 'Add luggage', price: 30, selected: true },
        { id: 'comfort', title: 'Switch to comfort class', price: 100, selected: true },
        { id: 'meal', title: 'Add meal', price: 15, selected: false },
        { id: 'seats', title: 'Choose seats', price: 5, selected: false },
        { id: 'train', title: 'Travel by train', price: 40, selected: false },
      ],
    };
    const editFormComponent = new EditForm(editFormData);
    render(editFormComponent, this.eventsListContainer, RenderPosition.AFTERBEGIN);

    const roadPointsData = [
      {
        type: 'taxi',
        title: 'Amsterdam',
        startTime: new Date('2019-03-18T10:30'),
        endTime: new Date('2019-03-18T11:00'),
        duration: '30M',
        price: 20,
        offers: [
          { title: 'Order Uber', price: 20 },
        ],
        isFavorite: true,
      },
      {
        type: 'flight',
        title: 'Chamonix',
        startTime: new Date('2019-03-18T12:25'),
        endTime: new Date('2019-03-18T13:35'),
        duration: '01H 10M',
        price: 160,
        offers: [
          { title: 'Add luggage', price: 50 },
          { title: 'Switch to comfort', price: 80 },
        ],
        isFavorite: false,
      },
      {
        type: 'drive',
        title: 'Chamonix',
        startTime: new Date('2019-03-18T14:30'),
        endTime: new Date('2019-03-18T16:05'),
        duration: '01H 35M',
        price: 160,
        offers: [
          { title: 'Rent a car', price: 200 },
        ],
        isFavorite: true,
      },
    ];
    roadPointsData.forEach((pointData) => {
      const roadPointComponent = new RoadPoint(pointData);
      render(roadPointComponent, this.eventsListContainer);
    });
  }
}
