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

LevelList.propTypes = {
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
  const { data, loadding, selectedRow } = props;
  const [value, setValue] = useState(undefined || "");

  const handleSelectRow = async (event) => {
    setValue(event.target.value);
    if (selectedRow) {
      selectedRow(event.target.value);
    }
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
                {columns.map((column, index) => (
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
