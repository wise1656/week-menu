import { TextField, Typography, TypographyOwnProps } from "@mui/material";

interface EditableTextProps {
  value: string;
  setValue: (val: string) => void;
  isEdit: boolean;
}

export const EditableText = ({
  value,
  setValue,
  isEdit,
  ...typographyProps
}: EditableTextProps & TypographyOwnProps) => {
  return (
    <div>
      {isEdit ? (
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="standard"
          size="small"
          autoFocus
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
    </div>
  );
};
