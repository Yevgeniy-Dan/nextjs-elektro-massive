import { memo } from "react";

interface FilterCheckboxProps {
  value: string;
  code: string;
  checked: boolean;
  onChange: (value: string, code: string, checked: boolean) => void;
}

const FilterCheckbox = memo(
  ({ value, code, checked, onChange }: FilterCheckboxProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(value, code, e.target.checked);
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
