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
import { userApi } from "api";
import ActionBar from "components/ActionBar";
import PaginationPage from "components/PaginationPage";
import Create from "features/User/components/Create";
import Delete from "features/User/components/Delete";
import Filter from "features/User/components/Filter";
import Show from "features/User/components/Show";
import UserList from "features/User/components/UserList";
import { getData } from "features/User/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

ListPage.propTypes = {};

function ListPage(props) {
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogShow, setOpenDialogShow] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [closeDialog, setCloseDialog] = useState(0);
  const [userList, setUserList] = useState([]);
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
        const { userList, paginations } = await userApi.getAll(filters);
        setUserList(
          userList.map((user, index) => ({ ...user, stt: index + 1 }))
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
  const handleChangeFilterLevel = (value) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _filterLevel: value,
    }));
  };

  const handleSelectedRow = async (value) => {
    const data = await userApi.get(value);
    console.log(data);
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
              <h2 className="tileTableContent">Danh sách người dùng</h2>
            </div>
            <Filter
              search={handleChangeSearchTerm}
              filterRoom={handleChangeFilterRoom}
              filterLevel={handleChangeFilterLevel}
            />
            <ActionBar
              disabledButton={!disabled}
              openDialogCreate={handleOpenDialogCreate}
              openDialogShow={handleOpenDialogShow}
            />
            <UserList
              data={userList}
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
