import React, { createContext, useContext, useState, useEffect } from "react";

type Direction = "ltr" | "rtl";
type Language = "en" | "he";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [direction, setDirection] = useState<Direction>("ltr");

  // Update the direction when language changes
  useEffect(() => {
    // Set direction based on language
    setDirection(language === "he" ? "rtl" : "ltr");
    
    // Update the document direction
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    
    // Add a class to body for RTL-specific styling
    if (language === "he") {
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    return {
      language: "en" as Language,
      direction: "ltr" as Direction,
      setLanguage: () => {},
    };
  }
  
  return context;
}