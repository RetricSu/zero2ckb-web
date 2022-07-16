import React from "react";
import commonStyle from "./common_style";

const styles = {
  root: {
    height: "20px",
    width: "100%",
    fontSize: "14px",
    color: "white",
    textAlign: "center" as const,
    marginTop: "30px",
  },
};

export interface I18nSwitcherProps {
  i18n: any;
  langs?: Languages;
}

export interface Languages {
  [key: LangToken]: {
    nativeName: string;
  };
}

export type LangToken = "en" | "zh" | "es" | string;

export default function I18nSwitcher(props: I18nSwitcherProps) {
  const { i18n, langs: _langs } = props;

  const langs: Languages = _langs || {
    en: { nativeName: "English" },
    zh: { nativeName: "Chinese" },
    es: { nativeName: "Español" },
  };

  return (
    <div style={styles.root}>
      Choose Languages:{" "}
      {Object.keys(langs).map((lng) => (
        <button
          key={lng}
          style={{
            fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
            backgroundColor:
              i18n.resolvedLanguage === lng
                ? commonStyle.main_color.color
                : "white",
          }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {langs[lng].nativeName}
        </button>
      ))}
      <hr style={{ width: "80%" }} />
    </div>
  );
}
