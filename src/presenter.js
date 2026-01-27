import { render, RenderPosition } from './render.js';
import Model from './model/model.js';
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
    this.model = new Model();
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

    const genevaDest = this.model.getDestinationById('geneva');
    const createFormComponent = new CreateFormView(
      { type: 'flight', startTime: '', endTime: '', basePrice: 0 },
      genevaDest,
      this.model.getOffers()
    );
    render(createFormComponent, this.eventsListContainer, RenderPosition.AFTERBEGIN);

    const editFormComponent = new EditFormView(
      {
        type: 'flight',
        startTime: '19/03/19 00:00',
        endTime: '19/03/19 00:00',
        basePrice: 160,
        selectedOffers: ['luggage', 'comfort'],
      },
      genevaDest,
      this.model.getOffers()
    );
    render(editFormComponent, this.eventsListContainer, RenderPosition.AFTERBEGIN);

    const points = this.model.getPoints();
    points.forEach((point) => {
      const destination = this.model.getDestinationById(point.destinationId);
      const roadPointComponent = new RoadPointView(point, destination, this.model.getOffers());
      render(roadPointComponent, this.eventsListContainer);
    });
  }
}
