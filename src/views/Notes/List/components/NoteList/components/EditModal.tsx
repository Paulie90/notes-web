import { FunctionComponent, memo, useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

import { INote } from "data/Notes";

import { EditForm } from "components/Note";

interface Props {
  show: boolean;
  note: INote;
  onClose: () => void;
  onSave: (note: INote) => void;
}

const EditModalComponent: FunctionComponent<Props> = ({ show, note, onClose, onSave }) => {
  const { t } = useTranslation("common");
  const [cacheNote, setCacheNote] = useState<INote>(note);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("NOTES.LIST.MODAL.HEADER")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditForm note={note} onChange={setCacheNote} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t("NOTES.LIST.MODAL.CANCEL_BUTTON")}
        </Button>
        <Button variant="primary" onClick={() => onSave(cacheNote)}>
          {t("NOTES.LIST.MODAL.SAVE_BUTTON")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const EditModal = memo(EditModalComponent);
