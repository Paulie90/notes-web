import React, { FunctionComponent, memo, useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";

import { TAppAction } from "data/actions";
import { editNoteStartAction, INote } from "data/Notes";
import { IAppState } from "data/reducers";

interface StateProps {
  pending: boolean;
}

interface DispatchProps {
  onEdit(note: INote): void;
}

interface OwnProps {
  note: INote;
}

const EditFormComponent: FunctionComponent<StateProps & DispatchProps & OwnProps> = ({ note, pending, onEdit }) => {
  const { t } = useTranslation("common");
  const history = useHistory();
  const [inputText, setInputText] = useState<string>(note.text);
  const [isFavChecked, setIsFavChecked] = useState<boolean>(note.fav);

  const isSubmitDisabled = pending || !inputText;

  const handleEdit = () => {
    if (isSubmitDisabled) {
      return;
    }
    const updatedNote = { ...note, text: inputText, fav: isFavChecked };

    onEdit(updatedNote);
    history.goBack();
  };

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Checkbox checked={isFavChecked} onChange={(e) => setIsFavChecked(e.target.checked)} />
        {/* <InputGroup.Text> {t("NOTES.EDIT.FAVORITE_LABEL")}</InputGroup.Text> */}
      </InputGroup.Prepend>
      <FormControl value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <InputGroup.Append>
        <Button variant="outline-success" onClick={() => handleEdit()} disabled={isSubmitDisabled}>
          {t("NOTES.EDIT.BUTTON_SAVE")}
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

const MemoEditForm = memo(EditFormComponent);

const mapStateToProps = (state: IAppState) => ({
  pending: state.notes.pending,
  note: state.notes.note,
});

const mapDispatchToProps = (dispatch: Dispatch<TAppAction>) =>
  bindActionCreators(
    {
      onEdit: editNoteStartAction,
    },
    dispatch,
  );

export const EditForm = connect<StateProps, DispatchProps, OwnProps, IAppState>(
  mapStateToProps,
  mapDispatchToProps,
)(MemoEditForm);
