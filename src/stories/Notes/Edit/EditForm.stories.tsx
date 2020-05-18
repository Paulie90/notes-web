import React from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import { IAppState } from "data/reducers";

import { EditForm } from "components/Note";

import i18n from "../../../i18n";

import "../../../index.scss";

export default {
  title: "EditForm",
  component: EditForm,
};

const mockNote = {
  text: "test22",
  fav: false,
  id: "so5MOoLgQ",
};

const storeStateMock = {
  notes: {
    pending: false,
    notes: [],
    note: mockNote,
  },
};

const store = configureMockStore<IAppState>([])(storeStateMock);

export const Default = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <EditForm note={mockNote} onChange={() => null} />
    </I18nextProvider>
  </Provider>
);

const mockNote2 = {
  text: "pawel",
  fav: true,
  id: "so5MOoLDF",
};
const store2 = configureMockStore<IAppState>([])({
  notes: {
    ...storeStateMock.notes,
    note: mockNote2,
  },
});

export const Favorite = () => (
  <Provider store={store2}>
    <I18nextProvider i18n={i18n}>
      <EditForm
        note={{
          id: "asda",
          text: "asdqwe",
          fav: true,
        }}
        onChange={() => null}
      />
    </I18nextProvider>
  </Provider>
);
