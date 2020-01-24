import React from "react";
import AppliedRoute from "./components/AppliedRoute";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewMinion from "./containers/NewMinion";
import NotFound from "./containers/NotFound";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/minions/new" exact component={NewMinion} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}