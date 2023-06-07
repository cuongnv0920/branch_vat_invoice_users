import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import ListPage from "./pages/ListPage";
import { removeSelected } from "./roomSlice";

Room.propTypes = {};

function Room(props) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // remove selected row whe then user move to another page
    if (!!pathname) {
      const action = removeSelected();
      dispatch(action);
    }
  });

  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default Room;
