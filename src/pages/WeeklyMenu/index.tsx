import { useParams } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { useMenuStore } from '../../features/menu/store';

export const WeeklyMenu = () => {
  const { id } = useParams();
  const { getMenuById } = useMenuStore();
  const menu = getMenuById(id!);

  if (!menu) return <Typography>Menu not found</Typography>;

  return (
    <div>
      <Typography variant="h4">{menu.name}</Typography>
      {menu.days.map((day) => (
        <div key={day.day}>
          <Typography variant="h6">{day.day}</Typography>
          <List>
            {day.meals.map((meal) => (
              <ListItem key={meal.type}>
                <ListItemText primary={meal.type} secondary={meal.dish} />
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
};