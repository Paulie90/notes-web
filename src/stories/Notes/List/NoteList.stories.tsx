import React from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import { IAppState } from "data/reducers";

import { NoteList } from "views/Notes/List/components";

import i18n from "../../../i18n";

import "../../../index.scss";

export default {
  title: "NoteList",
  component: NoteList,
};

const storeStateMock = {
  notes: {
    pending: false,
    notes: [
      {
        text: "test22",
        fav: false,
        id: "so5MOoLgQ",
      },
      {
        text: "testasd",
        fav: true,
        id: "eQLuSHhKO",
      },
      {
        text: "sdass123",
        fav: true,
        id: "lbOfq3OIn",
      },
    ],
  },
};

const store = configureMockStore<IAppState>([])(storeStateMock);

export const Default = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <NoteList />
    </I18nextProvider>
  </Provider>
);

const store2 = configureMockStore<IAppState>([])({
  notes: {
    pending: false,
    notes: [],
  },
});

export const Empty = () => (
  <Provider store={store2}>
    <I18nextProvider i18n={i18n}>
      <NoteList />
    </I18nextProvider>
  </Provider>
);
