import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import LoaddingTable from "components/LoaddingTable";
import PropTypes from "prop-types";
import { useState } from "react";
import Moment from "react-moment";
import { showStatusInvoice } from "utils/showStatusInvoice";
import "./styles.scss";

InvoiceList.propTypes = {
  data: PropTypes.array.isRequired,
  loadding: PropTypes.bool,
  selectedRow: PropTypes.func,
};

const columns = [
  {
    title: "Chọn",
    field: "selected",
  },
  {
    title: "STT",
    field: "stt",
  },
  {
    title: "Ký hiệu",
    field: "serial",
  },
  {
    title: "Số hóa đơn",
    field: "invoiceNo",
  },
  {
    title: "Ngày hóa đơn",
    field: "invoiceDate",
  },
  {
    title: "Đơn vị cung cấp",
    field: "seller",
  },
  {
    title: "Tổng số tiền (VNĐ)",
    field: "payment",
  },
  {
    title: "Nội dung thanh toán",
    field: "content",
  },
  {
    title: "Cán bộ tạo",
    field: "createUser",
  },
  {
    title: "Cán bộ xử lý",
    field: "approveUser",
  },
  {
    title: "Trạng thái",
    field: "status",
  },
  {
    title: "Ngày khởi tạo",
    field: "createdAt",
  },
  {
    title: "Ngày xử lý",
    field: "updatedAt",
  },
];

function InvoiceList(props) {
  const { data, loadding, selectedRow } = props;
  const [value, setValue] = useState(undefined || "");

  const handleSelectRow = async (event) => {
    setValue(event.target.value);
    if (selectedRow) {
      selectedRow(event.target.value);
    }
  };

  return (
    <div className="invoiceTable">
      {loadding ? (
        <LoaddingTable columns={columns} colSpan={columns.length} />
      ) : (
        <TableContainer component={Paper}>
          <Table stickyHeader className="invoiceTable__table">
            <TableHead className="invoiceTable__head">
              <TableRow className="invoiceTable__rowHead">
                {columns.map((column, index) => (
                  <TableCell
                    key={column.field}
                    className="invoiceTable__cellHead"
                  >
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody className="invoiceTable__body">
              {data.map((invoice, _) => (
                <TableRow
                  key={invoice.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="invoiceTable__rowBody"
                >
                  <TableCell className="invoiceTable__cellBody">
                    <RadioGroup value={value} onChange={handleSelectRow}>
                      <FormControlLabel
                        className="invoiceTable__formControlLabel"
                        value={invoice.id}
                        control={
                          <Radio inputProps={{ "aria-label": invoice.id }} />
                        }
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.stt}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.serial}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.invoiceNo}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    <Moment format="DD/MM/YYYY">{invoice.invoiceDate}</Moment>
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.seller}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.payment.toLocaleString()}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.content}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.createdUser?.fullName}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.approvedUser?.fullName}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    <button
                      className={
                        invoice.status
                          ? "statusTrue buttonStatus"
                          : "statusFalse buttonStatus"
                      }
                    >
                      {showStatusInvoice(invoice.status)}
                    </button>
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    <Moment format="DD/MM/YYYY">{invoice.createdAt}</Moment>
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.updatedAt !== null && (
                      <Moment format="DD/MM/YYYY">{invoice.updatedAt}</Moment>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default InvoiceList;
