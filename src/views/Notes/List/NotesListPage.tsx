import React, { FunctionComponent, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { TAppAction } from "data/actions";
import { fetchNotesStartAction } from "data/Notes";
import { IAppState } from "data/reducers";

import { AddNotes, NoteList } from "./components";

import "./NotesListPage.scss";

interface DispatchProps {
  onLoad(): void;
}

const NotesListPageComponent: FunctionComponent<DispatchProps> = ({ onLoad }) => {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <Container>
      <AddNotes />
      <NoteList />
    </Container>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<TAppAction>) =>
  bindActionCreators(
    {
      onLoad: fetchNotesStartAction,
    },
    dispatch,
  );

export const NotesListPage = connect<{}, DispatchProps, {}, IAppState>(
  () => ({}),
  mapDispatchToProps,
)(NotesListPageComponent);
