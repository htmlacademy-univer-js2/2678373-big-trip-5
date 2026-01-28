import Presenter from './presenter.js';
import Model from './model/model.js';

const model = new Model();
const presenter = new Presenter(model);
presenter.init();
