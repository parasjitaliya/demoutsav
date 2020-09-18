//import 'bootstrap/dist/css/bootstrap.css';

//import * as React from 'react';
//import * as ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
//import { ConnectedRouter } from 'connected-react-router';
//import { createBrowserHistory } from 'history';
//import configureStore from './store/configureStore';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';

//// Create browser history to use in the Redux store
//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
//const history = createBrowserHistory({ basename: baseUrl });

//// Get the application-wide store instance, prepopulating with state from the server where available.
//const store = configureStore(history);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import './App.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './Reducers/Reducers'


const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();