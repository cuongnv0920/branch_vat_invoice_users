import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Button, Stack } from "@mui/material";
import PropTypes from "prop-types";
import "./styles.scss";

ActionBar.propTypes = {
  openDialogCreate: PropTypes.func,
  openDialogShow: PropTypes.func,
  disabledButton: PropTypes.bool,
};

ActionBar.defaultProps = {
  disabledButton: false,
};

function ActionBar(props) {
  const { openDialogCreate, openDialogShow, disabledButton } = props;

  const handleClickOpenDialogCreate = () => {
    if (openDialogCreate) {
      openDialogCreate();
    }
  };
  const handleClickOpenDialogShow = () => {
    if (openDialogShow) {
      openDialogShow();
    }
  };

  return (
    <div className="actionBar">
      <Stack direction="row" spacing={3} className="actionBar__buttonList">
        <Button
          variant="contained"
          className="actionBar__button button buttonCreate"
          startIcon={<AddCircleIcon />}
          onClick={handleClickOpenDialogCreate}
        >
          Tạo mới
        </Button>

        <Button
          disabled={disabledButton}
          variant="contained"
          className="actionBar__button button buttonShow"
          startIcon={<RemoveRedEyeIcon />}
          onClick={handleClickOpenDialogShow}
        >
          Xem chi tiết
        </Button>
      </Stack>
    </div>
  );
}

export default ActionBar;
