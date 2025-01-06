import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { MenuList } from "../pages/MenuList";
import { WeekMenu } from "../pages/WeekMenu";
import { Layout } from "../shared/ui/Layout";
import { DishesList } from "../pages/DishesList/Index";
import { BuyList } from "../pages/BuyList";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light", // Установите режим на 'light'
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MenuList />} id="menu" />
            <Route path="/weekly-menu/:id" element={<WeekMenu />} id="menu" />
            <Route
              path="/weekly-menu/:id/shopping"
              element={<BuyList />}
              id="buyList"
            />
            <Route path="/dishes" element={<DishesList />} id="dishes" />
            <Route path="/dishes/:id" element={<DishesList />} id="dishes" />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};
