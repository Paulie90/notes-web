import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import "./Header.scss";

export const Header: FunctionComponent = () => {
  const { t } = useTranslation("common");
  const history = useHistory();

  return (
    <div className="Header" onClick={() => history.goBack()}>
      <FontAwesomeIcon className="mr-3" icon={faArrowLeft} />
      {t("NOTES.EDIT.BUTTON_BACK")}
    </div>
  );
};
