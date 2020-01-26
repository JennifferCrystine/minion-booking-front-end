import React from "react";
import AppliedRoute from "./components/AppliedRoute";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewMinion from "./containers/NewMinion";
import Minions from "./containers/Minions";
import NotFound from "./containers/NotFound";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/minions/new" exact component={NewMinion} appProps={appProps} />
      <AppliedRoute path="/minions/:id" exact component={Minions} appProps={appProps} />
    </Switch>
  );
}