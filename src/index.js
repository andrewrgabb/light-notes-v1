import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import AppDemo from "./AppDemo.jsx";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/demo">
        <AppDemo />
      </Route>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);