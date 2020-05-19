import React, { ChangeEvent, FunctionComponent } from "react";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { TAppAction } from "data/actions";
import { selectFilterFavoriteAction, selectFilterTagAction } from "data/Notes";
import { IAppState } from "data/reducers";

export const FavoriteFilter: FunctionComponent = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch<Dispatch<TAppAction>>();
  const filterFav = useSelector<IAppState, boolean | undefined>((state) => state.notes.filterFav);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    dispatch(selectFilterTagAction());
    dispatch(selectFilterFavoriteAction(isChecked));
  };

  return (
    <div className="d-flex align-items-center">
      <small className="text-muted mr-2">{t("NOTES.LIST.FILTERS.TAG_FILTER_HEADER")}</small>
      <Form>
        <Form.Check
          type="checkbox"
          checked={!!filterFav}
          label={t("NOTES.LIST.FILTERS.FAV_FILTER_LABEL")}
          onChange={handleChange}
        />
      </Form>
    </div>
  );
};
