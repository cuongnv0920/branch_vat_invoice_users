import { CheckBox } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import "./styles.scss";

InvoiceList.propTypes = {};

const rows = [
  {
    stt: 1,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    seller:
      "Trung tâm Kinh doanh VNPT thành phố Hồ Chí Minh - Chi nhánh Tổng công ty Dịch vụ Viễn Thông",
    payment: "1,000,000",
  },
  {
    stt: 2,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    seller:
      "Trung tâm Kinh doanh VNPT thành phố Hồ Chí Minh - Chi nhánh Tổng công ty Dịch vụ Viễn Thông",
    payment: "1,000,000",
  },
  {
    stt: 3,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    seller:
      "Trung tâm Kinh doanh VNPT thành phố Hồ Chí Minh - Chi nhánh Tổng công ty Dịch vụ Viễn Thông",
    payment: "1,000,000",
  },
  {
    stt: 4,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    seller:
      "Trung tâm Kinh doanh VNPT thành phố Hồ Chí Minh - Chi nhánh Tổng công ty Dịch vụ Viễn Thông",
    payment: "1,000,000",
  },
  {
    stt: 5,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    seller:
      "Trung tâm Kinh doanh VNPT thành phố Hồ Chí Minh - Chi nhánh Tổng công ty Dịch vụ Viễn Thông",
    payment: "1,000,000",
  },
  {
    stt: 6,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    seller:
      "Trung tâm Kinh doanh VNPT thành phố Hồ Chí Minh - Chi nhánh Tổng công ty Dịch vụ Viễn Thông",
    payment: "1,000,000",
  },
  {
    stt: 7,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    seller:
      "Trung tâm Kinh doanh VNPT thành phố Hồ Chí Minh - Chi nhánh Tổng công ty Dịch vụ Viễn Thông",
    payment: "1,000,000",
  },
  {
    stt: 8,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    seller:
      "Trung tâm Kinh doanh VNPT thành phố Hồ Chí Minh - Chi nhánh Tổng công ty Dịch vụ Viễn Thông",
    payment: "1,000,000",
  },
  {
    stt: 9,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    seller:
      "Trung tâm Kinh doanh VNPT thành phố Hồ Chí Minh - Chi nhánh Tổng công ty Dịch vụ Viễn Thông",
    payment: "1,000,000",
  },
  {
    stt: 10,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    seller:
      "Trung tâm Kinh doanh VNPT thành phố Hồ Chí Minh - Chi nhánh Tổng công ty Dịch vụ Viễn Thông",
    payment: "1,000,000",
  },
];

function InvoiceList(props) {
  return (
    <>
      <TableContainer className="invoiceTable">
        <Table stickyHeader className="invoiceTable__table">
          <TableHead className="invoiceTable__head">
            <TableRow className="invoiceTable__rowHead">
              <TableCell className="invoiceTable__cellHead">
                Check box
              </TableCell>
              <TableCell className="invoiceTable__cellHead">STT</TableCell>
              <TableCell className="invoiceTable__cellHead">Ký hiệu</TableCell>
              <TableCell className="invoiceTable__cellHead">
                Số hóa đơn
              </TableCell>
              <TableCell className="invoiceTable__cellHead">
                Ngày hóa đơn
              </TableCell>
              <TableCell className="invoiceTable__cellHead">
                Đơn vị cung cấp
              </TableCell>
              <TableCell className="invoiceTable__cellHead">
                Trạng thái
              </TableCell>
              <TableCell className="invoiceTable__cellHead">Số tiền</TableCell>
              <TableCell className="invoiceTable__cellHead">
                File đính kèm
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="invoiceTable__body">
            {rows.map((row, _) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="invoiceTable__rowBody"
              >
                <TableCell className="invoiceTable__cellBody">
                  <CheckBox className="invoiceTable__checkBox" />
                </TableCell>
                <TableCell className="invoiceTable__cellBody">
                  {row.stt}
                </TableCell>
                <TableCell className="invoiceTable__cellBody">
                  {row.serial}
                </TableCell>
                <TableCell className="invoiceTable__cellBody">
                  {row.no}
                </TableCell>
                <TableCell className="invoiceTable__cellBody">
                  {row.date}
                </TableCell>
                <Tooltip title={row.seller}>
                  <TableCell className="invoiceTable__cellBody">
                    {row.seller}
                  </TableCell>
                </Tooltip>
                <TableCell className="invoiceTable__cellBody">
                  <button className="invoiceTable__buttonStatus">
                    Đã duyệt
                  </button>
                </TableCell>
                <TableCell className="invoiceTable__cellBody">
                  {row.payment}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={10}
        rowsPerPage={10}
      />
    </>
  );
}

export default InvoiceList;
