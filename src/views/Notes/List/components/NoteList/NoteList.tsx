import React, { FunctionComponent, memo } from "react";
import { useTranslation } from "react-i18next";

import { INote } from "data/Notes";

import { Note } from "./components";

interface Props {
  notes: INote[];
}

const NoteListComponent: FunctionComponent<Props> = ({ notes }) => {
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
