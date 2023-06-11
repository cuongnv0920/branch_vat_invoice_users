import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import MiniDrawer from "components/MiniDrawer";
import Invoice from "features/Invoice";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "features/Auth";
import { useSelector } from "react-redux";
import User from "features/User";
import Room from "features/Room";
import Level from "features/Level";

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
    role: ["user", "admin"],
  },
  {
    path: "room/*",
    element: <Room />,
    role: ["admin"],
  },
  {
    path: "level/*",
    element: <Level />,
    role: ["admin"],
  },
  {
    path: "user/*",
    element: <User />,
    role: ["admin"],
  },
];

function App() {
  const logged = useSelector((state) => state.auth.current);
  const isLogged = !!logged.role;

  const routes = routeList.filter((route) => {
    if (isLogged) {
      return route.role.includes(logged.role[0]);
    }
  });

  return (
    <>
      {!isLogged && <Auth />}

      {isLogged && (
        <Box className="root">
          <MiniDrawer />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, backgroundColor: "rgb(244, 244, 244)" }}
          >
            <DrawerHeader />
            <Routes>
              {routes.map((route, _) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Box>
        </Box>
      )}
    </>
  );
}

export default App;
