/** @jsxImportSource @emotion/react */
import { memo, useEffect, useState } from "react";
import { Typography, Collapse, Stack, Button, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useMenuStore } from "../../features/menu/store";
import { Dish, Ingredient } from "../../features/menu/types";
import { EditableText } from "../../shared/ui/Editable";
import { TextEdit } from "../../shared/ui/TextEdit";
import { useLocation, useParams } from "react-router-dom";
import { TextEditWithVariants } from "../../shared/ui/TextEditWithVariants";
import TopMenu from "../../shared/ui/TopMenu";
import { useConfirmDialog } from "../../shared/ui/useConfirmDialog";

export const DishesList = () => {
  const { getDishesGroups, addDish } = useMenuStore();
  useScrollToSelected();
  const dishesGroups = getDishesGroups();

  return (
    <Box>
      <TopMenu title="Список блюд" showBack />
      <Stack spacing={4}>
        {dishesGroups.map((group) => (
          <Stack key={group.groupName}>
            <Typography variant="h5" fontWeight={"bold"}>
              {group.groupName}
            </Typography>
            <Stack>
              {group.dishes.map((dish) => (
                <DishView dish={dish} key={dish.id} />
              ))}
            </Stack>
            <Button
              onClick={() => addDish(group.groupName)}
              sx={{ alignSelf: "flex-start" }}
            >
              + Добавить блюдо
            </Button>
          </Stack>
        ))}
      </Stack>
      {dishesGroups.length == 0 && (
        <Button onClick={() => addDish("")} sx={{ alignSelf: "flex-start" }}>
          + Добавить блюдо
        </Button>
      )}
    </Box>
  );
};

interface DishProps {
  dish: Dish;
}

const DishView = memo(({ dish }: DishProps) => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const editOnStart =
    (dish.id == id && pathname.includes("/edit")) || dish.name == "";
  const openOnStart = editOnStart || dish.id == id;
  const [isOpen, setIsOpen] = useState(openOnStart);
  const [isEdit, setIsEdit] = useState(editOnStart);
  const toggleOpen = () => setIsOpen((v) => !v);
  const toggleEdit = () => {
    if (isEdit) setIsOpen(false);
    setIsEdit((v) => !v);
  };
  const { renameDish, deleteDish, changeGroup, getDishGroupsNames } =
    useMenuStore();
  const { dialog, showDialog } = useConfirmDialog();

  const onDelete = () => {
    showDialog(
      "Удаление",
      "Вы уверены что хотите удалить блюдо? Это необратимая операция",
      { ok: "Удалить", okColor: "error" }
    ).then((isOk) => isOk && deleteDish(dish.id));
  };

  const editGroup = (val: string) => {
    changeGroup(dish.id, val);
    setTimeout(() => scrollToId(dish.id));
  };
  return (
    <Box id={dish.id} sx={{ scrollMargin: "64px" }}>
      {dialog}
      <Stack alignItems={"center"} direction={"row"} gap={1}>
        <EditableText
          label="название"
          variant="h6"
          isEdit={isEdit}
          value={dish.name}
          onClick={toggleOpen}
          onChangeValue={(val) => renameDish(dish.id, val)}
          editWidth={200}
        />
        {isEdit && (
          <TextEditWithVariants
            label="категория"
            value={dish.groupName}
            onChangeValue={editGroup}
            options={getDishGroupsNames()}
            sx={{ flex: 1 }}
          />
        )}
        {!isEdit &&
          (isOpen ? (
            <ExpandLessIcon onClick={toggleOpen} />
          ) : (
            <ExpandMoreIcon onClick={toggleOpen} />
          ))}
      </Stack>
      <Collapse in={isOpen}>
        {isEdit && <Box sx={{ height: 15 }} />}
        <Ingredients dish={dish} isEdit={isEdit} />
        <Stack direction={"row"} gap={1}>
          <Button size="small" onClick={toggleEdit}>
            {isEdit ? "Ok" : "Изменить"}
          </Button>
          <Button size="small" onClick={onDelete} color={"error"}>
            Удалить
          </Button>
        </Stack>
        <div style={{ marginBottom: 5 }} />
      </Collapse>
    </Box>
  );
});

interface IngredientsProps {
  dish: Dish;
  isEdit: boolean;
}

function Ingredients({ dish, isEdit }: IngredientsProps) {
  const { setIngredient, getIngredients, getIngredientUnits } = useMenuStore();
  const ingredients = isEdit
    ? [...dish.ingredients, { name: "", count: 0, unit: "" }]
    : dish.ingredients;
  const updateIngredient = (data: Partial<Ingredient>, nIngr: number) =>
    setIngredient(dish.id, nIngr, {
      ...(dish.ingredients[nIngr] ?? {}),
      ...data,
    });

  return (
    <>
      {ingredients.map((ingredient, nIngr) =>
        isEdit ? (
          <Stack direction={"row"} key={nIngr} alignItems={"flex-end"} gap={1}>
            <TextEditWithVariants
              label="ингредиент"
              sx={{ flex: 3 }}
              value={ingredient.name}
              onChangeValue={(val) => updateIngredient({ name: val }, nIngr)}
              options={getIngredients()}
            />
            <TextEdit
              label="количество"
              sx={{ flex: 1 }}
              value={ingredient.count}
              type="number"
              onChangeValue={(val) => updateIngredient({ count: +val }, nIngr)}
            />
            <TextEditWithVariants
              label="единицы"
              sx={{ flex: 1 }}
              value={ingredient.unit}
              onChangeValue={(val) => updateIngredient({ unit: val }, nIngr)}
              options={getIngredientUnits(ingredient.name)}
            />
          </Stack>
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            key={ingredient.name}
          >
            {ingredient.name}: {ingredient.count} {ingredient.unit}
          </Typography>
        )
      )}
    </>
  );
}

const useScrollToSelected = () => {
  const { id } = useParams();
  useEffect(() => {
    scrollToId(id);
  }, [id]);
};

const scrollToId = (id: string | undefined) => {
  if (id) {
    const targetElement = document.getElementById(id); // Находим элемент
    // Прокручиваем к элементу с плавной анимацией
    targetElement?.scrollIntoView({
      behavior: "instant",
      block: "start", // Выравнивание по верхней части области просмотра
    });
  }
};
