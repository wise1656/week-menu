import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { MenuList } from "../pages/MenuList";
import { WeekMenu } from "../pages/WeekMenu";
import { Layout } from "../shared/ui/Layout";
import { DishesList } from "../pages/DishesList/Index";

export const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MenuList />} />
          <Route path="/weekly-menu/:id" element={<WeekMenu />} />
          <Route path="/dishes" element={<DishesList />} />
          <Route path="/dishes/:id" element={<DishesList />} />
        </Routes>
      </Layout>
    </Router>
  );
};
