import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const EditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton onClick={onClick} aria-label="Редактировать">
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;
