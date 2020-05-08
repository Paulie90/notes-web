import React, { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export const Header: FunctionComponent = () => {
  const { t } = useTranslation("common");
  const location = useLocation();

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/notes">{t("COMPONENTS.LAYOUT.HEADER_TEXT")}</Navbar.Brand>
      <Nav>
        <Nav.Link href="/notes" active={location.pathname.startsWith("/notes")}>
          {t("COMPONENTS.NAVBAR.LIST_LINK")}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};
