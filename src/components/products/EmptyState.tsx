import { Heart } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";

interface EmptyStateProps {
  lng: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "common");

  return (
    <div className="text-center py-8">
      <Heart className="mx-auto mb-4" size={64} />
      <h2 className="text-xl font-semibold mb-2">{t("favorites.subtitle")}</h2>
      <p className="text-gray-600 mt-2">{t("favorites.description")}</p>
    </div>
  );
};

export default EmptyState;
