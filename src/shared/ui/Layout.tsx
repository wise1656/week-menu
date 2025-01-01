import { Container } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      {/* <Typography variant="h4" align="center" gutterBottom> */}
        {/* Weekly Menu Planner
      </Typography> */}
      {children}
    </Container>
  );
};