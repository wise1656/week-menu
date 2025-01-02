import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";

export type TextEditProps = TextFieldProps & {
  onChangeValue: (val: string) => void;
};

export const TextEdit = ({
  value,
  onChangeValue,
  ...otherProps
}: TextEditProps) => {
  const [innerValue, setInnerValue] = useState(value as string);

  useEffect(() => {
    setInnerValue(value as string);
  }, [value]);

  return (
    <TextField
      value={innerValue}
      onChange={(e) => setInnerValue(e.target.value)}
      onBlur={() => onChangeValue(innerValue)}
      variant="standard"
      size="small"
      {...otherProps}
    />
  );
};
