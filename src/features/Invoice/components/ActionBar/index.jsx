import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Button, Stack } from "@mui/material";
import "./styles.scss";

ActionBar.propTypes = {};

function ActionBar(props) {
  return (
    <div className="actionBar">
      <Stack direction="row" spacing={3} className="actionBar__buttonList">
        <Button
          variant="contained"
          className="actionBar__button button buttonAdd"
          startIcon={<AddCircleIcon />}
        >
          Tạo mới
        </Button>

        <Button
          variant="contained"
          className="actionBar__button button buttonView"
          startIcon={<RemoveRedEyeIcon />}
        >
          Xem
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
    </div>
  );
}

export default ActionBar;
