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
import { invoiceId } from "features/Invoice/invoiceSlice";
import PropTypes from "prop-types";
import { useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { showFile } from "utils/showFile";
import { showInputStatus } from "utils/showInputStatus";
import { showStatusInvoice } from "utils/showStatusInvoice";
import "./styles.scss";

InvoiceList.propTypes = {
  data: PropTypes.array.isRequired,
  loadding: PropTypes.bool,
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
    title: "Cán bộ khởi tạo",
    field: "createUser",
  },
  {
    title: "Phòng khởi tạo",
    field: "createdRoom",
  },
  {
    title: "Nhập liệu",
    field: "inputStatus",
  },
  {
    title: "Số hóa đơn",
    field: "invoiceNo",
  },
  {
    title: "Tệp tin đính kèm",
    field: "file",
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
  const { data, loadding, pdfView, xmlView } = props;
  const user = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState({});
  const open = Boolean(anchorEl);

  const handleClick = (event, id) => {
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [id]: event.currentTarget,
    }));
  };
  const handleClose = (id) => {
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [id]: null,
    }));
  };

  const handleSelectRow = (event) => {
    const id = event.target.value;
    setValue(id);

    const action = invoiceId(id);
    dispatch(action);
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

  const filteredInvoice = data.filter((invoice) => {
    if (user.role[0] === "admin" || user.role[0] === "accountant") {
      return true;
    } else {
      return invoice.createdRoom._id === user.room;
    }
  });

  return (
    <div className="invoiceTable">
      {loadding ? (
        <LoaddingTable columns={columns} colSpan={columns.length} />
      ) : (
        <TableContainer component={Paper}>
          <Table stickyHeader className="invoiceTable__table">
            <TableHead className="invoiceTable__head">
              <TableRow className="invoiceTable__rowHead">
                {columns.map((column, _) => (
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
              {filteredInvoice.map((invoice, _) => (
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
                  <TableCell className="invoiceTable__cellBody" align="center">
                    {invoice.stt}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.createdUser?.fullName}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.createdRoom?.name}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody" align="center">
                    <button
                      className={
                        invoice.inputStatus
                          ? "inputStatusTrue buttonStatus"
                          : "inputStatusFalse buttonStatus"
                      }
                    >
                      {showInputStatus(invoice.inputStatus)}
                    </button>
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody">
                    {invoice.invoiceNo}
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody" align="center">
                    <Tooltip title="File đính kèm">
                      <IconButton
                        className="invoiceTable__iconButton"
                        onClick={(event) => handleClick(event, invoice.id)}
                        size="small"
                        aria-controls={
                          open[invoice.id] ? `menu-${invoice.id}` : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open[invoice.id] ? "true" : undefined}
                      >
                        <MenuIcon className="invoiceTable__icon" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      className="menuFile"
                      anchorEl={anchorEl[invoice.id]}
                      id={`menu-${invoice.id}`}
                      open={Boolean(anchorEl[invoice.id])}
                      onClose={() => handleClose(invoice.id)}
                      onClick={() => handleClose(invoice.id)}
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
                  <Tooltip title={invoice.seller}>
                    <TableCell className="invoiceTable__cellBody">
                      {invoice.seller}
                    </TableCell>
                  </Tooltip>
                  <Tooltip title={invoice.content}>
                    <TableCell className="invoiceTable__cellBody">
                      {invoice.content}
                    </TableCell>
                  </Tooltip>
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
                  <TableCell className="invoiceTable__cellBody" align="center">
                    <Moment format="DD/MM/YYYY">{invoice.invoiceDate}</Moment>
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody" align="center">
                    <Moment format="DD/MM/YYYY">{invoice.createdAt}</Moment>
                  </TableCell>
                  <TableCell className="invoiceTable__cellBody" align="center">
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
