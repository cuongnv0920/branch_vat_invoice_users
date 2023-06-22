import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
} from "@mui/material";
import { invoiceApi, userApi } from "api";
import ActionBar from "components/ActionBar";
import PaginationPage from "components/PaginationPage";
import Create from "features/Invoice/components/Create";
import Delete from "features/Invoice/components/Delete";
import Filter from "features/Invoice/components/Filter";
import InvoiceList from "features/Invoice/components/InvoiceList";
import ReadXml from "features/Invoice/components/ReadXml";
import Show from "features/Invoice/components/Show";
import { getData } from "features/Invoice/invoiceSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

ListPage.propTypes = {};

function ListPage(props) {
  const [openDialogReadXml, setOpenDialogReadXml] = useState(false);
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogShow, setOpenDialogShow] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [closeDialog, setCloseDialog] = useState(0);
  const [invoiceList, setInvoiceList] = useState([]);
  const [loadding, setLoadding] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
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
          invoiceList.map((user, index) => ({ ...user, stt: index + 1 }))
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

  const handleSelectedRow = async (value) => {
    const data = await userApi.get(value);
    console.log(data);
    const action = getData(data);
    dispatch(action);
    setDisabled(!!value);
  };

  const handleOpenDialogReadXml = () => {
    setOpenDialogReadXml(true);
  };
  const handleCloseDialogReadXml = () => {
    setOpenDialogReadXml(false);
    setCloseDialog(closeDialog + 1);
    setOpenDialogCreate(true);
  };

  const handleOpenDialogCreate = () => {
    setOpenDialogReadXml(false);
    setOpenDialogCreate(true);
  };
  const handleCloseDialogCreate = () => {
    setOpenDialogCreate(false);
    setCloseDialog(closeDialog + 1);
  };

  const handleOpenDialogShow = async () => {
    await setOpenDialogShow(true);
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
              disabledButton={!disabled}
              openDialogCreate={handleOpenDialogReadXml}
              openDialogShow={handleOpenDialogShow}
            />
            <InvoiceList
              data={invoiceList}
              loadding={loadding}
              selectedRow={handleSelectedRow}
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
        maxWidth="xs"
        fullWidth="xs"
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
            onClick={handleCloseDialogReadXml}
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
        maxWidth="md"
        fullWidth="md"
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
    </Box>
  );
}

export default ListPage;
