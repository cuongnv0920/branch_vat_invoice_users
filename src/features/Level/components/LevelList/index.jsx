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
import "./styles.scss";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { levelId } from "features/Level/levelSlice";

LevelList.propTypes = {
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
    title: "Tên chức danh",
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

function LevelList(props) {
  const { data, loadding } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleSelectRow = (event) => {
    const id = event.target.value;
    setValue(id);

    const action = levelId(id);
    dispatch(action);
  };

  return (
    <div className="levelTable">
      {loadding ? (
        <LoaddingTable columns={columns} colSpan={columns.length} />
      ) : (
        <TableContainer component={Paper}>
          <Table stickyHeader className="levelTable__table">
            <TableHead className="levelTable__head">
              <TableRow className="levelTable__rowHead">
                {columns.map((column, _) => (
                  <TableCell
                    key={column.field}
                    className="levelTable__cellHead"
                  >
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody className="levelTable__body">
              {data.map((level, _) => (
                <TableRow
                  key={level.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="levelTable__rowBody"
                >
                  <TableCell className="levelTable__cellBody">
                    <RadioGroup value={value} onChange={handleSelectRow}>
                      <FormControlLabel
                        className="levelTable__formControlLabel"
                        value={level.id}
                        control={
                          <Radio inputProps={{ "aria-label": level.id }} />
                        }
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell className="levelTable__cellBody">
                    {level.stt}
                  </TableCell>
                  <TableCell className="levelTable__cellBody">
                    {level.name}
                  </TableCell>
                  <TableCell className="levelTable__cellBody">
                    {level.sort}
                  </TableCell>
                  <TableCell className="levelTable__cellBody">
                    <Moment format="DD/MM/YYY">{level.createdAt}</Moment>
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

export default LevelList;
