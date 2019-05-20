import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/machines" component={Machines} />
    <Route path="/statuses" component={Dashboard} />
  </Switch>
);

export default Routes;
