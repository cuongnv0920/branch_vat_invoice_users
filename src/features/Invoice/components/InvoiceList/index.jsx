import MenuIcon from "@mui/icons-material/Menu";
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
import LoaddingTable from "components/LoaddingTable";
import api from "configs/apiConf";
import PropTypes from "prop-types";
import { useState } from "react";
import Moment from "react-moment";
import { showFile } from "utils/showFile";
import { showStatusInvoice } from "utils/showStatusInvoice";
import "./styles.scss";

InvoiceList.propTypes = {
  data: PropTypes.array.isRequired,
  loadding: PropTypes.bool,
  selectedRow: PropTypes.func,
  pdfView: PropTypes.string,
  xmlView: PropTypes.string,
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
    title: "Cán bộ tạo",
    field: "createUser",
  },
  {
    title: "Số hóa đơn",
    field: "invoiceNo",
  },
  {
    title: "Đơn vị cung cấp",
    field: "seller",
  },
  {
    title: "Nội dung thanh toán",
    field: "content",
  },
  {
    title: "File đính kèm",
    field: "file",
  },

  {
    title: "Cán bộ xử lý",
    field: "approveUser",
  },
  {
    title: "Tổng số tiền (VNĐ)",
    field: "payment",
  },
  {
    title: "Trạng thái",
    field: "status",
  },
  {
    title: "Ngày hóa đơn",
    field: "invoiceDate",
  },
  {
    title: "Ngày khởi tạo",
    field: "createdAt",
  },
  {
    title: "Ngày xử lý",
    field: "updatedAt",
  },
];

function InvoiceList(props) {
  const { data, loadding, selectedRow, pdfView, xmlView } = props;
  const [value, setValue] = useState(undefined || "");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectRow = (event) => {
    setValue(event.target.value);
    if (selectedRow) {
      selectedRow(event.target.value);
    }
  };

  const handleClickPdfView = (path) => {
    if (pdfView) {
      pdfView(path);
    }
  };
  const handleClickXmlView = (path) => {
    if (xmlView) {
      xmlView(path);
    }
  };

  return (
    <div className="invoiceTable">
      {loadding ? (
        <LoaddingTable columns={columns} colSpan={columns.length} />
      ) : (
        <TableContainer component={Paper}>
          <Table stickyHeader className="invoiceTable__table">
            <TableHead className="invoiceTable__head">
              <TableRow className="invoiceTable__rowHead">
                {columns.map((column, index) => (
                  <TableCell
                    key={column.field}
                    className="invoiceTable__cellHead"
                  >
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody className="invoiceTable__body">
              {data.map((invoice, _) => (
                <TableRow
                  key={invoice.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="invoiceTable__rowBody"
                >
                  <TableCell className="invoiceTable__cellBody">
                    <RadioGroup value={value} onChange={handleSelectRow}>
                      <FormControlLabel
                        className="invoiceTable__formControlLabel"
                        value={invoice.id}
                        control={
                          <Radio inputProps={{ "aria-label": invoice.id }} />
                        }
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.stt}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.createdUser?.fullName}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.invoiceNo}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.seller}
                  </TableCell>

                  <TableCell className="invoiceTable__cellBody">
                    {invoice.content}
                  </TableCell>

                  <TableCell className="invoiceTable__cellBody">
                    <Tooltip title="File đính kèm">
                      <IconButton
                        className="invoiceTable__iconButton"
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "file-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <MenuIcon className="invoiceTable__icon" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      className="menuFile"
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
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
                            right: 11,
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
                    >
                      <MenuItem
                        onClick={() => handleClickPdfView(invoice.pdfFile)}
                        className="menuFile__menuItem"
                      >
                        <img
                          className="menuFile__fileType"
                          src={`${api.URL}/images/${
                            showFile(invoice.pdfFile).fileType
                          }.png`}
                          alt="pdfFile"
                        />
                        <h5 className="menuFile__fileName">
                          {showFile(invoice.pdfFile).fileName}
                        </h5>
                      </MenuItem>

                      <MenuItem
                        onClick={() => handleClickXmlView(invoice.xmlFile)}
                        className="menuFile__menuItem"
                      >
                        <img
                          className="menuFile__fileType"
                          src={`${api.URL}/images/${
                            showFile(invoice.xmlFile).fileType
                          }.png`}
                          alt="xmlFile"
                        />
                        <h5 className="menuFile__fileName">
                          {showFile(invoice.xmlFile).fileName}
                        </h5>
                      </MenuItem>
                    </Menu>
                  </TableCell>

                  <TableCell className="invoiceTable__cellBody">
                    {invoice.approvedUser?.fullName}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.payment.toLocaleString()}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    <button
                      className={
                        invoice.status
                          ? "statusTrue buttonStatus"
                          : "statusFalse buttonStatus"
                      }
                    >
                      {showStatusInvoice(invoice.status)}
                    </button>
                  </TableCell>

                  <TableCell className="invoiceTable__cellBody">
                    <Moment format="DD/MM/YYYY">{invoice.invoiceDate}</Moment>
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    <Moment format="DD/MM/YYYY">{invoice.createdAt}</Moment>
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.updatedAt !== null && (
                      <Moment format="DD/MM/YYYY">{invoice.updatedAt}</Moment>
                    )}
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

export default InvoiceList;
