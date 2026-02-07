import RoadPresenter from './presenter.js';
import Model from './model/model.js';

const model = new Model();
const presenter = new RoadPresenter(model);
presenter.init();
