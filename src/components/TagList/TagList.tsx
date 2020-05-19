import React, { FunctionComponent } from "react";

import { TTag } from "data/Tags";

import { TagBadges } from "components/TagBadges";

import { AddTagBadge } from "./components";

interface Props {
  tags?: TTag[];
  onChange: (tags: TTag[]) => void;
}

export const TagList: FunctionComponent<Props> = ({ tags = [], onChange }) => {
  const handleAdd = (tag: TTag) => {
    const updatedTags = [...tags, tag];

    onChange(updatedTags);
  };

  if (!tags) {
    return <AddTagBadge onAdd={handleAdd} />;
  }

  return (
    <div className="d-flex">
      <TagBadges tags={tags} onDelete={onChange} />
      <AddTagBadge onAdd={handleAdd} />
    </div>
  );
};
