import React from "react";
import PropTypes from "prop-types";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import "./styles.scss";

LoaddingTable.propTypes = {
  columns: PropTypes.array.isRequired,
  colSpan: PropTypes.number.isRequired,
};

function LoaddingTable(props) {
  const { columns, colSpan } = props;

  return (
    <TableContainer className="loaddingTable" component={Paper}>
      <Table stickyHeader className="loaddingTable__table">
        <TableHead className="loaddingTable__head">
          <TableRow className="loaddingTable__rowHead">
            {columns.map((column, index) => (
              <TableCell key={column.field} className="loaddingTable__cellHead">
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody className="loaddingTable__body">
          <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            className="loaddingTable__rowBody"
          >
            <TableCell colSpan={colSpan} align="center">
              <CircularProgress color="success" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LoaddingTable;
