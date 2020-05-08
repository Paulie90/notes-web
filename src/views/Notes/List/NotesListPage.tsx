import React, { FunctionComponent, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { TAppAction } from "data/actions";
import { fetchNotesStartAction, INote } from "data/Notes";
import { IAppState } from "data/reducers";

import { AddNotes, NoteList } from "./components";

import "./NotesListPage.scss";

interface StateProps {
  notes: INote[];
}

interface DispatchProps {
  onLoad(): void;
}

const NotesListPageComponent: FunctionComponent<StateProps & DispatchProps> = ({ notes, onLoad }) => {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <Container>
      <AddNotes />
      <NoteList notes={notes} />
    </Container>
  );
};

const mapStateToProps = (state: IAppState) => ({
  notes: state.notes.notes,
});

const mapDispatchToProps = (dispatch: Dispatch<TAppAction>) =>
  bindActionCreators(
    {
      onLoad: fetchNotesStartAction,
    },
    dispatch,
  );

export const NotesListPage = connect<StateProps, DispatchProps, {}, IAppState>(
  mapStateToProps,
  mapDispatchToProps,
)(NotesListPageComponent);
