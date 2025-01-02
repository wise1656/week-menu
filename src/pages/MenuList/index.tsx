import { Link } from "react-router-dom";
import { Button, List, ListItem, Stack, Typography } from "@mui/material";
import { useMenuStore } from "../../features/menu/store";
import ListIcon from "@mui/icons-material/List";

export const MenuList = () => {
  const { menus } = useMenuStore();
  const { addNewMenu, deleteMenu, duplicateMenu, importDishes, exportDishes } =
    useMenuStore();

  return (
    <Stack alignItems={"flex-start"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
        align-self={"stretch"}
      >
        <Typography variant="h4">Список Меню</Typography>
        <Link to="/dishes">
          <ListIcon fontSize="large" />
        </Link>
      </Stack>
      <List>
        {menus.map((menu) => (
          <ListItem key={menu.id}>
            <Link to={`/weekly-menu/${menu.id}`}>
              <Typography variant="h5">{menu.name}</Typography>{" "}
            </Link>
            <Button size="small" onClick={() => duplicateMenu(menu.id)}>
              Дублировать
            </Button>
            <Button size="small" onClick={() => deleteMenu(menu.id)}>
              Удалить
            </Button>
          </ListItem>
        ))}
      </List>
      <Button size="small" onClick={addNewMenu}>
        Создать новое
      </Button>
      <Button size="small" onClick={importDishes}>
        Импорт данных
      </Button>
      <Button size="small" onClick={exportDishes}>
        Экспорт данных
      </Button>
    </Stack>
  );
};
