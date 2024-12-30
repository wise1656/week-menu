import { Card, CardContent, Typography } from '@mui/material';

interface MenuCardProps {
  title: string;
  description: string;
}

export const MenuCard = ({ title, description }: MenuCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
};