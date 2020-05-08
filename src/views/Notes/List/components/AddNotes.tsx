import React, { FunctionComponent, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { TAppAction } from "data/actions";
import { addNoteStartAction } from "data/Notes";
import { IAppState } from "data/reducers";

interface StateProps {
  pending: boolean;
}

interface DispatchProps {
  onAdd(text: string): void;
}

const AddNotesComponent: FunctionComponent<StateProps & DispatchProps> = ({ pending, onAdd }) => {
  const { t } = useTranslation("common");
  const [noteText, setNoteText] = useState<string>("");

  const isSubmitDisabled = pending || !noteText;
  const handleAdd = () => {
    if (isSubmitDisabled) {
      return;
    }

    onAdd(noteText);
    setNoteText("");
  };

  return (
    <Container>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={t("NOTES.LIST.ADD_NOTES.ADD_PLACEHOLDER")}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <InputGroup.Append>
          <Button variant="outline-primary" onClick={handleAdd} disabled={isSubmitDisabled}>
            {t("NOTES.LIST.ADD_NOTES.ADD_BUTTON")}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Container>
  );
};

const mapStateToProps = (state: IAppState) => ({
  pending: state.notes.pending,
});

const mapDispatchToProps = (dispatch: Dispatch<TAppAction>) =>
  bindActionCreators(
    {
      onAdd: addNoteStartAction,
    },
    dispatch,
  );

export const AddNotes = connect<StateProps, DispatchProps, {}, IAppState>(
  mapStateToProps,
  mapDispatchToProps,
)(AddNotesComponent);
