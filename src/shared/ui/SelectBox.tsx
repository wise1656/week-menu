import { Autocomplete, TextField } from "@mui/material";

export const SelectBox = () => (
  <Autocomplete
    disablePortal
    options={top100Films}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Movie" />}
  />
);
