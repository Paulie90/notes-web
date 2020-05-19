import { TNotesAction } from "./Notes";
import { TTagsAction } from "./Tags/actions";

export type TAppAction = TNotesAction | TTagsAction;
