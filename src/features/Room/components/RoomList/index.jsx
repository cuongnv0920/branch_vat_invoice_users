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
import "./styles.scss";

RoomList.propTypes = {
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
    title: "Mã phòng/ ban",
    field: "code",
  },
  {
    title: "Tên phòng/ ban",
    field: "name",
  },
  {
    title: "Số sắp xếp",
    field: "sort",
  },
  {
    title: "Ngày khởi tạo",
    field: "createdAt",
  },
];

function RoomList(props) {
  const { data, loadding, selectedRow } = props;
  const [value, setValue] = useState(undefined || "");

  const handleSelectRow = async (event) => {
    setValue(event.target.value);
    if (selectedRow) {
      selectedRow(event.target.value);
    }
  };

  return (
    <div className="roomTable">
      {loadding ? (
        <LoaddingTable columns={columns} colSpan={columns.length} />
      ) : (
        <TableContainer component={Paper}>
          <Table stickyHeader className="roomTable__table">
            <TableHead className="roomTable__head">
              <TableRow className="roomTable__rowHead">
                {columns.map((column, index) => (
                  <TableCell key={column.field} className="roomTable__cellHead">
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody className="roomTable__body">
              {data.map((room, _) => (
                <TableRow
                  key={room.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="roomTable__rowBody"
                >
                  <TableCell className="roomTable__cellBody">
                    <RadioGroup value={value} onChange={handleSelectRow}>
                      <FormControlLabel
                        className="roomTable__formControlLabel"
                        value={room.id}
                        control={
                          <Radio inputProps={{ "aria-label": room.id }} />
                        }
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell className="roomTable__cellBody">
                    {room.stt}
                  </TableCell>
                  <TableCell className="roomTable__cellBody">
                    {room.code}
                  </TableCell>
                  <TableCell className="roomTable__cellBody">
                    {room.name}
                  </TableCell>
                  <TableCell className="roomTable__cellBody">
                    {room.sort}
                  </TableCell>
                  <TableCell className="roomTable__cellBody">
                    <Moment format="DD/MM/YYYY">{room.createdAt}</Moment>
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

export default RoomList;
