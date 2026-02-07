import { render, RenderPosition } from './render.js';
import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import EventsListView from './view/events-list-view.js';
// import RoadPointView from './view/road-point-view.js';
// import EditFormView from './view/edit-form-view.js';
import RoadPointPresenter from './road-point-presenter.js';

export default class RoadPresenter {
  #tripInfoContainer = null;
  #filtersContainer = null;
  #sortingContainer = null;
  #eventsListContainer = null;
  #model = null;
  #roadPointPresenters = [];
  constructor(model) {
    this.#tripInfoContainer = document.querySelector('.trip-main');
    this.#filtersContainer = document.querySelector('.trip-controls__filters');
    this.#sortingContainer = document.querySelector('.trip-events');
    this.#eventsListContainer = null;
    this.#model = model;
  }

  resetAllForms() {
    this.#roadPointPresenters.forEach((presenter) => {
      presenter.resetView();
    });
  }

  #handleFavouriteChange = (updatedPoint) => {
    this.#model.points = this.#model.points.map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point
    );

    const presenter = this.#roadPointPresenters.find(
      (p) => p.getPointId() === updatedPoint.id
    );

    presenter.updatePoint(updatedPoint);
  };

  init() {
    const tripInfoData = {
      title: 'Amsterdam &mdash; Chamonix &mdash; Geneva',
      dates: '18&nbsp;&mdash;&nbsp;20 Mar',
      cost: '1230',
    };
    const tripInfoComponent = new TripInfoView(tripInfoData);
    render(tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);

    const filtersComponent = new FiltersView();
    render(filtersComponent, this.#filtersContainer);

    const sortingComponent = new SortingView();
    render(sortingComponent, this.#sortingContainer, RenderPosition.AFTERBEGIN);

    const eventsListComponent = new EventsListView();
    render(eventsListComponent, this.#sortingContainer);
    this.#eventsListContainer = eventsListComponent.element;


    const points = this.#model.points;
    points.forEach((point) => {
      const roadPointPresenter = new RoadPointPresenter({
        eventsListContainer: this.#eventsListContainer,
        point: point,
        destination: this.#model.getDestinationById(point.destination),
        offers: this.#model.offers,
        resetForm: this.resetAllForms.bind(this),
        onFavouriteChange: this.#handleFavouriteChange
      });
      roadPointPresenter.init();
      this.#roadPointPresenters.push(roadPointPresenter);
    });
  }

}
