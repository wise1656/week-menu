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
  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value as st}
      onChange={(_e, val: string) => onChangeValue(val)}
      sx={sx}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          size="small"
          {...otherProps}
          onChange={(e) => onChangeValue(e.target.value)}
        />
      )}
    />
  );
};
