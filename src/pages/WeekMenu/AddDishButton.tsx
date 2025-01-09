import Add from "@mui/icons-material/Add";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useMenuStore } from "../../features/menu/store";

interface AddDishButtonProps {
  menuId: string;
  nDay: number;
  nMeal: number;
}

export const AddDishButton = ({ menuId, nDay, nMeal }: AddDishButtonProps) => {
  const { getDishesGroups, addDishToMeal } = useMenuStore();
  const [open, setOpen] = useState(false);
  const dishes = getDishesGroups();
  const [filter, setFilter] = useState("");

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setFilter(""), 500);
  };

  const onSelect = (dishId: string) => {
    addDishToMeal(menuId, nDay, nMeal, dishId);
    handleClose();
  };

  return (
    <>
      <IconButton
        size="small"
        sx={{ border: "solid 1px" }}
        onClick={() => setOpen(true)}
      >
        <Add fontSize="small" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            top: "0", // Устанавливаем позицию сверху
            position: "absolute", // Абсолютное позиционирование
          },
        }}
      >
        <DialogTitle>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="h5" fontWeight="bold">
              Блюда
            </Typography>
            <SearchIcon fontSize="small" sx={{ marginLeft: 10 }} color="info" />
            <TextField
              fullWidth
              variant="standard"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack gap={3}>
            {dishes.map((group) => {
              const dishes = group.dishes.filter((d) =>
                d.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
              );
              return (
                <>
                  {dishes.length > 0 && (
                    <Stack key={group.groupName}>
                      <Typography variant="h5">{group.groupName}</Typography>
                      {dishes.map((dish) => (
                        <Typography
                          variant="body1"
                          onClick={() => onSelect(dish.id)}
                          key={dish.id}
                        >
                          • {dish.name}
                        </Typography>
                      ))}
                    </Stack>
                  )}
                </>
              );
            })}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
