import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { mount, ReactWrapper } from "spec";

import { IAppState } from "data/reducers";

import { AddNotes, NoteList } from "./components";
import { NotesListPage } from "./NotesListPage";

const mockStore = configureMockStore<IAppState>([]);
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

const store = mockStore(storeStateMock);
store.dispatch = jasmine.createSpy("dispatch");
let wrapper: ReactWrapper;

describe("NotesListPage component", () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <NotesListPage />
      </Provider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render AddNotes and NoteList of components", () => {
    expect(wrapper.find(NoteList).length).toBe(1);
    expect(wrapper.find(AddNotes).length).toBe(1);
  });

  it("should dispatch action to get the note list", () => {
    expect(store.dispatch).toHaveBeenCalledWith({ type: "NOTES_FETCH_START" });
  });
});
