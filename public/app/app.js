import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer.js'
import rootSaga from './saga.js'
import RouterLevel from './views/RouterLevel.jsx';
//import {PileUp} from './views/PileUp.jsx';

const sagaMiddleware = createSagaMiddleware();
//const preloadedState = window.__PRELOADED_STATE__
const store = createStore(
  reducer,
  {allepiles: {}, tags: {}, status: {}, others: {}},
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(<RouterLevel store={store}/>, document.getElementById("app"));
