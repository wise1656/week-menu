import { Fab, Stack } from "@mui/material";
import { useMenuStore } from "../../features/menu/store";
import TopMenu from "../../shared/ui/TopMenu";
import { MenuListItem } from "./MenuListItem";
import AddIcon from "@mui/icons-material/Add"; // Импорт иконки

export const MenuList = () => {
  const { menus, addNewMenu } = useMenuStore();

  return (
    <Stack>
      <TopMenu title="Недельное меню" />
      <Stack alignItems={"flex-start"}>
        <Stack gap={1} sx={{ width: "100%" }}>
          {menus.map((menu) => (
            <MenuListItem menu={menu} key={menu.id} />
          ))}
        </Stack>

        {/* <Button size="small" onClick={importDishes}>
          Импорт данных
        </Button>
        <Button size="small" onClick={exportDishes}>
          Экспорт данных
        </Button> */}
        <Fab
          color="primary"
          onClick={addNewMenu}
          sx={{
            position: "fixed",
            bottom: 70,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>
      </Stack>
    </Stack>
  );
};
