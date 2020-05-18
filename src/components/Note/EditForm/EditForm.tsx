import React, { ChangeEvent, FunctionComponent, memo, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import { INote } from "data/Notes";

interface Props {
  note: INote;
  onChange(note: INote): void;
}

const EditFormComponent: FunctionComponent<Props> = ({ note, onChange }) => {
  const [cacheNote, setCacheNote] = useState<INote>(note);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedNote = {
      ...cacheNote,
      text: event.target.value,
    };

    setCacheNote(updatedNote);
    onChange(updatedNote);
  };

  const handleFavChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedNote = {
      ...cacheNote,
      fav: event.target.checked,
    };

    setCacheNote(updatedNote);
    onChange(updatedNote);
  };

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Checkbox checked={cacheNote.fav} onChange={handleFavChange} />
        {/* <InputGroup.Text> {t("NOTES.EDIT.FAVORITE_LABEL")}</InputGroup.Text> */}
      </InputGroup.Prepend>
      <FormControl value={cacheNote.text} onChange={handleNameChange} />
    </InputGroup>
  );
};

export const EditForm = memo(EditFormComponent);
