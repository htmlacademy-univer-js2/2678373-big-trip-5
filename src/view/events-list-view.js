import AbstractView from '../framework/view/abstract-view.js';

export default class EventsListView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return '<ul class="trip-events__list"></ul>';
  }

}
