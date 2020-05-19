import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { BadgeProps } from "react-bootstrap/Badge";

interface Props {
  icon?: IconProp;
  variant?: BadgeProps["variant"];
  onIconClick?: () => void;
}

export const Badge: FunctionComponent<Props> = ({ children, icon, variant, onIconClick }) => {
  return (
    <div className={`m-1 p-2 d-flex bg-${variant || "primary"} text-white rounded justify-center align-items-center`}>
      {children}
      {icon && <FontAwesomeIcon icon={icon} onClick={() => onIconClick && onIconClick()} color="white" />}
    </div>
  );
};
