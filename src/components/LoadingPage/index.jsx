import {
  CircularProgress,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import "./styles.scss";

LoadingPage.propTypes = {};

function LoadingPage(props) {
  return (
    <TableBody className="loaddingPage">
      <TableRow>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell rowSpan={5}>11</TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableBody>
  );
}

export default LoadingPage;
