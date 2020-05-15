import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import { NoteEditPage } from "./Edit/NoteEditPage";
import { NotesListPage } from "./List/NotesListPage";
import * as NOTES from "./paths";

export const NotesRoutes: FunctionComponent = () => (
  <Switch>
    <Route path={NOTES.EDIT.PATH}>
      <NoteEditPage />
    </Route>
    <Route path={NOTES.ROOT.PATH}>
      <NotesListPage />
    </Route>
  </Switch>
);
