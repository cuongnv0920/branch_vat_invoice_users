import { CheckBox } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

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
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 680 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} className="invoiceTable">
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
                <TableCell>
                  <CheckBox />
                </TableCell>
                <TableCell>{row.stt}</TableCell>
                <TableCell>{row.serial}</TableCell>
                <TableCell>{row.no}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.seller}</TableCell>
                <TableCell>
                  <button>Đã duyệt</button>
                </TableCell>
                <TableCell>{row.payment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default InvoiceList;
