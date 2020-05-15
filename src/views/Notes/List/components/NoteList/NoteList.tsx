import React, { FunctionComponent, memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { INote } from "data/Notes";
import { IAppState } from "data/reducers";

import { Note } from "./components";

const NoteListComponent: FunctionComponent = () => {
  const notes = useSelector<IAppState, INote[]>((state) => state.notes.notes);
  const { t } = useTranslation("common");

  const noteComponents = notes.map((note) => <Note note={note} key={note.id} />);

  return (
    <div>
      <span>{t("NOTES.LIST.HEADER_TEXT", { count: notes.length })}</span>
      {noteComponents}
    </div>
  );
};

export const NoteList = memo(NoteListComponent);
