const ROOT_PATH = "/notes";

export const ROOT = {
  PATH: ROOT_PATH,
  buildPath: () => ROOT_PATH,
};

export const EDIT = {
  PATH: `${ROOT_PATH}/:noteId`,
  buildPath: (noteId: string) => `${ROOT_PATH}/${noteId}`,
};
