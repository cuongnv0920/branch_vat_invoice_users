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
import { showPermissionName } from "utils/showPermissionName";
import { showStatus } from "utils/showStatus";
import { useDispatch } from "react-redux";
import { userId } from "features/User/userSlice";

UserList.propTypes = {
  data: PropTypes.array.isRequired,
  loadding: PropTypes.bool,
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
    title: "Họ và tên",
    field: "fullName",
  },
  {
    title: "Địa chỉ Email",
    field: "email",
  },
  {
    title: "Phòng/ ban",
    field: "room",
  },
  {
    title: "Chức danh",
    field: "level",
  },
  {
    title: "Số điện thoại di động",
    field: "phone",
  },
  {
    title: "Số điện thoại nội bộ",
    field: "ext",
  },
  {
    title: "Nhóm quyền",
    field: "role",
  },
  {
    title: "Ngày sinh",
    field: "birthday",
  },
  {
    title: "Trạng thái",
    field: "status",
  },
  {
    title: "Ngày khởi tạo",
    field: "createdAt",
  },
];

function UserList(props) {
  const { data, loadding } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleSelectRow = (event) => {
    const id = event.target.value;
    setValue(id);

    const action = userId(id);
    dispatch(action);
  };

  return (
    <div className="userTable">
      {loadding ? (
        <LoaddingTable columns={columns} colSpan={columns.length} />
      ) : (
        <TableContainer component={Paper}>
          <Table stickyHeader className="userTable__table">
            <TableHead className="userTable__head">
              <TableRow className="userTable__rowHead">
                {columns.map((column, index) => (
                  <TableCell key={column.field} className="userTable__cellHead">
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody className="userTable__body">
              {data.map((user, _) => (
                <TableRow
                  key={user.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="userTable__rowBody"
                >
                  <TableCell className="userTable__cellBody">
                    <RadioGroup value={value} onChange={handleSelectRow}>
                      <FormControlLabel
                        className="userTable__formControlLabel"
                        value={user.id}
                        control={
                          <Radio inputProps={{ "aria-label": user.id }} />
                        }
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell className="userTable__cellBody">
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
                  <TableCell className="userTable__cellBody">
                    {user?.phone}
                  </TableCell>
                  <TableCell className="userTable__cellBody">
                    {user?.ext}
                  </TableCell>
                  <TableCell
                    className={
                      user.role[0] === "admin"
                        ? "roleAdmin userTable__cellBody"
                        : "userTable__cellBody"
                    }
                  >
                    {showPermissionName(user.role)}
                  </TableCell>

                  <TableCell className="userTable__cellBody">
                    <Moment format="DD/MM/YYYY">{user.birthday}</Moment>
                  </TableCell>
                  <TableCell className="userTable__cellBody">
                    <button
                      className={
                        user.status
                          ? "statusTrue buttonStatus"
                          : "statusFalse buttonStatus"
                      }
                    >
                      {showStatus(user.status)}
                    </button>
                  </TableCell>
                  <TableCell className="userTable__cellBody">
                    <Moment format="DD/MM/YYYY">{user.createdAt}</Moment>
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

export default UserList;
