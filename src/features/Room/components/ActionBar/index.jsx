import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
import { useState } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Create from "../Create";
import Edit from "../Edit";
import { roomApi } from "api";
import { get, refreshData } from "features/Room/roomSlice";

function ActionBar(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const selectdRow = useSelector((state) => state.room.selected);
  const isDisabled = !!selectdRow.id || "";

  const handleOpenDialogCreate = () => {
    setOpenDialogCreate(true);
  };
  const handleCloseDialogCreate = () => {
    setOpenDialogCreate(false);

    const action = refreshData();
    dispatch(action);
  };

  const handleOpenDialogEdit = async () => {
    try {
      const getRoom = await roomApi.get(selectdRow.id);
      const action = get(getRoom);
      dispatch(action);

      setOpenDialogEdit(true);
    } catch (error) {
      enqueueSnackbar(
        "Không thể lấy dữ liệu người dùng, vui lòng liên hệ Quản trị Chi nhánh.",
        {
          variant: "error",
        }
      );
    }
  };
  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  return (
    <div className="actionBar">
      <Stack direction="row" spacing={3} className="actionBar__buttonList">
        <Button
          variant="contained"
          className="actionBar__button button buttonAdd"
          startIcon={<AddCircleIcon />}
          onClick={handleOpenDialogCreate}
        >
          Tạo mới
        </Button>

        <Button
          disabled={!isDisabled}
          variant="contained"
          className="actionBar__button button buttonView"
          startIcon={<RemoveRedEyeIcon />}
        >
          Xem chi tiết
        </Button>

        <Button
          disabled={!isDisabled}
          variant="contained"
          className="actionBar__button button buttonEdit"
          startIcon={<EditIcon />}
          onClick={handleOpenDialogEdit}
        >
          Sửa
        </Button>

        <Button
          disabled={!isDisabled}
          variant="contained"
          className="actionBar__button button buttonDelete"
          startIcon={<DeleteIcon />}
        >
          Xóa
        </Button>
      </Stack>

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
            className="dialogButtonClose"
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="xs"
        fullWidth="xs"
        open={openDialogEdit}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogEdit(event, reason);
          }
        }}
      >
        <DialogContent>
          <Edit closeDialog={handleCloseDialogEdit} />
        </DialogContent>
        <DialogActions className="dialogAction">
          <Button onClick={handleCloseDialogEdit} className="dialogButtonClose">
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ActionBar;
