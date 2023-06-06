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
import { userApi } from "api";
import { selected } from "features/User/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./styles.scss";

function UserList(props) {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");

  const handleSelectRow = async (event) => {
    const value = event.target.value;
    setSelectedRow(value);
    const action = selected({ id: value });
    const resultAction = await dispatch(action);
    unwrapResult(resultAction);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const users = await userApi.getAll();
      setUserList(users.map((user, index) => ({ ...user, stt: index + 1 })));
    };

    fetchUser();
  }, []);

  return (
    <TableContainer className="userTable" component={Paper}>
      <Table stickyHeader className="userTable__table">
        <TableHead className="userTable__head">
          <TableRow className="userTable__rowHead">
            <TableCell
              className="userTable__cellHead"
              sx={{ textAlign: "center" }}
            >
              Chọn
            </TableCell>
            <TableCell
              className="userTable__cellHead"
              sx={{ textAlign: "center" }}
            >
              STT
            </TableCell>
            <TableCell className="userTable__cellHead">Họ và tên</TableCell>
            <TableCell className="userTable__cellHead">Địa chỉ email</TableCell>
            <TableCell className="userTable__cellHead">Phòng/ ban</TableCell>
            <TableCell className="userTable__cellHead">Chức danh</TableCell>
            <TableCell
              className="userTable__cellHead"
              sx={{ textAlign: "center" }}
            >
              Trạng thái
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="userTable__body">
          {userList.map((user, _) => (
            <TableRow
              key={user.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className="userTable__rowBody"
            >
              <TableCell className="userTable__cellBody">
                <RadioGroup
                  value={selectedRow}
                  onChange={handleSelectRow}
                  sx={{ marginLeft: "16px" }}
                >
                  <FormControlLabel
                    value={user.id}
                    control={<Radio inputProps={{ "aria-label": user.id }} />}
                  />
                </RadioGroup>
              </TableCell>
              <TableCell
                className="userTable__cellBody"
                sx={{ textAlign: "center" }}
              >
                {user.stt}
              </TableCell>
              <TableCell className="userTable__cellBody">
                {user.fullName}
              </TableCell>
              <TableCell className="userTable__cellBody">
                {user.email}
              </TableCell>
              <TableCell className="userTable__cellBody">
                {user.room?.name}
              </TableCell>

              <TableCell className="userTable__cellBody">
                {user.level?.name}
              </TableCell>

              <TableCell
                className="userTable__cellBody"
                sx={{ textAlign: "center" }}
              >
                <button className="userTable__buttonStatus">Hoạt động</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserList;
