import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { FavoriteFilter, QueryFilter, TagFilter } from "./components";

export const NoteFilters: FunctionComponent = () => {
  const { t } = useTranslation("common");

  return (
    <div className="mb-3 w-100">
      <h3 className="text-uppercase text-gra">{t("NOTES.LIST.FILTERS.HEADER")}</h3>
      <QueryFilter />
      <FavoriteFilter />
      <TagFilter />
    </div>
  );
};
