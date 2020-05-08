import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, memo } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";

import { TAppAction } from "data/actions";
import { deleteNoteStartAction, editNoteStartAction, INote } from "data/Notes";
import { IAppState } from "data/reducers";

import paths from "views/paths";

const IconComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ onClick }, ref) => (
  <div ref={ref} onClick={onClick}>
    <FontAwesomeIcon icon={faEllipsisH} className="text-black-50" />
  </div>
));

interface StateProps {
  pending: boolean;
}

interface DispatchProps {
  onFavorite(id: string): void;
  onEdit(note: INote): void;
  onDelete(id: string): void;
}

interface OwnProps {
  note: INote;
}

const NoteComponent: FunctionComponent<StateProps & DispatchProps & OwnProps> = ({ note, onEdit, onDelete }) => {
  const { t } = useTranslation("common");
  const history = useHistory();

  const handleFavorite = (fav: boolean) => {
    const updatedNote = { ...note, fav };

    onEdit(updatedNote);
  };

  return (
    <div className="my-2 px-1 px-sm-2 py-1 py-md-2 w-100 d-flex justify-content-between bg-light border">
      <div className="pr-2 w-100">
        <div className="d-flex justify-content-between">
          <span>{note.text}</span>
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
          <Dropdown.Item onClick={() => onDelete(note.id)}>
            <span className="text-danger">{t("NOTES.LIST.NOTE.BUTTON_DELETE")}</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const MemorizedComponent = memo(NoteComponent);

const mapStateToProps = (state: IAppState) => ({
  pending: state.notes.pending,
});

const mapDispatchToProps = (dispatch: Dispatch<TAppAction>) =>
  bindActionCreators(
    {
      onFavorite: deleteNoteStartAction,
      onEdit: editNoteStartAction,
      onDelete: deleteNoteStartAction,
    },
    dispatch,
  );

export const Note = connect<StateProps, DispatchProps, OwnProps, IAppState>(
  mapStateToProps,
  mapDispatchToProps,
)(MemorizedComponent);
