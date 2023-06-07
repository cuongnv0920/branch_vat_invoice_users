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
import { unwrapResult } from "@reduxjs/toolkit";
import { roomApi } from "api";
import { selected } from "features/Room/roomSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";

function RoomList(props) {
  const dispatch = useDispatch();
  const refreshData = useSelector((state) => state.room.refreshData);
  const [roomList, setRoomList] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");

  const handleSelectRow = async (event) => {
    const value = event.target.value;
    setSelectedRow(value);
    const action = selected({ id: value });
    const resultAction = await dispatch(action);
    unwrapResult(resultAction);
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const rooms = await roomApi.getAll();
      setRoomList(rooms.map((room, index) => ({ ...room, stt: index + 1 })));
    };

    fetchRoom();
  }, [refreshData]);

  return (
    <TableContainer className="roomTable" component={Paper}>
      <Table stickyHeader className="roomTable__table">
        <TableHead className="roomTable__head">
          <TableRow className="roomTable__rowHead">
            <TableCell className="roomTable__cellHead">Chọn</TableCell>
            <TableCell
              className="roomTable__cellHead"
              sx={{ textAlign: "center" }}
            >
              STT
            </TableCell>
            <TableCell
              className="roomTable__cellHead"
              sx={{ textAlign: "center" }}
            >
              Mã phòng/ ban
            </TableCell>
            <TableCell className="roomTable__cellHead">
              Tên phòng/ ban
            </TableCell>
            <TableCell
              className="roomTable__cellHead"
              sx={{ textAlign: "center" }}
            >
              Số sắp xếp
            </TableCell>
            <TableCell
              className="roomTable__cellHead"
              sx={{ textAlign: "center" }}
            >
              Trạng thái
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="roomTable__body">
          {roomList.map((room, _) => (
            <TableRow
              key={room.code}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className="roomTable__rowBody"
            >
              <TableCell className="roomTable__cellBody">
                <RadioGroup
                  value={selectedRow}
                  onChange={handleSelectRow}
                  sx={{ marginLeft: "16px" }}
                >
                  <FormControlLabel
                    value={room.id}
                    control={<Radio inputProps={{ "aria-label": room.id }} />}
                  />
                </RadioGroup>
              </TableCell>
              <TableCell
                className="roomTable__cellBody"
                sx={{ textAlign: "center" }}
              >
                {room.stt}
              </TableCell>
              <TableCell
                className="roomTable__cellBody"
                sx={{ textAlign: "center" }}
              >
                {room.code}
              </TableCell>
              <TableCell className="roomTable__cellBody">{room.name}</TableCell>
              <TableCell
                className="roomTable__cellBody"
                sx={{ textAlign: "center" }}
              >
                {room.sort}
              </TableCell>

              <TableCell
                className="roomTable__cellBody"
                sx={{ textAlign: "center" }}
              >
                <button className="roomTable__buttonStatus">Hoạt động</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RoomList;
