import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Button, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import isAdmin from "utils/isAdmin";
import "./styles.scss";

ActionBar.propTypes = {
  openDialogCreate: PropTypes.func,
  openDialogShow: PropTypes.func,
  openAgree: PropTypes.func,
  openAbort: PropTypes.func,
  disabledButton: PropTypes.bool.isRequired,
};

ActionBar.defaultProps = {
  disabledButton: true,
};

function ActionBar(props) {
  const location = useLocation();
  const isLogged = useSelector((state) => state.auth.current);
  const {
    openDialogCreate,
    openDialogShow,
    disabledButton,
    openAgree,
    openAbort,
  } = props;

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

  const handleClickOpenDialogAgress = () => {
    if (openAgree) {
      openAgree();
    }
  };
  const handleClickOpenDialogAbort = () => {
    if (openAbort) {
      openAbort();
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
        {isAdmin(isLogged.role[0]) && location.pathname === "/invoice" && (
          <>
            <Button
              disabled={disabledButton}
              variant="contained"
              className="actionBar__button button buttonAgree"
              startIcon={<ThumbUpAltIcon />}
              onClick={handleClickOpenDialogAgress}
            >
              Duyệt
            </Button>
            <Button
              disabled={disabledButton}
              variant="contained"
              className="actionBar__button button buttonAbort"
              startIcon={<ThumbDownIcon />}
              onClick={handleClickOpenDialogAbort}
            >
              Hủy duyệt
            </Button>
          </>
        )}
      </Stack>
    </div>
  );
}

export default ActionBar;
