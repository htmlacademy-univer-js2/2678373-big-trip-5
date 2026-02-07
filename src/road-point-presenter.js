import { render } from './render.js';
import RoadPointView from './view/road-point-view.js';
import EditFormView from './view/edit-form-view.js';

export default class RoadPointPresenter {
  #eventsListContainer = null;
  #point = null;
  #offers = null;
  #destination = null;
  resetForm = null;
  onFavouriteChange = null;

  #roadPointComponent = null;
  #editFormComponent = null;
  #activeForm = null;

  constructor({ eventsListContainer, point, destination, offers, resetForm, onFavouriteChange }) {
    this.#eventsListContainer = eventsListContainer;
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.resetForm = resetForm;
    this.onFavouriteChange = onFavouriteChange;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  getPointId() {
    return this.#point.id;
  }

  init() {
    this.#roadPointComponent = new RoadPointView({
      point: this.#point,
      destination: this.#destination,
      offers: this.#offers,
      onFavouriteClick: this._handleFavouriteClick
    });

    this.#editFormComponent = new EditFormView({
      point: this.#point,
      destination: this.#destination,
      offers: this.#offers,
      onFormSubmit: (evt) => {
        evt.preventDefault();
        this._closeForm();
      },
      onRollupClick: () => this._closeForm()
    });

    this.#roadPointComponent.setRollupClickHandler(() => this._openForm());

    render(this.#roadPointComponent, this.#eventsListContainer);
  }

  updatePoint(point) {
    this.#point = point;

    const prevComponent = this.#roadPointComponent;

    this.#roadPointComponent = new RoadPointView({
      point: this.#point,
      destination: this.#destination,
      offers: this.#offers,
      onFavouriteClick: this._handleFavouriteClick
    });

    this.#roadPointComponent.setRollupClickHandler(() => this._openForm());

    prevComponent.element.replaceWith(this.#roadPointComponent.element);
  }

  resetView() {
    this._closeForm();
  }

  _openForm() {
    this.resetForm();

    this.#eventsListContainer.replaceChild(
      this.#editFormComponent.element,
      this.#roadPointComponent.element
    );
    this.#activeForm = this.#editFormComponent;

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closeForm() {
    if (!this.#activeForm) {
      return;
    }

    this.#eventsListContainer.replaceChild(
      this.#roadPointComponent.element,
      this.#activeForm.element
    );
    this.#activeForm = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closeForm();
    }
  }

  _handleFavouriteClick = () => {
    const updatedPoint = { ...this.#point, isFavorite: !this.#point.isFavorite };
    this.onFavouriteChange(updatedPoint);
  };
}
