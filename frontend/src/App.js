"use strict";

import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import UserService from "./services/UserService";
import { UserLoginView } from "./views/UserLoginView";
import { UserSignupView } from "./views/UserSignupView";

import { VehicleListView } from "./views/VehicleListView";
import { VehicleDetailView } from "./views/VehicleDetailView";
import { VehicleRegisterView } from "./views/VehicleRegisterView";
import { VehicleDeregisterView } from "./views/VehicleDeregisterView";
import { VehicleFormView } from "./views/VehicleFormView";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "MyKfz",
      routes: [
        { component: VehicleListView, path: "/", exact: true },
        { component: VehicleDetailView, path: "/show/:id" },
        {
          render: (props) => {
            if (UserService.isAuthenticated()) {
              return <VehicleFormView {...props} />;
            } else {
              return <Redirect to={"/login"} />;
            }
          },
          path: "/edit/:id",
        },
        { component: VehicleDetailView, path: "/show/:id" },
        { component: VehicleRegisterView, path: "/register/:id"},
        { component: VehicleDeregisterView, path: "/deregister/:id"},
        {
          render: (props) => {
            if (UserService.isAuthenticated()) {
              return <VehicleFormView {...props} />;
            } else {
              return <Redirect to={"/login"} />;
            }
          },
          path: "/add",
        },
        { component: UserLoginView, path: "/login" },
        { component: UserSignupView, path: "/register" },
      ],
    };
  }

  componentDidMount() {
    document.title = this.state.title;
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            {this.state.routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Switch>
        </Router>
      </div>
    );
  }
}
