/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem, styled } from "@mui/material";
import { useMenuStore } from "../../features/menu/store";
import { EditableText } from "../../shared/ui/Editable";
import EditButton from "../../shared/ui/EditButton";
import { Header } from "../../shared/ui/Header";

export const WeeklyMenu = () => {
  const { id } = useParams();
  const { getMenuById, updateMenuName } = useMenuStore();
  const menu = getMenuById(id!);
  const [isEdit, setEdit] = useState(false);

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
        <EditButton onClick={() => setEdit((e) => !e)} />
      </Header>
      {menu.days.map((day) => (
        <div key={day.day}>
          <Typography variant="h6">{day.day}</Typography>
          <List>
            {day.meals.map((meal) => (
              <ListItem key={meal.type}>
                <MealType>{meal.type}</MealType>:{" "}
                {meal.dishes.map((d) => d.name).join(", ")}
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
};

const MealType = styled("div")`
  font-weight: bold;
`;
