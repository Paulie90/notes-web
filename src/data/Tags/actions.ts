import { AxiosError } from "axios";
import { Action } from "redux";

import { TTag } from "./types";

export const TAGS_FETCH_START = "TAGS_FETCH_START";
export const TAGS_FETCH_SUCCESS = "TAGS_FETCH_SUCCESS";
export const TAGS_FETCH_ERROR = "TAGS_FETCH_ERROR";
export const TAGS_SELECT_FILTER_TAG = "TAGS_SELECT_FILTER_TAG";

// -- FETCH LIST --
export interface IFetchTagsStartAction extends Action<typeof TAGS_FETCH_START> {}
export const fetchTagsStartAction = (): IFetchTagsStartAction => ({
  type: TAGS_FETCH_START,
});

export interface IFetchTagsSuccessAction extends Action<typeof TAGS_FETCH_SUCCESS> {
  tags: TTag[];
}
export const fetchTagsSuccessAction = (tags: TTag[]): IFetchTagsSuccessAction => ({
  type: TAGS_FETCH_SUCCESS,
  tags,
});

export interface IFetchTagsErrorAction extends Action<typeof TAGS_FETCH_ERROR> {
  error: AxiosError;
}
export const fetchTagsErrorAction = (error: AxiosError): IFetchTagsErrorAction => ({
  type: TAGS_FETCH_ERROR,
  error,
});

// -- SELECT FILTER TAG --
export interface ISelectFilterTagAction extends Action<typeof TAGS_SELECT_FILTER_TAG> {
  filterTag?: TTag;
}
export const selectFilterTagAction = (filterTag?: TTag): ISelectFilterTagAction => ({
  type: TAGS_SELECT_FILTER_TAG,
  filterTag,
});

export type TTagsAction =
  | IFetchTagsStartAction
  | IFetchTagsSuccessAction
  | IFetchTagsErrorAction
  | ISelectFilterTagAction;
