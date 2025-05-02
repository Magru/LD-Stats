import { useLanguage } from "./useLanguage";
import { t, TranslationKey } from "@/lib/translations";

export function useTranslation() {
  const { language } = useLanguage();
  
  return {
    t: (key: TranslationKey) => t(key, language),
  };
}