import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Stack } from "@mui/material";
import "./styles.scss";

ActionBar.propTypes = {};

function ActionBar(props) {
  return (
    <div className="actionBar">
      <Stack direction="row" spacing={3} className="actionBar__buttonList">
        <Button
          variant="contained"
          className="actionBar__button"
          startIcon={<AddCircleIcon />}
        >
          Tạo mới
        </Button>
        <Button
          variant="contained"
          className="actionBar__button"
          startIcon={<DeleteIcon />}
        >
          Xóa
        </Button>
        <Button
          variant="contained"
          className="actionBar__button"
          startIcon={<EditIcon />}
        >
          Sửa
        </Button>
      </Stack>
    </div>
  );
}

export default ActionBar;
