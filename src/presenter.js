import { render, RenderPosition } from './render.js';
import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import EventsListView from './view/events-list-view.js';
import RoadPointView from './view/road-point-view.js';
import EditFormView from './view/edit-form-view.js';

export default class Presenter {
  #tripInfoContainer = null;
  #filtersContainer = null;
  #sortingContainer = null;
  #eventsListContainer = null;
  #model = null;
  #activeForm = null;
  #activeRoadPoint = null;
  constructor(model) {
    this.#tripInfoContainer = document.querySelector('.trip-main');
    this.#filtersContainer = document.querySelector('.trip-controls__filters');
    this.#sortingContainer = document.querySelector('.trip-events');
    this.#eventsListContainer = null;
    this.#model = model;

    // Состояние для отслеживания активной формы
    this.#activeForm = null;
    this.#activeRoadPoint = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

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
      const destination = this.#model.getDestinationById(point.destination);
      const roadPointComponent = new RoadPointView({
        point: point,
        destination: destination,
        offers: this.#model.offers
      });

      const editFormComponent = new EditFormView({
        point: point,
        destination: destination,
        offers: this.#model.offers,
        onFormSubmit: (evt) => {
          evt.preventDefault();
          this._closeForm(roadPointComponent, editFormComponent);
        },
        onRollupClick: () => {
          this._closeForm(roadPointComponent, editFormComponent);
        }
      });

      const openEditForm = () => {
        this._openForm(roadPointComponent, editFormComponent);
      };

      roadPointComponent.setRollupClickHandler(openEditForm);

      render(roadPointComponent, this.#eventsListContainer);
    });
  }

  _openForm(roadPointComponent, editFormComponent) {
    if (this.#activeForm && this.#activeRoadPoint) {
      this._closeForm(this.#activeRoadPoint, this.#activeForm);
    }
    this.#eventsListContainer.replaceChild(editFormComponent.element, roadPointComponent.element);
    this.#activeForm = editFormComponent;
    this.#activeRoadPoint = roadPointComponent;
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closeForm(roadPointComponent, editFormComponent) {
    this.#eventsListContainer.replaceChild(roadPointComponent.element, editFormComponent.element);

    this.#activeForm = null;
    this.#activeRoadPoint = null;
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      if (this.#activeForm && this.#activeRoadPoint) {
        this._closeForm(this.#activeRoadPoint, this.#activeForm);
      }
    }
  }

}
