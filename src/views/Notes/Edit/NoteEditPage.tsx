import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";

import { TAppAction } from "data/actions";
import { fetchNoteStartAction, INote } from "data/Notes";
import { IAppState } from "data/reducers";

import { EditForm, Header } from "./components";

interface StateProps {
  note?: INote;
}

interface DispatchProps {
  onLoad(noteId: string): void;
}

const NoteEditPageComponent: FunctionComponent<StateProps & DispatchProps> = ({ note, onLoad }) => {
  const { noteId } = useParams();

  useEffect(() => {
    onLoad(noteId);
  }, [onLoad, noteId]);

  if (!note) {
    return null;
  }

  return (
    <div>
      <div className="mb-3">
        <Header />
      </div>
      <EditForm note={note} />
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  note: state.notes.note,
});

const mapDispatchToProps = (dispatch: Dispatch<TAppAction>) =>
  bindActionCreators(
    {
      onLoad: fetchNoteStartAction,
    },
    dispatch,
  );

export const NoteEditPage = connect<StateProps, DispatchProps, {}, IAppState>(
  mapStateToProps,
  mapDispatchToProps,
)(NoteEditPageComponent);
