import { Link, useParams } from "react-router-dom";
import { useBuyList } from "./store";
import { useMenuStore } from "../../features/menu/store";
import { Header } from "../../shared/ui/Header";
import { Checkbox, Stack, Typography } from "@mui/material";
import { getIngredientsList, IngredientsList } from "./checkListHelper";
import { TextWithPopover } from "../../shared/ui/TextWithPopover";

export const BuyList = () => {
  const { id } = useParams();
  const { getDishesList, getMenuById } = useMenuStore();
  const menu = getMenuById(id!);
  const { isItemChecked } = useBuyList();

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
      <Header>
        <Typography variant="h4">Список для {menu.name}</Typography>
      </Header>
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
