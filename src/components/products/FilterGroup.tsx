import { memo, useState } from "react";
import FilterCheckbox from "./FilterCheckbox";
import ExpandButton from "./ExpandButton";

interface FilterGroupProps {
  title: string;
  values: { value: string; code: string }[];
  appliedValues: string[];
  onChange: (value: string, code: string, checked: boolean) => void;
}

const FilterGroup = memo(
  ({ title, values, appliedValues, onChange }: FilterGroupProps) => {
    const [expanded, setExpanded] = useState(false);
    const hasMoreValues = values.length > 6;
    const displayValues = expanded ? values : values.slice(0, 6);

    return (
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div
          className={`grid grid-cols-1  lg:grid-cols-2 gap-2 ${
            !hasMoreValues || expanded ? "h-auto" : "max-h-[144px]"
          } overflow-hidden`}
        >
          {displayValues.map((value) => (
            <FilterCheckbox
              key={value.code}
              value={value.value}
              code={value.code}
              onChange={onChange}
              checked={appliedValues.includes(value.code)}
            />
          ))}
        </div>
        {hasMoreValues && (
          <ExpandButton
            isExpanded={expanded}
            onClick={() => setExpanded(!expanded)}
          />
        )}
      </div>
    );
  }
);

FilterGroup.displayName = "FilterGroup";

export default FilterGroup;
