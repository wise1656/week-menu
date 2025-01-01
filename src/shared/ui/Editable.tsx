import { Typography, TypographyOwnProps } from "@mui/material";
import { TextEdit } from "./TextEdit";

interface EditableTextProps {
  value: string;
  setValue: (val: string) => void;
  isEdit: boolean;
  onClick?: () => void;
  label?: string;
  editWidth?: number;
}

export const EditableText = ({
  value,
  setValue,
  isEdit,
  label,
  editWidth,
  ...typographyProps
}: EditableTextProps & TypographyOwnProps) => {
  return (
    <>
      {isEdit ? (
        <TextEdit
          value={value}
          onChangeValue={setValue}
          label={label}
          sx={{ width: editWidth }}
        />
      ) : (
        <Typography
          variant="body1"
          style={{ cursor: "pointer" }}
          {...typographyProps}
        >
          {value}
        </Typography>
      )}
    </>
  );
};
