import { TFunction } from "react-i18next";

export type TFn = TFunction<"translation", undefined>;

export interface I18nComponentsProps {
  t: TFn;
}
