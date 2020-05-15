import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import jasmineEnzyme from "jasmine-enzyme";

configure({ adapter: new Adapter() });

beforeEach(() => {
  jasmineEnzyme();
});

export * from "enzyme";
