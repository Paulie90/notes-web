import React, { FunctionComponent } from "react";
import Container from "react-bootstrap/Container";

import { Header } from "./components";

export const Layout: FunctionComponent = ({ children }) => (
  <>
    <Header />
    <Container className="shadow-sm bg-white py-2 py-md-4">{children}</Container>
  </>
);
