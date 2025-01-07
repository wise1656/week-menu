import { Typography, TypographyOwnProps } from "@mui/material";
import { TextEdit } from "./TextEdit";

interface EditableTextProps {
  value: string;
  onChangeValue: (val: string) => void;
  isEdit: boolean;
  onClick?: () => void;
  label?: string;
  editWidth?: number;
  onBlur?: () => void;
  autoFocus?: boolean;
  clearButton?: boolean;
}

export const EditableText = ({
  value,
  onChangeValue: setValue,
  isEdit,
  label,
  editWidth,
  onBlur,
  autoFocus,
  clearButton,
  ...typographyProps
}: EditableTextProps & TypographyOwnProps) => {
  return (
    <>
      {isEdit ? (
        <TextEdit
          value={value}
          onChangeValue={setValue}
          label={label}
          onBlur={onBlur}
          sx={{ width: editWidth }}
          autoFocus={autoFocus}
          clearButton={clearButton}
        />
      ) : (
        <Typography
          variant="body1"
          sx={{ cursor: "pointer" }}
          {...typographyProps}
        >
          {value}
        </Typography>
      )}
    </>
  );
};
