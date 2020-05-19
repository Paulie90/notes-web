import React, { FunctionComponent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Dispatch } from "redux";

import { TAppAction } from "data/actions";
import { editNoteStartAction, fetchNoteStartAction, INote } from "data/Notes";
import { IAppState } from "data/reducers";

import { EditForm } from "components/Note";

import { Header } from "./components";

export const NoteEditPage: FunctionComponent = () => {
  const { noteId } = useParams();
  const { t } = useTranslation("common");
  const history = useHistory();

  const pending = useSelector<IAppState, boolean>((state) => state.notes.pending);
  const note = useSelector<IAppState, INote | undefined>((state) => state.notes.note);
  const dispatch = useDispatch<Dispatch<TAppAction>>();
  const [cacheNote, setCacheNote] = useState<INote | undefined>(note);

  useEffect(() => {
    dispatch(fetchNoteStartAction(noteId));
  }, [dispatch, noteId]);

  if (!note) {
    return null;
  }

  const isSubmitDisabled = pending || !cacheNote?.text;
  const handleEdit = () => {
    if (isSubmitDisabled) {
      return;
    }

    if (cacheNote) {
      dispatch(editNoteStartAction(cacheNote));
      history.goBack();
    }
  };

  return (
    <div>
      <div className="mb-3">
        <Header />
      </div>
      <div className="mb-3">
        <EditForm note={note} onChange={setCacheNote} />
      </div>
      <div className="d-flex w-100 justify-content-end">
        <Button variant="outline-success" onClick={() => handleEdit()} disabled={isSubmitDisabled}>
          {t("NOTES.EDIT.BUTTON_SAVE")}
        </Button>
      </div>
    </div>
  );
};
