import { CheckBox } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import "./styles.scss";

InvoiceList.propTypes = {};

const rows = [
  {
    stt: 1,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    user: "Nguyễn Văn Cường",
  },
  {
    stt: 2,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    user: "Nguyễn Văn Cường",
  },
  {
    stt: 3,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    user: "Nguyễn Văn Cường",
  },
  {
    stt: 4,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    user: "Nguyễn Văn Cường",
  },
  {
    stt: 5,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    user: "Nguyễn Văn Cường",
  },
  {
    stt: 6,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    user: "Nguyễn Văn Cường",
  },
  {
    stt: 7,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    user: "Nguyễn Văn Cường",
  },
  {
    stt: 8,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    user: "Nguyễn Văn Cường",
  },
  {
    stt: 9,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    user: "Nguyễn Văn Cường",
  },
  {
    stt: 10,
    serial: "1K23THA",
    no: "3288816",
    date: "30/05/2023",
    user: "Nguyễn Văn Cường",
  },
];

function InvoiceList(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState("");

  const handleSelectRow = (event) => {
    setSelectedRow(event.target.value);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer className="invoiceTable" component={Paper}>
      <Table stickyHeader className="invoiceTable__table">
        <TableHead className="invoiceTable__head">
          <TableRow className="invoiceTable__rowHead">
            <TableCell className="invoiceTable__cellHead">Chọn</TableCell>
            <TableCell
              className="invoiceTable__cellHead"
              sx={{ textAlign: "center" }}
            >
              STT
            </TableCell>
            <TableCell className="invoiceTable__cellHead">Ký hiệu</TableCell>
            <TableCell className="invoiceTable__cellHead">Số hóa đơn</TableCell>
            <TableCell className="invoiceTable__cellHead">
              Ngày hóa đơn
            </TableCell>
            <TableCell className="invoiceTable__cellHead">
              Cán bộ khởi tạo
            </TableCell>
            <TableCell
              className="invoiceTable__cellHead"
              sx={{ textAlign: "center" }}
            >
              Trạng thái
            </TableCell>
            <TableCell
              className="invoiceTable__cellHead"
              sx={{ textAlign: "center" }}
            >
              File đính kèm
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="invoiceTable__body">
          {rows.map((row, _) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className="invoiceTable__rowBody"
            >
              <TableCell className="invoiceTable__cellBody">
                <RadioGroup
                  value={selectedRow}
                  onChange={handleSelectRow}
                  sx={{ marginLeft: "16px" }}
                >
                  <FormControlLabel
                    value={rows.serial}
                    control={
                      <Radio inputProps={{ "aria-label": row.serial }} />
                    }
                  />
                </RadioGroup>
              </TableCell>
              <TableCell
                className="invoiceTable__cellBody"
                sx={{ textAlign: "center" }}
              >
                {row.stt}
              </TableCell>
              <TableCell className="invoiceTable__cellBody">
                {row.serial}
              </TableCell>
              <TableCell className="invoiceTable__cellBody">{row.no}</TableCell>
              <TableCell className="invoiceTable__cellBody">
                {row.date}
              </TableCell>
              <Tooltip title={row.seller}>
                <TableCell className="invoiceTable__cellBody">
                  {row.user}
                </TableCell>
              </Tooltip>
              <TableCell
                className="invoiceTable__cellBody"
                sx={{ textAlign: "center" }}
              >
                <button className="invoiceTable__buttonStatus">Đã duyệt</button>
              </TableCell>
              <TableCell
                className="invoiceTable__cellBody"
                sx={{ textAlign: "center" }}
              >
                <Tooltip title="File đính kèm">
                  <IconButton
                    size="large"
                    aria-label="file of current user"
                    aria-controls="menu-file"
                    aria-haspopup="true"
                    onClick={handleOpenMenu}
                    className="invoiceTable__buttonIcon"
                  >
                    <MoreVertIcon className="invoiceTable__iconMenuFile" />
                  </IconButton>
                </Tooltip>

                <Menu
                  id="menu-file"
                  anchorEl={anchorEl}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.12))",
                      mt: 1,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 18,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleCloseMenu}>Tên file PDF</MenuItem>
                  <MenuItem onClick={handleCloseMenu}>Tên file XML</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InvoiceList;
