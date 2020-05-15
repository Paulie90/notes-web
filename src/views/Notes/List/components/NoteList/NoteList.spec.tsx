import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { mount, ReactWrapper } from "spec";

import { IAppState } from "data/reducers";

import { Note } from "./components";
import { NoteList } from "./NoteList";

const mockStore = configureMockStore<IAppState>();
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

let wrapper: ReactWrapper;
const store = mockStore(storeStateMock);

describe("NoteList component", () => {
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <NoteList />
        </Provider>
      </BrowserRouter>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render three Note components", () => {
    expect(wrapper.find(Note).length).toBe(3);
  });
});
