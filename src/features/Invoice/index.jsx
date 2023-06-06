import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/listPage";

Invoice.propTypes = {};

function Invoice(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default Invoice;
