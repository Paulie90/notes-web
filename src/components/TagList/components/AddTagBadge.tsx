import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import React, { FunctionComponent, useState } from "react";
import FormControl from "react-bootstrap/FormControl";

import { TTag } from "data/Tags";

import { Badge } from "components/Badge";

import "./AddTagBadge.scss";

interface Props {
  onAdd: (tag: TTag) => void;
}

export const AddTagBadge: FunctionComponent<Props> = ({ onAdd }) => {
  const [name, setName] = useState<string>("");

  const handleAdd = () => {
    onAdd(name);
    setName("");
  };

  return (
    <div className="d-flex py-2">
      <Badge icon={faPlusCircle} variant="success" onIconClick={handleAdd}>
        <FormControl
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="sm"
          className="AddTagBadge__input mr-1"
        />
      </Badge>
    </div>
  );
};
