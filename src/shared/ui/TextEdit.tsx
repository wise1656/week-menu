import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

type TextEditProps = TextFieldProps & { onChangeValue: (val: string) => void };

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
    //   autoFocus
    slotProps={{
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => onChangeValue("")}
              style={{ visibility: value ? "visible" : "hidden" }} // Скрываем кнопку, если поле пустое
            >
              <ClearIcon fontSize={"small"} />
            </IconButton>
          </InputAdornment>
        ),
      },
    }}
    {...otherProps}
  />
);
