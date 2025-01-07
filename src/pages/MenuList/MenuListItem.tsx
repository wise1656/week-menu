import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Menu as ReactMenu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Menu } from "../../features/menu/types";
import MoreVert from "@mui/icons-material/MoreVert";
import { useMenuStore } from "../../features/menu/store";
import { ExpandButton } from "../../shared/ui/ExpandButton";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MenuListItemProps {
  menu: Menu;
}

export const MenuListItem = ({ menu }: MenuListItemProps) => {
  const { deleteMenu, duplicateMenu, getDishesList } = useMenuStore();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const settingsRef = useRef<HTMLButtonElement>(null);
  const [settingsShown, setSettingsShown] = useState(false);
  const dishes = getDishesList();

  const handle = (action: () => void) => (e: any) => {
    e.stopPropagation();
    action();
  };

  const closeMenu = (action?: () => void) => (e: any) => {
    e.stopPropagation();
    setSettingsShown(false);
    action?.();
  };

  return (
    <Card
      key={menu.id}
      onClick={() => navigate(`/weekly-menu/${menu.id}`)}
      sx={{ width: "100%", margin: 0 }}
    >
      <CardHeader
        action={
          <>
            <ExpandButton
              isExpanded={expanded}
              onClick={handle(() => setExpanded((ex) => !ex))}
            />
            <IconButton
              aria-label="settings"
              onClick={handle(() => setSettingsShown(true))}
              ref={settingsRef}
            >
              <MoreVert />
            </IconButton>
          </>
        }
        title={menu.name}
        subheader={""}
      />

      <ReactMenu
        id="basic-menu"
        anchorEl={settingsRef.current}
        open={settingsShown}
        onClose={closeMenu()}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={closeMenu(() => duplicateMenu(menu.id))}>
          Дублировать
        </MenuItem>
        <MenuItem onClick={closeMenu(() => deleteMenu(menu.id))}>
          <Typography color="error">Удалить</Typography>
        </MenuItem>
      </ReactMenu>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}
          >
            {menu.days.map((day) => {
              const meals = day.meals
                .flatMap((m) =>
                  m.dishes
                    .map((dishId) => dishes.find((dish) => dish.id == dishId))
                    .filter((d) => d)
                )
                .map((d) => d!.name)
                .join(", ");
              return (
                <>
                  <b>{day.day}</b>: {meals}
                  <br />
                </>
              );
            })}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
