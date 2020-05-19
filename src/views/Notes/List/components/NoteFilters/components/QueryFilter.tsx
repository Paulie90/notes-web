import React, { ChangeEvent, Dispatch, FunctionComponent } from "react";
import FormControl from "react-bootstrap/FormControl";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { TAppAction } from "data/actions";
import { selectFilterFavoriteAction, selectFilterQueryAction, selectFilterTagAction } from "data/Notes";
import { IAppState } from "data/reducers";

import { LabelSection } from "components/LabelSection";

export const QueryFilter: FunctionComponent = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch<Dispatch<TAppAction>>();
  const filterQuery = useSelector<IAppState, string | undefined>((state) => state.notes.filterQuery);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // clear other filters
    dispatch(selectFilterTagAction());
    dispatch(selectFilterFavoriteAction(false));

    const inputText = event.target.value;
    dispatch(selectFilterQueryAction(inputText));
  };

  return (
    <LabelSection
      LabelPanel={<small className="text-muted mr-2">{t("NOTES.LIST.FILTERS.QUERY_FILTER_HEADER")}</small>}
      ContentPanel={
        <FormControl
          onChange={handleChange}
          value={filterQuery || ""}
          placeholder={t("NOTES.LIST.FILTERS.QUERY_FILTER_PLACEHOLDER")}
        />
      }
    />
  );
};
