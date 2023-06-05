import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";

Auth.propTypes = {};

function Auth(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default Auth;
