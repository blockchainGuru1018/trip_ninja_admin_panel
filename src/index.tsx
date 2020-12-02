import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./admin/App";
import configureStore from "./admin/store";

const store = configureStore();
const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
