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
import { roomApi } from "api";
import ActionBar from "components/ActionBar";
import PaginationPage from "components/PaginationPage";
import Create from "features/Room/components/Create";
import Filter from "features/Room/components/Filter";
import RoomList from "features/Room/components/RoomList";
import Show from "features/Room/components/Show";
import { getData } from "features/Room/roomSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

ListPage.propTypes = {};

function ListPage(props) {
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogShow, setOpenDialogShow] = useState(false);
  const [closeDialog, setCloseDialog] = useState(0);
  const [roomList, setRoomList] = useState([]);
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
        const { roomList, paginations } = await roomApi.getAll(filters);
        setRoomList(
          roomList.map((room, index) => ({ ...room, stt: index + 1 }))
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

  const handleChangeFilter = (values) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _search: values?.searchTerm,
    }));
  };

  const handleSelectedRow = async (value) => {
    const data = await roomApi.get(value);
    const action = getData(data);
    dispatch(action);
    setDisabled(!!value);
  };

  const handleOpenDialogCreate = () => {
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

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Paper elevation={1}>
            <div className="titleTable">
              <h2 className="tileTableContent">Danh sách phòng/ ban</h2>
            </div>
            <Filter values={handleChangeFilter} />
            <ActionBar
              disabledButton={!disabled}
              openDialogCreate={handleOpenDialogCreate}
              openDialogShow={handleOpenDialogShow}
            />
            <RoomList
              data={roomList}
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
          <Show closeDialog={handleCloseDialogShow} />
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
    </Box>
  );
}

export default ListPage;
