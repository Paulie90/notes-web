import { TTag, TTagsDTO } from "data/Tags";

interface INoteBase {
  id: string;
  text: string;
  fav: boolean;
}
export interface INote extends INoteBase {
  tags?: TTag[];
}

export interface INoteDTO extends INoteBase {
  tags?: TTagsDTO;
}
