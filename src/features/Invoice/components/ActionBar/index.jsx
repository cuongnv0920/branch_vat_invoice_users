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
import Create from "../Create";
import "./styles.scss";

ActionBar.propTypes = {};

function ActionBar(props) {
  const [openDialogCreate, setOpenDialogCreate] = useState(false);

  const handleOpenDialogCreate = () => {
    setOpenDialogCreate(true);
  };
  const handleCloseDialogCreate = () => {
    setOpenDialogCreate(false);
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
          variant="contained"
          className="actionBar__button button buttonView"
          startIcon={<RemoveRedEyeIcon />}
        >
          Xem chi tiết
        </Button>

        <Button
          disabled
          variant="contained"
          className="actionBar__button button buttonEdit"
          startIcon={<EditIcon />}
        >
          Sửa
        </Button>

        <Button
          disabled
          variant="contained"
          className="actionBar__button button buttonDelete"
          startIcon={<DeleteIcon />}
        >
          Xóa
        </Button>
      </Stack>

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
          <Create />
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
    </div>
  );
}

export default ActionBar;
