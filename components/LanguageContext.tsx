import { FC, PropsWithChildren, createContext, useContext } from "react";
import { locale } from ".";

const LanguageContext = createContext<string>(locale);
export const LanguageProvider: FC<PropsWithChildren<{ language: string }>> = (
  props
) => {
  return (
    <LanguageContext.Provider value={props.language}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
