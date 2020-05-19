import React, { FunctionComponent } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";

import { IAppState } from "data/reducers";

import { Header } from "./components";

import "./Layout.scss";

export const Layout: FunctionComponent = ({ children }) => {
  const pending = useSelector<IAppState, boolean>((state) => state.notes.pending || state.tags.pending);

  return (
    <>
      <Header />
      {pending && (
        <div className="Layout__overlay">
          <div className="Layout__overlay--loader">Loading...</div>
        </div>
      )}
      <Container className="shadow-sm bg-white p-2 p-md-4">{children}</Container>
    </>
  );
};
