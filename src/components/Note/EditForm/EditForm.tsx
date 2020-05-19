import React, { ChangeEvent, FunctionComponent, memo, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { useTranslation } from "react-i18next";

import { INote } from "data/Notes";
import { TTag } from "data/Tags";

import { TagList } from "components/TagList";

interface Props {
  note: INote;
  onChange(note: INote): void;
}

const EditFormComponent: FunctionComponent<Props> = ({ note, onChange }) => {
  const { t } = useTranslation("common");
  const [cacheNote, setCacheNote] = useState<INote>(note);

  const handleTagsChange = (tags: TTag[]) => {
    const updatedNote = {
      ...cacheNote,
      tags,
    };

    setCacheNote(updatedNote);
    onChange(updatedNote);
  };

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
    <>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Checkbox checked={cacheNote.fav} onChange={handleFavChange} />
          <InputGroup.Text> {t("NOTES.EDIT.FAVORITE_LABEL")}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl value={cacheNote.text} onChange={handleNameChange} />
      </InputGroup>
      <TagList tags={cacheNote.tags} onChange={handleTagsChange} />
    </>
  );
};

export const EditForm = memo(EditFormComponent);
