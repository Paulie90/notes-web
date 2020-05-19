import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import React, { FunctionComponent } from "react";

import { TTag } from "data/Tags";

import { TagBadge } from "./components/TagBadge";

interface Props {
  tags: TTag[];
  onDelete: (tags: TTag[]) => void;
}

export const TagBadges: FunctionComponent<Props> = ({ tags = [], onDelete }) => {
  const handleDelete = (index: number) => {
    const updatedTags = tags.filter((_, ind) => ind !== index);

    onDelete(updatedTags);
  };

  const badges = tags.map((tag, index) => (
    <TagBadge key={index} tag={tag} icon={faMinusCircle} onClick={() => handleDelete(index)} />
  ));

  return <div className="my-2 d-flex">{badges}</div>;
};
