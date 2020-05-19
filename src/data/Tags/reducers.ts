import { AxiosError } from "axios";
import { Reducer } from "redux";

import { TAGS_FETCH_ERROR, TAGS_FETCH_START, TAGS_FETCH_SUCCESS, TAGS_SELECT_FILTER_TAG, TTagsAction } from "./actions";
import { TTag } from "./types";

export interface ITagsState {
  pending: boolean;
  tags: TTag[];
  filterTag?: TTag;
  error?: AxiosError;
}

const initialState = {
  pending: false,
  tags: [],
};

export const tagsReducer: Reducer<ITagsState, TTagsAction> = (
  state: ITagsState = initialState,
  action: TTagsAction,
) => {
  switch (action.type) {
    case TAGS_FETCH_START:
      return {
        ...state,
        pending: true,
      };
    case TAGS_FETCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case TAGS_FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        tags: action.tags,
      };
    case TAGS_SELECT_FILTER_TAG:
      return {
        ...state,
        filterTag: action.filterTag,
      };
    default:
      return state;
  }
};
