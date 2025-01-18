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
import { TextEdit } from "../../shared/ui/TextEdit";

interface AddDishButtonProps {
  menuId: string;
  nDay: number;
  nMeal: number;
}

export const AddDishButton = ({ menuId, nDay, nMeal }: AddDishButtonProps) => {
  const { getDishesGroups, addDishToMeal, addDish } = useMenuStore();
  const [open, setOpen] = useState(false);
  const dishes = getDishesGroups();
  const [filter, setFilter] = useState("");
  const [isAddDishOpened, setAddDishOpened] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setFilter(""), 500);
    setAddDishOpened(false);
  };

  const onSelect = (dishId: string) => {
    addDishToMeal(menuId, nDay, nMeal, dishId);
    handleClose();
  };

  const addNewDish = (val: string) => {
    const newDish = addDish("", val);
    onSelect(newDish);
  };

  return (
    <>
      <AddButton onClick={() => setOpen(true)} />
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
            <Typography variant="h5" fontWeight="bold" sx={{ marginRight: 1 }}>
              Блюда
            </Typography>
            {!isAddDishOpened && (
              <AddButton onClick={() => setAddDishOpened(true)} />
            )}
            {isAddDishOpened ? (
              <NewDish onAddDish={addNewDish} initialVal={filter} />
            ) : (
              <Stack
                direction={"row"}
                justifyItems={"flex-end"}
                alignItems={"center"}
                flex={1}
              >
                <SearchIcon
                  fontSize="small"
                  sx={{ marginLeft: 3 }}
                  color="info"
                />
                <TextField
                  fullWidth
                  variant="standard"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </Stack>
            )}
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

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton size="small" sx={{ border: "solid 1px" }} onClick={onClick}>
      <Add fontSize="small" />
    </IconButton>
  );
}

function NewDish({
  onAddDish,
  initialVal,
}: {
  onAddDish: (dish: string) => void;
  initialVal: string;
}) {
  const [dish, setDish] = useState(initialVal);
  return (
    <>
      <TextEdit
        onChangeValue={setDish}
        value={initialVal}
        autoFocus
        label="Новое блюдо"
        onEnter={(val) => setTimeout(() => onAddDish(val))}
      />
      <AddButton onClick={() => onAddDish(dish)} />
    </>
  );
}
