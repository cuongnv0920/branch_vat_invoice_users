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
import LoaddingTable from "components/LoaddingTable";
import { selected } from "features/Room/roomSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./styles.scss";

RoomList.propTypes = {};

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
];

function RoomList(props) {
  const dispatch = useDispatch();
  const refreshData = useSelector((state) => state.room.refreshData);
  const roomFilters = useSelector((state) => state.room.roomFilters);
  const [roomList, setRoomList] = useState([]);
  const [loadding, setLoadding] = useState(true);
  const [selectedRow, setSelectedRow] = useState("");
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 2,
  });

  const handleSelectRow = async (event) => {
    const value = event.target.value;
    setSelectedRow(value);
    const action = selected({ id: value });
    const resultAction = await dispatch(action);
    unwrapResult(resultAction);
  };

  useEffect(() => {
    (async () => {
      try {
        const { rooms } = await roomApi.getAll(filters);
        setRoomList(rooms.map((room, index) => ({ ...room, stt: index + 1 })));
        setLoadding(false);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [filters, refreshData]);

  useEffect(() => {
    const fetchSearchTerm = async () => {
      await setFilters((prevFilters) => ({
        ...prevFilters,
        _search: roomFilters.value?.searchTerm,
      }));
    };

    const timer = setTimeout(() => {
      fetchSearchTerm();
    }, 200);

    return () => clearTimeout(timer);
  }, [filters]);

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
              {roomList.map((room, _) => (
                <TableRow
                  key={room.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="roomTable__rowBody"
                >
                  <TableCell className="roomTable__cellBody">
                    <RadioGroup value={selectedRow} onChange={handleSelectRow}>
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
