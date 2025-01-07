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
  Button,
} from "@mui/material";
import { getIngredientsList, IngredientsList } from "./checkListHelper";
import { TextWithPopover } from "../../shared/ui/TextWithPopover";
import TopMenu from "../../shared/ui/TopMenu";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { EditableText } from "../../shared/ui/Editable";
import { useState } from "react";
import { TextEdit } from "../../shared/ui/TextEdit";

export const BuyList = () => {
  const { id } = useParams();
  const { getDishesList, getMenuById } = useMenuStore();
  const menu = getMenuById(id!);
  const { isItemChecked, clearChecks, getCustomList } = useBuyList();
  const navigate = useNavigate();

  if (!id || !menu) return <Typography>Меню не найдено</Typography>;

  const customBuyList = getCustomList(id).map((item, n) => ({
    ...item,
    value: n.toString(),
    type: "custom",
  }));
  const buyList = getIngredientsList(getDishesList(), menu)
    .map((item) => ({
      ...item,
      checked: isItemChecked(id, item.name),
      type: "fromMenu",
    }))
    .concat(customBuyList)
    .sort(compare);
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
          <>
            {item.type == "fromMenu" ? (
              <CheckBoxItem {...item} key={n} />
            ) : (
              <CustomCheckBoxItem {...item} index={+item.value!} key={n} />
            )}
          </>
        ))}
        <AddNewItem />
      </Stack>
    </div>
  );
};

function AddNewItem() {
  const { addCustom } = useBuyList();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      {isEdit ? (
        <TextEdit
          value=""
          onChangeValue={(val) => {
            val && addCustom(id!, val);
            setIsEdit(false);
          }}
          autoFocus
          sx={{ marginLeft: 5 }}
        />
      ) : (
        <Button onClick={() => setIsEdit(true)} sx={{ width: 150 }}>
          + Добавить
        </Button>
      )}
    </>
  );
}

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
            {dishes?.map((d) => (
              <Stack direction={"row"} gap={2} key={d.id}>
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

interface CustomCheckBoxItemProps {
  name: string;
  checked: boolean;
  index: number;
}

function CustomCheckBoxItem({ name, checked, index }: CustomCheckBoxItemProps) {
  const { id: menuId } = useParams();
  const { editCustom, checkCustomItem } = useBuyList();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Checkbox
        checked={checked}
        onChange={() => checkCustomItem(menuId!, index)}
      />
      <EditableText
        value={name}
        onChangeValue={(newValue) => editCustom(menuId!, index, newValue)}
        isEdit={isEdit}
        onClick={() => setIsEdit(true)}
        onBlur={() => setIsEdit(false)}
        autoFocus
        clearButton
        fontStyle={"italic"}
      />
    </Stack>
  );
}

function compare(a: { name: string }, b: { name: string }) {
  return a.name.localeCompare(b.name);
}
