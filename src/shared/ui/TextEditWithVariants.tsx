import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { TextEditProps } from "./TextEdit";

type TextEditWithVariantsProps = TextEditProps & { options: string[] };

export const TextEditWithVariants = ({
  value,
  onChangeValue,
  options,
  sx,
  ...otherProps
}: TextEditWithVariantsProps) => {
  const [innerValue, setInnerValue] = useState(value as string);

  useEffect(() => {
    setInnerValue(value as string);
  }, [value]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value}
      onChange={(_e, val: any) => setInnerValue(val)}
      onBlur={() => onChangeValue(innerValue)}
      sx={sx}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          size="small"
          {...otherProps}
          onChange={(e) => setInnerValue(e.target.value)}
        />
      )}
    />
  );
};
