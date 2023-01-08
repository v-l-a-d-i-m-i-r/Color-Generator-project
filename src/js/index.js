import { dispatcher } from './services/dispatcher.js';
import { actions } from './constants/constants.js';
import { App } from './components/app/app.js';

const { INIT } = actions;

const root = document.getElementById('root');

root.appendChild(App());

dispatcher.dispatch(INIT);
