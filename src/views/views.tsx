import React, { FunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { NotesRoutes } from "./Notes/views";
import PATHS from "./paths";

export const AppRoutes: FunctionComponent = () => (
  <Switch>
    <Redirect exact from="/" to="notes" />
    <Route path={PATHS.NOTES.ROOT.PATH} component={NotesRoutes} />
  </Switch>
);
