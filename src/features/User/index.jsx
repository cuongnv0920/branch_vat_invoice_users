import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";

User.propTypes = {};

function User(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default User;
