import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import "index.css";
import Home from "containers/Home";
import * as serviceWorker from "serviceWorker";
import { trelloDepsGraphReducer } from "containers/reducer";

const reducer = combineReducers({ ...trelloDepsGraphReducer });
const store = createStore(reducer);

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
