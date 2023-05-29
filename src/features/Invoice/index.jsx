import { Route, Routes } from "react-router-dom";
import InvoiceList from "./components/InvoiceList";

Invoice.propTypes = {};

function Invoice(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<InvoiceList />} />
      </Routes>
    </div>
  );
}

export default Invoice;
