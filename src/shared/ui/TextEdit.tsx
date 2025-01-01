import {
  TextField,
  TextFieldProps,
} from "@mui/material";

export type TextEditProps = TextFieldProps & {
  onChangeValue: (val: string) => void;
};

export const TextEdit = ({
  value,
  onChangeValue,
  ...otherProps
}: TextEditProps) => (
  <TextField
    value={value}
    onChange={(e) => onChangeValue(e.target.value)}
    variant="standard"
    size="small"
    {...otherProps}
  />
);
