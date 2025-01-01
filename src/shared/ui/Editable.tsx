import { Typography, TypographyOwnProps } from "@mui/material";
import { TextEdit } from "./TextEdit";

interface EditableTextProps {
  value: string;
  setValue: (val: string) => void;
  isEdit: boolean;
  onClick?: () => void;
  label?: string;
}

export const EditableText = ({
  value,
  setValue,
  isEdit,
  label,
  ...typographyProps
}: EditableTextProps & TypographyOwnProps) => {
  return (
    <div>
      {isEdit ? (
        <TextEdit value={value} onChangeValue={setValue} label={label} />
      ) : (
        <Typography
          variant="body1"
          style={{ cursor: "pointer" }}
          {...typographyProps}
        >
          {value}
        </Typography>
      )}
    </div>
  );
};
