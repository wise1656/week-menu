import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Paper,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SetMealIcon from "@mui/icons-material/SetMeal";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useMatch, useNavigate } from "react-router-dom";
import { useMenuStore } from "../../features/menu/store";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const root = useMatch("/");
  const menuUrl = useMatch("/weekly-menu/:id");
  const dishesUrl = useMatch("/dishes");
  const dishIdUrl = useMatch("/dishes/:id");
  const buyList = useMatch("/weekly-menu/:id/shopping");
  const menu =
    root || menuUrl
      ? "menu"
      : dishesUrl || dishIdUrl
      ? "dishes"
      : buyList
      ? "buyList"
      : "";
  const { lastMenu } = useMenuStore();
  const isInSomeMenu = menu == "menu" && menuUrl;

  return (
    <Container maxWidth="sm">
      {children}
      <Box height={100} />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels value={menu}>
          <BottomNavigationAction
            label="Меню"
            icon={<MenuBookIcon />}
            value="menu"
            onClick={() =>
              navigate(isInSomeMenu ? "/" : `/weekly-menu/${lastMenu}`)
            }
          />
          <BottomNavigationAction
            label="Блюда"
            icon={<SetMealIcon />}
            value="dishes"
            onClick={() => navigate("/dishes")}
          />
          {lastMenu && (
            <BottomNavigationAction
              label="Список продуктов"
              icon={<ChecklistIcon />}
              value="buyList"
              onClick={() => navigate(`/weekly-menu/${lastMenu}/shopping`)}
            />
          )}
        </BottomNavigation>
      </Paper>
    </Container>
  );
};
