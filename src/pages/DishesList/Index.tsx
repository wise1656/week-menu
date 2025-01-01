/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Typography, Collapse, Stack, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useMenuStore } from "../../features/menu/store";
import { Dish, Ingredient } from "../../features/menu/types";
import { EditableText } from "../../shared/ui/Editable";
import { TextEdit } from "../../shared/ui/TextEdit";
import { useParams } from "react-router-dom";
import { Header } from "../../shared/ui/Header";

export const DishesList = () => {
  const { getDishesList } = useMenuStore();
  const dishes = getDishesList();

  return (
    <div>
      <Header>
        <Typography variant="h4">Список блюд</Typography>
      </Header>
      <Stack spacing={1}>
        {dishes.map((dish) => (
          <DishView dish={dish} key={dish.id} />
        ))}
      </Stack>
    </div>
  );
};

interface DishProps {
  dish: Dish;
}

function DishView({ dish }: DishProps) {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(dish.id == id);
  const [isEdit, setIsEdit] = useState(dish.id == id);
  const toggleOpen = () => setIsOpen((v) => !v);
  const toggleEdit = () => setIsEdit((v) => !v);
  const { renameDish } = useMenuStore();

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <EditableText
          variant="h6"
          isEdit={isEdit}
          value={dish.name}
          onClick={toggleOpen}
          setValue={(val) => renameDish(dish.id, val)}
        />
        {isOpen ? (
          <ExpandLessIcon onClick={toggleOpen} />
        ) : (
          <ExpandMoreIcon onClick={toggleOpen} />
        )}
      </div>
      <Collapse in={isOpen}>
        <Ingredients dish={dish} isEdit={isEdit} />
        <Button size="small" onClick={toggleEdit}>
          {isEdit ? "Ok" : "Изменить"}
        </Button>
      </Collapse>
    </div>
  );
}

interface IngredientsProps {
  dish: Dish;
  isEdit: boolean;
}

function Ingredients({ dish, isEdit }: IngredientsProps) {
  const { setIngredient } = useMenuStore();
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
          <Stack direction={"row"}>
            <TextEdit
              value={ingredient.name}
              onChangeValue={(val) => updateIngredient({ name: val }, nIngr)}
            />
            <TextEdit
              value={ingredient.count}
              type="number"
              onChangeValue={(val) => updateIngredient({ count: +val }, nIngr)}
            />
            <TextEdit
              value={ingredient.unit}
              onChangeValue={(val) => updateIngredient({ unit: val }, nIngr)}
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
