import ListPage from "features/pages/listPage";
import { Route, Routes } from "react-router-dom";

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
