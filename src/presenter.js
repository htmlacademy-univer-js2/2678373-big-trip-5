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

  #currentFilter = 'everything';
  #currentSorting = 'time';

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

  #getProcessedPoints() {
    let points = this.#getFilteredPoints();

    switch (this.#currentSorting) {
      case 'time':
        points = points.slice().sort((a, b) => (a.dateTo - a.dateFrom) - (b.dateTo - b.dateFrom));
        break;
      case 'price':
        points = points.slice().sort((a, b) => b.price - a.price);
        break;
      case 'day':
        points = points.slice().sort((a, b) => a.dateFrom - b.dateFrom);
        break;
    }

    return points;
  }

  #getFilteredPoints() {
    switch (this.#currentFilter) {
      case 'future':
        return this.#model.points.filter((point) => point.dateFrom > new Date());
      case 'past':
        return this.#model.points.filter((point) => point.dateTo < new Date());
      case 'present':
        return this.#model.points.filter(
          (point) =>
            point.dateFrom <= new Date() &&
            point.dateTo >= new Date()
        );
      default:
        return this.#model.points;
    }
  }

  #rerenderPoints() {
    this.#clearPoints();
    this.#renderPoints();
  }

  #clearPoints() {
    this.#eventsListContainer.replaceChildren();
    this.#roadPointPresenters = [];
  }

  #renderPoints() {
    const points = this.#getProcessedPoints();

    points.forEach((point) => {
      const roadPointPresenter = new RoadPointPresenter({
        eventsListContainer: this.#eventsListContainer,
        point,
        destination: this.#model.getDestinationById(point.destination),
        offers: this.#model.offers,
        resetForm: this.resetAllForms.bind(this),
        updatePoint: (updatedPoint) => {
          this.#model.points = this.#model.points.map((p) =>
            p.id === updatedPoint.id ? updatedPoint : p
          );
        }
      });

      roadPointPresenter.init();
      this.#roadPointPresenters.push(roadPointPresenter);
    });
  }

  init() {
    const tripInfoData = {
      title: 'Amsterdam &mdash; Chamonix &mdash; Geneva',
      dates: '18&nbsp;&mdash;&nbsp;20 Mar',
      cost: '1230',
    };
    const tripInfoComponent = new TripInfoView(tripInfoData);
    render(tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);

    const filtersComponent = new FiltersView({onFilterChange: (filterType) => {

      if (this.#currentFilter !== filterType) {
        this.#currentFilter = filterType;
        this.#rerenderPoints();
      }
    }});
    render(filtersComponent, this.#filtersContainer);

    const sortingComponent = new SortingView({onSortingChange: (sortingType) => {
      if (this.#currentSorting !== sortingType) {
        this.#currentSorting = sortingType;
        this.#rerenderPoints();
      }
    }});
    render(sortingComponent, this.#sortingContainer, RenderPosition.AFTERBEGIN);

    const eventsListComponent = new EventsListView();
    render(eventsListComponent, this.#sortingContainer);
    this.#eventsListContainer = eventsListComponent.element;

    this.#renderPoints();
  }

}
