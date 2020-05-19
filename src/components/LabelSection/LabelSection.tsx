import React, { FunctionComponent, ReactElement } from "react";

interface Props {
  LabelPanel: ReactElement;
  ContentPanel: ReactElement;
  labelWidth?: number;
  contentWidth?: number;
}

export const LabelSection: FunctionComponent<Props> = ({ LabelPanel, ContentPanel }) => (
  <div className="d-flex align-items-center my-2">
    <div className="pl-0 pr-1 col-3 col-md-2 col-xl-1">{LabelPanel}</div>
    <div className="pl-1 pr-0 col-9 col-md-10 col-xl-11">{ContentPanel}</div>
  </div>
);
