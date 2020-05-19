import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React, { FunctionComponent } from "react";

import { TTag } from "data/Tags";

import { Badge } from "components/Badge";

interface Props {
  tag: TTag;
  icon?: IconProp;
  onClick: () => void;
}

export const TagBadge: FunctionComponent<Props> = ({ tag, icon, onClick }) => (
  <Badge icon={icon} onIconClick={onClick}>
    <span className="mr-1">{tag}</span>
  </Badge>
);
