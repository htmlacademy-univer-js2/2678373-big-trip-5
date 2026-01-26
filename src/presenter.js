import { render, RenderPosition } from './render.js';
import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import EventsListView from './view/events-list-view.js';
import RoadPointView from './view/road-point-view.js';
import EditFormView from './view/edit-form-view.js';
import CreateFormView from './view/create-form-view.js';
export default class Presenter {
  constructor() {
    this.tripInfoContainer = document.querySelector('.trip-main');
    this.filtersContainer = document.querySelector('.trip-controls__filters');
    this.sortingContainer = document.querySelector('.trip-events');
    this.eventsListContainer = null;
  }

  init() {
    const tripInfoData = {
      title: 'Amsterdam &mdash; Chamonix &mdash; Geneva',
      dates: '18&nbsp;&mdash;&nbsp;20 Mar',
      cost: '1230',
    };
    const tripInfoComponent = new TripInfoView(tripInfoData);
    render(tripInfoComponent, this.tripInfoContainer, RenderPosition.AFTERBEGIN);

    const filtersComponent = new FiltersView();
    render(filtersComponent, this.filtersContainer);

    const sortingComponent = new SortingView();
    render(sortingComponent, this.sortingContainer, RenderPosition.AFTERBEGIN);

    const eventsListComponent = new EventsListView();
    render(eventsListComponent, this.sortingContainer);
    this.eventsListContainer = eventsListComponent.getListElement();

    const createFormData = {
      type: 'flight',
      startTime: '',
      endTime: '',
      price: '',
      destination: '',
      offers: [
        { id: 'luggage', title: 'Add luggage', price: 30, selected: false },
        { id: 'comfort', title: 'Switch to comfort class', price: 100, selected: false },
        { id: 'meal', title: 'Add meal', price: 15, selected: false },
        { id: 'seats', title: 'Choose seats', price: 5, selected: false },
        { id: 'train', title: 'Travel by train', price: 40, selected: false },
      ],
    };
    const createFormComponent = new CreateFormView(createFormData);
    render(createFormComponent, this.eventsListContainer, RenderPosition.AFTERBEGIN);

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
    const editFormComponent = new EditFormView(editFormData);
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
      const roadPointComponent = new RoadPointView(pointData);
      render(roadPointComponent, this.eventsListContainer);
    });
  }
}
