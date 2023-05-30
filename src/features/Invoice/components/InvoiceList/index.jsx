import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

InvoiceList.propTypes = {};

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 12, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function InvoiceList(props) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Check box</TableCell>
              <TableCell>STT</TableCell>
              <TableCell>Mẫu số</TableCell>
              <TableCell>Ký hiệu</TableCell>
              <TableCell>Số hóa đơn</TableCell>
              <TableCell>Ngày hóa đơn</TableCell>
              <TableCell>Đơn vị cung cấp</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Số tiền</TableCell>
              <TableCell>File đính kèm</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
}

export default InvoiceList;
