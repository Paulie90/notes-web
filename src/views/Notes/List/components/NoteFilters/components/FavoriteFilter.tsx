import React, { ChangeEvent, FunctionComponent } from "react";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { TAppAction } from "data/actions";
import { selectFilterFavoriteAction, selectFilterQueryAction, selectFilterTagAction } from "data/Notes";
import { IAppState } from "data/reducers";

import { LabelSection } from "components/LabelSection";

export const FavoriteFilter: FunctionComponent = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch<Dispatch<TAppAction>>();
  const filterFav = useSelector<IAppState, boolean | undefined>((state) => state.notes.filterFav);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // clear other filters
    dispatch(selectFilterTagAction());
    dispatch(selectFilterQueryAction(""));

    const isChecked = event.target.checked;
    dispatch(selectFilterFavoriteAction(isChecked));
  };

  return (
    <LabelSection
      LabelPanel={<small className="text-muted mr-2">{t("NOTES.LIST.FILTERS.TAG_FILTER_HEADER")}</small>}
      ContentPanel={
        <Form>
          <Form.Check
            type="checkbox"
            checked={!!filterFav}
            label={t("NOTES.LIST.FILTERS.FAV_FILTER_LABEL")}
            onChange={handleChange}
          />
        </Form>
      }
    />
  );
};
