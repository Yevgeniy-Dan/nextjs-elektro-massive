import { languages } from "@/app/i18n/settings";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface LanguageTogglerProps {
  lng: string;
}

const LanguageToggler: React.FC<LanguageTogglerProps> = ({ lng }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLang = event.target.value;
    const currentPathname = pathname;

    //Remove the current language prefix from the pathname
    const pathWithoutLang = currentPathname.replace(new RegExp(`^/${lng}`), "");

    const newPath = `/${newLang}${pathWithoutLang || "/"}`.replace(/\/+/g, "/");

    // Remove the last slash if there is one, unless it is just "/"
    router.push(newPath);
  };

  return (
    <div className="relative flex items-center ">
      <select
        value={lng}
        onChange={handleLanguageChange}
        className="border border-white px-1 sm:px-3 py-1 sm:py-2 bg-transparent hover:bg-gray-800 hover:border-gray-300 transition-all duration-300 appearance-none outline-none"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageToggler;
