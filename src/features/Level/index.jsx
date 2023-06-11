import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";

Level.propTypes = {};

function Level(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default Level;
