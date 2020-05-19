import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { TAppAction } from "data/actions";
import { selectFilterFavoriteAction, selectFilterTagAction } from "data/Notes";
import { IAppState } from "data/reducers";
import { TTag } from "data/Tags";
import { fetchTagsStartAction } from "data/Tags/actions";

import { TagBadge } from "components/TagBadges";

export const TagFilter: FunctionComponent = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch<Dispatch<TAppAction>>();
  const tags = useSelector<IAppState, TTag[]>((state) => state.tags.tags);
  const filterTag = useSelector<IAppState, TTag | undefined>((state) => state.notes.filterTag);

  const selectTag = (tag: TTag) => {
    dispatch(selectFilterFavoriteAction(false));

    if (tag === filterTag) {
      dispatch(selectFilterTagAction());
    } else {
      dispatch(selectFilterTagAction(tag));
    }
  };

  const badgeComponents = tags.map((tag, index) => (
    <TagBadge
      key={index}
      tag={tag}
      icon={tag === filterTag ? faCheckCircle : faCircle}
      onClick={() => selectTag(tag)}
    />
  ));

  useEffect(() => {
    dispatch(fetchTagsStartAction());
  }, [dispatch]);

  return (
    <div className="d-flex align-items-center">
      <small className="text-muted mr-2">{t("NOTES.LIST.FILTERS.TAG_FILTER_HEADER")}</small>
      <div className="d-flex">{badgeComponents}</div>
    </div>
  );
};
