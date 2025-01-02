import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";

interface MultiSelectProps<T> {
  label: string;
  options: T[];
  value: T[];
  toStr?: (val: T) => string;
  onChange: (value: T[]) => void;
  onAddNewVal?: (newVal: string) => void; // если значения в списке нет, показывать кнопку добавить и вызывать этот обработчик по клику
}

export function MultiSelect<T extends object | string>({
  options,
  value,
  onChange,
  label,
  toStr,
  onAddNewVal,
}: MultiSelectProps<T>) {
  const handleChange = (_e: any, newValue: T[]) => {
    onChange(newValue);
  };
  const toStrVal = (obj: T) => (toStr ? toStr(obj) : obj.toString());
  const [inputVal, setInputVal] = useState("");
  const addNewBtn = onAddNewVal && (
    <Button size="small" onClick={() => onAddNewVal(inputVal)}>
      Добавить
    </Button>
  );

  return (
    <Autocomplete
      sx={{ minWidth: 150 }}
      multiple
      options={options}
      getOptionLabel={(o) => toStrVal(o)}
      value={value}
      onChange={handleChange}
      noOptionsText={addNewBtn}
      renderTags={(value: T[], _getTagProps) =>
        value.map(toStrVal).map((o) => o + ", ")
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        />
      )}
    />
  );
}
