import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import configureMockStore, { MockStore } from "redux-mock-store";
import { mount, ReactWrapper } from "spec";

import { IAppState } from "data/reducers";

import { EditForm, Header } from "./components";
import { NoteEditPage } from "./NoteEditPage";

const mockStore = configureMockStore<IAppState>([]);
const storeStateMock = {
  notes: {
    pending: false,
    notes: [],
    note: {
      text: "test22",
      fav: false,
      id: "so5MOoLgQ",
    },
  },
};

let store: MockStore<IAppState>;
let wrapper: ReactWrapper;

describe("NoteEditPage component", () => {
  beforeEach(() => {
    store = mockStore(storeStateMock);
    store.dispatch = jasmine.createSpy("dispatch");

    wrapper = mount(
      <MemoryRouter initialEntries={["notes/so5MOoLgQ"]}>
        <Route path="notes/:noteId">
          <Provider store={store}>
            <NoteEditPage />
          </Provider>
        </Route>
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should not render if there's no note", () => {
    store = mockStore({
      notes: {
        pending: false,
        notes: [],
        note: undefined,
      },
    });

    wrapper = mount(
      <MemoryRouter initialEntries={["notes/so5MOoLgQ"]}>
        <Route path="notes/:noteId">
          <Provider store={store}>
            <NoteEditPage />
          </Provider>
        </Route>
      </MemoryRouter>,
    );

    expect(wrapper.find(Header).length).toBe(0);
    expect(wrapper.find(EditForm).length).toBe(0);
  });

  it("should render Header and EditForm components", () => {
    expect(wrapper.find(Header).length).toBe(1);
    expect(wrapper.find(EditForm).length).toBe(1);
  });

  it("should dispatch action to get the note list", () => {
    expect(store.dispatch).toHaveBeenCalledWith({ type: "NOTE_FETCH_START", noteId: "so5MOoLgQ" });
  });
});
