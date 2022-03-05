import 'react-i18next';
//import { resources } from './i18n';
import translation from "./locales/en.json";

const resources = {
  en: {
    translation,
  },
} as const;

declare module 'react-i18next' {
  type DefaultResources = typeof resources['en'];
  interface Resources extends DefaultResources {}
}
