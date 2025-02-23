import { memo } from "react";

interface FilterCheckboxProps {
  value: string;
  checked: boolean;
  onChange: (value: string, checked: boolean) => void;
}

const FilterCheckbox = memo(
  ({ value, checked, onChange }: FilterCheckboxProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(value, e.target.checked);
    };

    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="h-5 w-5 text-red-600 rounded border-gray-300 focus:ring-red-500"
          checked={checked}
          onChange={handleChange}
        />
        {value}
      </label>
    );
  }
);

FilterCheckbox.displayName = "FilterCheckbox";

export default FilterCheckbox;
