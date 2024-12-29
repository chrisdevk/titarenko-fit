"use client";

import { createContext, useState } from "react";

interface LanguageContextObject {
  language: string;
  setLanguage: (language: string) => void;
}

export const LanguageContext = createContext<LanguageContextObject>({
  language: "en",
  setLanguage: () => {},
});

export const LanguageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState("en");

  const languageObj = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={languageObj}>
      {children}
    </LanguageContext.Provider>
  );
};
