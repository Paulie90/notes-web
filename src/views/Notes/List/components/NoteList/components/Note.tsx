import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, FunctionComponent, memo, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { TAppAction } from "data/actions";
import { deleteNoteStartAction, editNoteStartAction, INote } from "data/Notes";

import paths from "views/paths";

import { EditModal } from "./EditModal";

import "./Note.scss";

const IconComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ onClick }, ref) => (
  <div ref={ref} onClick={onClick}>
    <FontAwesomeIcon icon={faEllipsisH} className="text-black-50" />
  </div>
));

interface Props {
  note: INote;
}

const NoteComponent: FunctionComponent<Props> = ({ note }) => {
  const { t } = useTranslation("common");
  const history = useHistory();
  const dispatch = useDispatch<Dispatch<TAppAction>>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleFavorite = (fav: boolean) => {
    const updatedNote = { ...note, fav };

    dispatch(editNoteStartAction(updatedNote));
  };

  const handleEdit = (updatedNote: INote) => {
    dispatch(editNoteStartAction(updatedNote));
    setShowEditModal(false);
  };
  const handleDelete = () => dispatch(deleteNoteStartAction(note.id));

  return (
    <div className="my-2 px-1 px-sm-2 py-1 py-md-2 w-100 d-flex justify-content-between bg-light border">
      <div className="Note__name-container pr-2">
        <div className="d-flex justify-content-between" onClick={() => setShowEditModal(true)}>
          <span className="d-flex">{note.text}</span>
          {note.fav && <span className="text-black-50">{t("NOTES.LIST.NOTE.FAVORITE_LABEL")}</span>}
        </div>
      </div>
      <Dropdown id="note-actions" title="note-actions">
        <Dropdown.Toggle id="note-actions-toggle" as={IconComponent} />
        <Dropdown.Menu>
          {note.fav ? (
            <Dropdown.Item onClick={() => handleFavorite(false)}>
              {t("NOTES.LIST.NOTE.BUTTON_UNMARK_FAVORITE")}
            </Dropdown.Item>
          ) : (
            <Dropdown.Item onClick={() => handleFavorite(true)}>
              {t("NOTES.LIST.NOTE.BUTTON_MARK_FAVORITE")}
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={() => history.push(paths.NOTES.EDIT.buildPath(note.id))}>
            {t("NOTES.LIST.NOTE.BUTTON_EDIT")}
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleDelete}>
            <span className="text-danger">{t("NOTES.LIST.NOTE.BUTTON_DELETE")}</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <EditModal show={showEditModal} note={note} onSave={handleEdit} onClose={() => setShowEditModal(false)} />
    </div>
  );
};

export const Note = memo(NoteComponent);
