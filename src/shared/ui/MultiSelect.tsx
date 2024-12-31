import { Autocomplete, TextField, Chip } from "@mui/material";

interface MultiSelectProps<T> {
  label: string;
  options: T[];
  value: T[];
  toStr?: (val: T) => string;
  onChange: (value: T[]) => void;
}

export function MultiSelect<T extends object | string>({
  options,
  value,
  onChange,
  label,
  toStr,
}: MultiSelectProps<T>) {
  const handleChange = (e: any, newValue: T[]) => {
    onChange(newValue);
  };

  const toStrVal = (obj: T) => (toStr ? toStr(obj) : obj.toString());

  return (
    <Autocomplete
      sx={{ minWidth: 100 }}
      multiple
      options={options}
      getOptionLabel={(o) => toStrVal(o)}
      value={value}
      onChange={handleChange}
      renderTags={
        (value: T[], getTagProps) => value.map(toStrVal).map((o) => o + ", ")
        // .map((option, index) => (
        // <Chip
        //   variant="outlined"
        //   label={option}
        //   {...getTagProps({ index })}
        //   key={option}
        // />
        // ))
      }
      renderInput={(params) => (
        <TextField {...params} variant="standard" label={label} />
      )}
    />
  );
}
