import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const EditButton = ({
  onClick,
  selected,
}: {
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <IconButton
      color={selected ? "primary" : "default"}
      onClick={onClick}
      sx={selected ? { border: 1 } : {}}
    >
      <EditIcon />
    </IconButton>
  );
};
