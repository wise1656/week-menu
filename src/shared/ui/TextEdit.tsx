import { IconButton, Stack, TextField, TextFieldProps } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

export type TextEditProps = TextFieldProps & {
  onChangeValue: (val: string) => void;
  clearButton?: boolean;
  blurOnEnter?: boolean;
};

export const TextEdit = ({
  value,
  onChangeValue,
  onBlur,
  clearButton,
  blurOnEnter,
  ...otherProps
}: TextEditProps) => {
  const [innerValue, setInnerValue] = useState(value as string);
  const clearRef = useRef(null);

  useEffect(() => {
    setInnerValue(value as string);
  }, [value]);

  const onBlurHandle = (e?: any) => {
    if (!e?.relatedTarget || e?.relatedTarget != clearRef.current) {
      onChangeValue(innerValue);
      onBlur?.(e);
    }
  };

  return (
    <Stack
      direction={"row"}
      sx={{ position: "relative", ...(otherProps.sx ?? {}) }}
    >
      <TextField
        value={innerValue}
        onChange={(e) => setInnerValue(e.target.value)}
        onBlur={onBlurHandle}
        variant="standard"
        size="small"
        onKeyDown={(e) => {
          if (blurOnEnter && e.key === "Enter") onBlurHandle();
        }}
        {...otherProps}
      />
      {value && clearButton ? (
        <IconButton
          onClick={() => {
            setInnerValue("");
            onChangeValue("");
            onBlur?.({} as any);
          }}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          ref={clearRef}
        >
          <ClearIcon />
        </IconButton>
      ) : null}
    </Stack>
  );
};
