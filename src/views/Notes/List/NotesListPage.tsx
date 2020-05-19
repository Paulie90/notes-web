import React, { FunctionComponent, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { TAppAction } from "data/actions";
import { fetchNotesByTagStartAction, fetchNotesStartAction } from "data/Notes";
import { IAppState } from "data/reducers";
import { TTag } from "data/Tags";

import { AddNotes, NoteFilters, NoteList } from "./components";

import "./NotesListPage.scss";

export const NotesListPage: FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch<TAppAction>>();
  const filterTag = useSelector<IAppState, TTag | undefined>((state) => state.tags.filterTag);

  useEffect(() => {
    if (filterTag) {
      dispatch(fetchNotesByTagStartAction(filterTag));
      return;
    }

    // if (filters.query) {
    //   // TODO: load by query
    //   return;
    // }

    // if (isBoolean(filters.favorite)) {
    //   // TODO: load by favorite
    //   return;
    // }

    dispatch(fetchNotesStartAction());
  }, [dispatch, filterTag]);

  return (
    <Container>
      <NoteFilters />
      <AddNotes />
      <NoteList />
    </Container>
  );
};
