/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem, styled } from "@mui/material";
import { useMenuStore } from "../../features/menu/store";
import { EditableText } from "../../shared/ui/Editable";
import { EditButton } from "../../shared/ui/EditButton";
import { Header } from "../../shared/ui/Header";
import { Day, Meal } from "../../features/menu/types";
import { MultiSelect } from "../../shared/ui/MultiSelect";

export const WeekMenu = () => {
  const { id } = useParams();
  const { getMenuById, updateMenuName } = useMenuStore();
  const menu = getMenuById(id!);
  const [isEdit, setEdit] = useState(false);
  const [test, setTest] = useState(["123"]);

  if (!menu || !id) return <Typography>Меню не найдено</Typography>;

  return (
    <div>
      <Header>
        <EditableText
          variant="h4"
          isEdit={isEdit}
          value={menu.name}
          setValue={(val) => updateMenuName(id, val)}
        />
        <EditButton onClick={() => setEdit((e) => !e)} selected={isEdit} />
      </Header>
      {menu.days.map((day, nDay) => (
        <MenuDay day={day} isEdit={isEdit} menuId={id} nDay={nDay} />
      ))}
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
  const { updateDay } = useMenuStore();
  return (
    <div key={day.day}>
      <EditableText
        variant="h6"
        isEdit={isEdit}
        value={day.day}
        setValue={(val) => updateDay(menuId, nDay, val)}
      ></EditableText>
      <List>
        {day.meals.map((meal, nMeal) => (
          <ListItem key={meal.type} sx={{ alignItems: "flex-end" }}>
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
    <>
      <EditableText
        value={meal.type}
        isEdit={isEdit}
        setValue={(val) => updateMeal(menuId, nDay, nMeal, val)}
        sx={{ fontWeight: "bold" }}
      />
      :{" "}
      <DishSelect
        isEdit={isEdit}
        dishes={meal.dishes}
        menuId={menuId}
        nDay={nDay}
        nMeal={nMeal}
      />
    </>
  );
}

interface DishSelectProps {
  dishes: string[];
  isEdit: boolean;
  menuId: string;
  nDay: number;
  nMeal: number;
}

function DishSelect({ isEdit, dishes, menuId, nDay, nMeal }: DishSelectProps) {
  const { setDishesToMeal, getDishesList } = useMenuStore();
  const dishesList = getDishesList();
  return isEdit ? (
    <MultiSelect
      label="Ингридиенты"
      value={dishesList.filter((d) => dishes.includes(d.id))}
      options={dishesList}
      toStr={(d) => d.name}
      onChange={(val) => setDishesToMeal(menuId, nDay, nMeal, val)}
    />
  ) : (
    dishes
      .map((id) => dishesList.find((dish) => dish.id == id)?.name ?? "")
      .join(", ")
  );
}
