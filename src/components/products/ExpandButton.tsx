import { ChevronDown, ChevronUp } from "lucide-react";
import { memo } from "react";

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

const ExpandButton = memo(({ isExpanded, onClick }: ExpandButtonProps) => (
  <button
    onClick={onClick}
    className="mt-2 p-1 flex justify-center items-center rounded-md text-blue-500 hover:text-blue-800 transition-colors duration-200"
  >
    <span className="flex flex-row items-center">
      {isExpanded ? "Сховати" : "Показати ще"}
      {isExpanded ? (
        <ChevronUp className="h-5 w-5 ml-1" />
      ) : (
        <ChevronDown className="h-5 w-5 ml-1" />
      )}
    </span>
  </button>
));

ExpandButton.displayName = "ExpandButton";

export default ExpandButton;
