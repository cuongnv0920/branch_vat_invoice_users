import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import MiniDrawer from "components/MiniDrawer";
import Invoice from "features/Invoice";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const routeList = [
  {
    path: "invoice/*",
    element: <Invoice />,
    role: ["user"],
  },
];

function App() {
  return (
    <Box className="root">
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {routeList.map((route, _) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
