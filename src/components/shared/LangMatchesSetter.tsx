"use client";

import { useLangMatches } from "@/hooks/useLangMatches";
import { AvailableLanguages } from "./LanguageToggler";

interface LangMatchesSetterProps {
  translatedPaths: Record<AvailableLanguages, string>;
}

const LangMatchesSetter: React.FC<LangMatchesSetterProps> = ({
  translatedPaths,
}) => {
  useLangMatches(translatedPaths);

  return null;
};

export default LangMatchesSetter;
