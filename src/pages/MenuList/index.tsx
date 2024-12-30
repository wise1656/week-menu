import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { useMenuStore } from '../../features/menu/store';

export const MenuList = () => {
  const navigate = useNavigate();
  const { menus } = useMenuStore();

  return (
    <List>
      {menus.map((menu) => (
        <ListItem key={menu.id}>
          <ListItemText primary={menu.name} />
          <Button onClick={() => navigate(`/weekly-menu/${menu.id}`)}>View</Button>
        </ListItem>
      ))}
    </List>
  );
};