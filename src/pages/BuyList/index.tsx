import { Link, useNavigate, useParams } from "react-router-dom";
import { useBuyList } from "./store";
import { useMenuStore } from "../../features/menu/store";
import {
  Link as MuiLink,
  Breadcrumbs,
  Checkbox,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { getIngredientsList, IngredientsList } from "./checkListHelper";
import { TextWithPopover } from "../../shared/ui/TextWithPopover";
import TopMenu from "../../shared/ui/TopMenu";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

export const BuyList = () => {
  const { id } = useParams();
  const { getDishesList, getMenuById } = useMenuStore();
  const menu = getMenuById(id!);
  const { isItemChecked, clearChecks } = useBuyList();
  const navigate = useNavigate();

  if (!id || !menu) return <Typography>Меню не найдено</Typography>;

  const buyList = getIngredientsList(getDishesList(), menu).map((item) => ({
    ...item,
    checked: isItemChecked(id, item.name),
  }));
  const sortedList = [
    ...buyList.filter((i) => !i.checked),
    ...buyList.filter((i) => i.checked),
  ];

  return (
    <div>
      <TopMenu
        title={
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Breadcrumbs
              sx={{
                size: 16,
                "& .MuiBreadcrumbs-separator": {
                  color: "white", // цвет разделителя
                },
              }}
            >
              <MuiLink
                sx={{
                  fontSize: "1.25rem",
                  color: "white",
                  textDecoration: "underline",
                  ":hover": { color: "white", textDecoration: "none" },
                }}
                onClick={() => navigate(`/weekly-menu/${id}`)}
              >
                {menu.name}
              </MuiLink>

              <Typography sx={{ color: "white", fontSize: "1.25rem" }}>
                Список
              </Typography>
            </Breadcrumbs>
            <IconButton onClick={() => clearChecks(id)}>
              <UnpublishedIcon sx={{ color: "white" }} />
            </IconButton>
          </Stack>
        }
        showBack
        backToUrl={`/weekly-menu/${id}`}
      />
      <Stack>
        {sortedList.map((item, n) => (
          <CheckBoxItem {...item} key={n} />
        ))}
      </Stack>
    </div>
  );
};

type CheckBoxItemProps = IngredientsList & {
  checked: boolean;
};

function CheckBoxItem({ name, value, checked, dishes }: CheckBoxItemProps) {
  const { id } = useParams();
  const { checkItem } = useBuyList();

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Checkbox checked={checked} onChange={() => checkItem(id!, name)} />
      <TextWithPopover
        id={name}
        popup={
          <Stack>
            {dishes.map((d) => (
              <Stack direction={"row"} gap={2}>
                <Typography>{d.name}</Typography>
                <Typography>{d.countWithUnits}</Typography>
                <Link to={"/dishes/" + d.id}>Посмотреть</Link>
              </Stack>
            ))}
          </Stack>
        }
      >
        <Typography>{value}</Typography>
      </TextWithPopover>
    </Stack>
  );
}
