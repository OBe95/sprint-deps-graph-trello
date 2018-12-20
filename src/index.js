import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import "index.scss";
import Home from "containers/Home";
import * as serviceWorker from "serviceWorker";
import { trelloDepsGraphReducer } from "containers/reducer";
import trelloDepsGraphSagas from "containers/sagas";

const reducer = combineReducers(trelloDepsGraphReducer);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// run sagas
sagaMiddleware.run(trelloDepsGraphSagas);

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
