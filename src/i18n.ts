import i18n from "i18next";
import Backend, { BackendOptions } from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

const getTranslationFile = (url: string) => import(`./locales/${url}`).then((data) => data.default);

interface ITranslation {
  [key: string]: any;
}

const ajax = async (
  url: string,
  _options: BackendOptions,
  callback: (data: ITranslation | null, xhr: { status: number }) => void,
) => {
  try {
    getTranslationFile(url).then((translations) => {
      callback(translations, { status: 200 });
    });
  } catch (error) {
    callback(null, { status: 404 });
    throw new Error(error);
  }
};

export const config = {
  backend: {
    loadPath: "{{lng}}/{{ns}}.json",
    parse: (data: ITranslation) => data,
    ajax,
  },

  lng: "en",
  fallbackLng: "en",
  debug: false,
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    ...config,
    ns: "common",
    defaultNS: "common",
    react: { useSuspense: true },
  });

export default i18n;
