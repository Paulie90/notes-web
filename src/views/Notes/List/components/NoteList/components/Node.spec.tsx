import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { mount, ReactWrapper } from "spec";

import { IAppState } from "data/reducers";

import { Note } from "./Note";

const mockStore = configureMockStore<IAppState>();
const mockNote = {
  text: "test22",
  fav: false,
  id: "so5MOoLgQ",
};
const storeStateMock = {
  notes: {
    pending: false,
    notes: [mockNote],
  },
};

let wrapper: ReactWrapper;
const store = mockStore(storeStateMock);
store.dispatch = jasmine.createSpy("dispatch");

describe("Note component", () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Note note={mockNote} />
      </Provider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should mark the note as favorite", () => {
    wrapper.find(".dropdown div").first().simulate("click");
    expect(wrapper.find(".show.dropdown").length).toBe(1);

    wrapper.find(".dropdown-menu.show a").first().simulate("click");
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "NOTE_EDIT_START",
      note: { text: "test22", fav: true, id: "so5MOoLgQ" },
    });
  });
});
