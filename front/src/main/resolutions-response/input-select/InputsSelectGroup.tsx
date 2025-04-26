import type {
  TAudioResolution,
  TBothResolution,
  TVideoResolution,
} from "../videoInfo.api";

import resolutionsStyle from "../Resolution.module.css";
import BadgeTag from "../badge-generator/BadgeGenerator";

type TInputData = {
  name?: string;
  header: string;
  selectedValue:
    | TAudioResolution
    | TVideoResolution
    | TBothResolution
    | undefined;
  values: TAudioResolution[] | TVideoResolution[] | TBothResolution[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type InputsSelectGroupProps = TInputData;

const disableInputs = (
  currentContainer: string,
  selectedContainer?: string
) => {
  if (selectedContainer === undefined) return false;
  return selectedContainer !== currentContainer;
};

const InputsSelectGroup = ({
  name,
  header,
  selectedValue,
  handleChange,
  values,
}: InputsSelectGroupProps) => {
  return (
    <div className={resolutionsStyle.filterColumn}>
      <h2>{header}</h2>
      <div className={resolutionsStyle.filterList}>
        {values.map((value) => (
          <div
            key={value.mimeType + value.bitrate}
            className={resolutionsStyle.radioOption}
          >
            <input
              type="checkbox"
              id={value.mimeType + value.bitrate}
              name={name ?? header.toLocaleLowerCase()}
              value={value.url}
              checked={selectedValue?.url === value.url}
              onChange={handleChange}
              disabled={disableInputs(
                value.container,
                selectedValue?.container
              )}
            />
            <label htmlFor={value.mimeType + value.bitrate}>
              <BadgeTag {...value} />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputsSelectGroup;
export type { TInputData };
