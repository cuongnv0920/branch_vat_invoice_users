import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";

Room.propTypes = {};

function Room(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default Room;
