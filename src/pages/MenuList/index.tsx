import { Link } from "react-router-dom";
import { Button, List, ListItem, Typography } from "@mui/material";
import { useMenuStore } from "../../features/menu/store";

export const MenuList = () => {
  const { menus } = useMenuStore();
  const { addNewMenu, deleteMenu, duplicateMenu } = useMenuStore();

  return (
    <>
      <Typography variant="h4">Список Меню</Typography>
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
    </>
  );
};
