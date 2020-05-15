import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { mount, ReactWrapper } from "spec";

import { IAppState } from "data/reducers";

import { EditForm } from "./EditForm";

const mockStore = configureMockStore<IAppState>([]);
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

const store = mockStore(storeStateMock);
store.dispatch = jasmine.createSpy("dispatch");
let wrapper: ReactWrapper;

describe("EditForm component", () => {
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={["notes/so5MOoLgQ"]}>
        <Provider store={store}>
          <EditForm note={mockNote} />
        </Provider>
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should change the name and dispatch edit action ", () => {
    wrapper.find(".form-control").simulate("change", { target: { value: "pawel" } });

    wrapper.find(".btn").first().simulate("click");

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "NOTE_EDIT_START",
      note: { text: "pawel", fav: false, id: "so5MOoLgQ" },
    });
  });
});
