import React, { FunctionComponent, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { TAppAction } from "data/actions";
import {
  fetchNotesByFavoriteStartAction,
  fetchNotesByTagStartAction,
  fetchNotesStartAction,
  initFetchNotesByQueryInitAction,
} from "data/Notes";
import { IAppState } from "data/reducers";
import { TTag } from "data/Tags";

import { AddNotes, NoteFilters, NoteList } from "./components";

import "./NotesListPage.scss";

export const NotesListPage: FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch<TAppAction>>();
  const filterTag = useSelector<IAppState, TTag | undefined>((state) => state.notes.filterTag);
  const filterFav = useSelector<IAppState, boolean | undefined>((state) => state.notes.filterFav);
  const filterQuery = useSelector<IAppState, string | undefined>((state) => state.notes.filterQuery);

  useEffect(() => {
    if (filterTag) {
      dispatch(fetchNotesByTagStartAction(filterTag));
      return;
    }

    if (filterQuery) {
      dispatch(initFetchNotesByQueryInitAction(filterQuery));
      return;
    }

    if (filterFav) {
      dispatch(fetchNotesByFavoriteStartAction());
      return;
    }

    dispatch(fetchNotesStartAction());
  }, [dispatch, filterTag, filterQuery, filterFav]);

  return (
    <Container>
      <NoteFilters />
      <AddNotes />
      <NoteList />
    </Container>
  );
};
