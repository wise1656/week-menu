/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  Stack,
  css,
  Chip,
  Tooltip,
} from "@mui/material";
import { useMenuStore } from "../../features/menu/store";
import { EditableText } from "../../shared/ui/Editable";
import { EditButton } from "../../shared/ui/EditButton";
import { Day, Dish, Meal } from "../../features/menu/types";
import { TextWithPopover } from "../../shared/ui/TextWithPopover";
import TopMenu from "../../shared/ui/TopMenu";
import { AddDishButton } from "./AddDishButton";

export const WeekMenu = () => {
  const { id } = useParams();
  const { getMenuById, updateMenuName, setLastMenu } = useMenuStore();
  const menu = getMenuById(id!);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    if (id) setLastMenu(id);
  }, []);

  if (!menu || !id) return <Typography>Меню не найдено</Typography>;

  return (
    <div>
      <TopMenu
        title={
          <EditableText
            variant="h6"
            isEdit={isEdit}
            value={menu.name}
            onChangeValue={(val) => updateMenuName(id, val)}
            color="white"
          />
        }
        showBack
        backToUrl="/"
      >
        <EditButton onClick={() => setEdit((e) => !e)} selected={isEdit} />
      </TopMenu>

      <Stack gap={isEdit ? 2 : 1}>
        {menu.days.map((day, nDay) => (
          <MenuDay
            day={day}
            isEdit={isEdit}
            menuId={id}
            nDay={nDay}
            key={nDay}
          />
        ))}
      </Stack>
    </div>
  );
};

interface MenuDayProps {
  day: Day;
  isEdit: boolean;
  menuId: string;
  nDay: number;
}

function MenuDay({ day, isEdit, menuId, nDay }: MenuDayProps) {
  const meals = isEdit ? [...day.meals, { type: "", dishes: [] }] : day.meals;

  return (
    <div key={day.day}>
      <Typography variant="h6" fontWeight={"bold"}>
        {day.day}
      </Typography>
      <List>
        {meals.map((meal, nMeal) => (
          <ListItem key={nMeal} sx={{ alignItems: "flex-end" }}>
            <MenuMeal
              isEdit={isEdit}
              meal={meal}
              nDay={nDay}
              nMeal={nMeal}
              menuId={menuId}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

interface MenuMealProps {
  meal: Meal;
  isEdit: boolean;
  menuId: string;
  nDay: number;
  nMeal: number;
}

function MenuMeal({ meal, isEdit, menuId, nDay, nMeal }: MenuMealProps) {
  const { updateMeal } = useMenuStore();
  return (
    <Stack direction={"row"} alignItems={"flex-start"}>
      <EditableText
        label={meal.type ? "Прием пищи" : "Новый прием пищи"}
        value={meal.type}
        isEdit={isEdit}
        onChangeValue={(val) => updateMeal(menuId, nDay, nMeal, val)}
        sx={{ fontWeight: "bold" }}
        editWidth={100}
      />
      {!isEdit && ":"}
      <div
        css={css`
          margin-left: 6px;
        `}
      >
        <DishSelect
          isEdit={isEdit}
          dishes={meal.dishes}
          menuId={menuId}
          nDay={nDay}
          nMeal={nMeal}
          isEmptyMeal={meal.type == ""}
        />
      </div>
    </Stack>
  );
}

interface DishSelectProps {
  dishes: string[];
  isEdit: boolean;
  menuId: string;
  nDay: number;
  nMeal: number;
  isEmptyMeal: boolean;
}

function DishSelect({
  isEdit,
  dishes,
  menuId,
  nDay,
  nMeal,
  isEmptyMeal,
}: DishSelectProps) {
  const { deleteDishFromMeal, getDishesList } = useMenuStore();
  const dishesList = getDishesList();
  const dishesAtMeal = dishesList
    .filter((d) => dishes.includes(d.id))
    .filter((d) => d);
  // const addNewDish = (dishName: string) => {
  //   const id = addDish("", dishName);
  //   if (id) addDishToMeal(menuId, nDay, nMeal, id);
  // };

  return (
    <>
      {isEdit ? (
        <Stack direction={"row"} gap={"3px"} flexWrap={"wrap"}>
          {dishesAtMeal.map((d) => (
            <Tooltip title={d.name} placement="top">
              <Chip
                label={d.name}
                variant="outlined"
                onDelete={() => deleteDishFromMeal(menuId, nDay, nMeal, d.id)}
                sx={{ maxWidth: 150 }}
              />
            </Tooltip>
          ))}
          {!isEmptyMeal && (
            <AddDishButton menuId={menuId} nDay={nDay} nMeal={nMeal} />
          )}
        </Stack>
      ) : (
        dishesAtMeal.map((d, i) => (
          <>
            <MenuDishIngredients dish={d!} key={d?.id} />
            {i < dishesAtMeal.length - 1 && ", "}
          </>
        ))
      )}
    </>
  );
}

interface MenuDishIngredientsProps {
  dish: Dish;
}

function MenuDishIngredients({ dish }: MenuDishIngredientsProps) {
  const ingredientsView = dish.ingredients.map((ingredient) => (
    <Typography variant="body1" color="text.secondary" key={ingredient.name}>
      {ingredient.name}: {ingredient.count} {ingredient.unit}
    </Typography>
  ));
  const hasIngredients = dish.ingredients.length > 0;

  return (
    <>
      <TextWithPopover
        id={dish.id}
        popup={
          <>
            {hasIngredients ? (
              ingredientsView
            ) : (
              <Typography color="error">Ингридиенты не заполнены</Typography>
            )}
            <Link to={"/dishes/" + dish.id}>Изменить</Link>
          </>
        }
      >
        <Typography
          sx={
            !hasIngredients
              ? {
                  textDecoration: "underline",
                  textDecorationColor: "#d32f2f",
                }
              : undefined
          }
          component="span"
        >
          {dish.name}
        </Typography>
      </TextWithPopover>
    </>
  );
}
