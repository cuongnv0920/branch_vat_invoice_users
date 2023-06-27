import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Pagination,
  Paper,
} from "@mui/material";
import { invoiceApi, userApi } from "api";
import ActionBar from "components/ActionBar";
import PaginationPage from "components/PaginationPage";
import api from "configs/apiConf";
import Create from "features/Invoice/components/Create";
import Delete from "features/Invoice/components/Delete";
import Filter from "features/Invoice/components/Filter";
import InvoiceList from "features/Invoice/components/InvoiceList";
import ReadXml from "features/Invoice/components/ReadXml";
import Show from "features/Invoice/components/Show";
import { getData, inputStatus, removeXml } from "features/Invoice/invoiceSlice";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

ListPage.propTypes = {};

function ListPage(props) {
  const invoiceId = useSelector((state) => state.invoice.invoiceId);
  const dispatch = useDispatch();
  const [openDialogReadXml, setOpenDialogReadXml] = useState(false);
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogShow, setOpenDialogShow] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogPdfView, setOpenDialogPdfView] = useState(false);
  const [openDialogXmlView, setOpenDialogXmlView] = useState(false);
  const [pdfPath, setPdfPath] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [closeDialog, setCloseDialog] = useState(0);
  const [invoiceList, setInvoiceList] = useState([]);
  const [loadding, setLoadding] = useState(true);
  const [disabledButtonAction, setDisabledButtonAction] = useState(true);
  const [paginations, setPaginations] = useState({
    limit: 20,
    count: 20,
    page: 1,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 20,
  });

  useEffect(() => {
    (async () => {
      try {
        const { invoiceList, paginations } = await invoiceApi.getAll(filters);
        setInvoiceList(
          invoiceList.map((invoice, index) => ({ ...invoice, stt: index + 1 }))
        );
        setPaginations(paginations);
        setLoadding(false);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [filters, closeDialog]);

  const handleChangePage = (page) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _page: page,
    }));
  };

  const handleChangeSearchTerm = (value) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _search: value?.searchTerm,
    }));
  };

  const handleChangeFilterRoom = (value) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _filterRoom: value,
    }));
  };
  const handleChangeFilterStatus = (value) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _filterStatus: value,
    }));
  };

  const handleOpenDialogReadXml = () => {
    setOpenDialogReadXml(true);
  };
  const handleCloseDialogReadXml = () => {
    setOpenDialogReadXml(false);
    setCloseDialog(closeDialog + 1);
    setOpenDialogCreate(true);
  };
  const handleCloseDialogReadXmlButton = () => {
    setOpenDialogReadXml(false);
  };

  const handleOpenDialogCreate = () => {
    setOpenDialogReadXml(false);
    setOpenDialogCreate(true);
  };
  const handleCloseDialogCreate = () => {
    setOpenDialogCreate(false);
    setCloseDialog(closeDialog + 1);
    const action = removeXml(); // remove xml data
    dispatch(action);

    const actionInputStatus = inputStatus(false); // update false input status
    dispatch(actionInputStatus);
  };

  const handleOpenDialogShow = async () => {
    const data = await invoiceApi.get(invoiceId);
    const action = getData(data);
    dispatch(action);

    setOpenDialogShow(true);
  };
  const handleCloseDialogShow = () => {
    setOpenDialogShow(false);
    setCloseDialog(closeDialog + 1);
  };

  const handleOpenDialogDelete = () => {
    setOpenDialogShow(false);
    setOpenDialogDelete(true);
  };
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setCloseDialog(closeDialog + 1);
  };

  const handleOpenDialogPdfView = (path) => {
    setPdfPath(path);
    setOpenDialogPdfView(true);
  };
  const handleCloseDialogPdfView = () => {
    setOpenDialogPdfView(false);
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handleChangePagePdfView = (event, page) => {
    setPageNumber(page);
  };

  const handleOpenDialogXmlView = (path) => {
    setOpenDialogXmlView(true);
  };
  const handleCloseDialogXmlView = () => {
    setOpenDialogXmlView(false);
  };
  useEffect(() => {
    const statusDisabledButtonAction = !!invoiceId;
    if (statusDisabledButtonAction) {
      setDisabledButtonAction(false);
    }
  }, [invoiceId]);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Paper elevation={1}>
            <div className="titleTable">
              <h2 className="tileTableContent">Danh sách hóa đơn điện tử</h2>
            </div>
            <Filter
              search={handleChangeSearchTerm}
              filterRoom={handleChangeFilterRoom}
              filterStatus={handleChangeFilterStatus}
            />
            <ActionBar
              disabledButton={disabledButtonAction}
              openDialogCreate={handleOpenDialogReadXml}
              openDialogShow={handleOpenDialogShow}
            />
            <InvoiceList
              data={invoiceList}
              loadding={loadding}
              pdfView={handleOpenDialogPdfView}
              xmlView={handleOpenDialogXmlView}
            />
            <PaginationPage
              item={paginations.total}
              page={paginations.page}
              count={paginations.count}
              onChange={handleChangePage}
            />
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        maxWidth="sm"
        fullWidth="sm"
        open={openDialogReadXml}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogReadXml(event, reason);
          }
        }}
      >
        <DialogContent>
          <ReadXml
            closeDialog={handleCloseDialogReadXml}
            openDialogCreate={handleOpenDialogCreate}
          />
        </DialogContent>
        <DialogActions className="dialogAction">
          <Button
            onClick={handleCloseDialogReadXmlButton}
            className="dialogButtonClose dialogButton"
            variant="contained"
            startIcon={<CancelIcon />}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="xs"
        fullWidth="xs"
        open={openDialogCreate}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogCreate(event, reason);
          }
        }}
      >
        <DialogContent>
          <Create closeDialog={handleCloseDialogCreate} />
        </DialogContent>
        <DialogActions className="dialogAction">
          <Button
            onClick={handleCloseDialogCreate}
            className="dialogButtonClose dialogButton"
            variant="contained"
            startIcon={<CancelIcon />}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="xs"
        fullWidth="xs"
        open={openDialogShow}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogShow(event, reason);
          }
        }}
      >
        <DialogContent>
          <Show
            closeDialog={handleCloseDialogShow}
            openDialogDelete={handleOpenDialogDelete}
          />
        </DialogContent>
        <DialogActions className="dialogAction">
          <Button
            onClick={handleCloseDialogShow}
            className="dialogButtonClose dialogButton"
            variant="contained"
            startIcon={<CancelIcon />}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="md"
        open={openDialogDelete}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogDelete(event, reason);
          }
        }}
      >
        <DialogContent>
          <Delete closeDialog={handleCloseDialogDelete} />
        </DialogContent>
        <DialogActions className="dialogAction">
          <Button
            onClick={handleCloseDialogDelete}
            className="dialogButtonClose dialogButton"
            variant="contained"
            startIcon={<CancelIcon />}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="md"
        fullWidth="md"
        open={openDialogPdfView}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogPdfView(event, reason);
          }
        }}
      >
        <DialogContent>
          <Document
            file={`${api.URL}/${pdfPath}`}
            onLoadSuccess={onDocumentLoadSuccess}
            options={{ cMapUrl: "cmaps/", cMapPacked: true }}
          >
            <Page pageNumber={pageNumber} width={850} renderTextLayer={false} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </DialogContent>
        <DialogActions className="dialogAction">
          <Pagination
            sx={{ flexGrow: 1 }}
            count={numPages}
            page={pageNumber}
            variant="outlined"
            color="primary"
            onChange={handleChangePagePdfView}
          />
          <Button
            onClick={handleCloseDialogPdfView}
            className="dialogButtonClose dialogButton"
            variant="contained"
            startIcon={<CancelIcon />}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="md"
        fullWidth="md"
        open={openDialogXmlView}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogXmlView(event, reason);
          }
        }}
      >
        <DialogContent>nội dung xml</DialogContent>
        <DialogActions className="dialogAction">
          <Button
            onClick={handleCloseDialogXmlView}
            className="dialogButtonClose dialogButton"
            variant="contained"
            startIcon={<CancelIcon />}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ListPage;
