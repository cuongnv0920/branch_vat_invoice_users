import { unwrapResult } from "@reduxjs/toolkit";
import { updateStatus } from "features/Invoice/invoiceSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import AbortForm from "../AbortForm";

Abort.propTypes = {
  closeDialog: PropTypes.func,
};

function Abort(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = updateStatus(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const { closeDialog } = props; // close dialog
      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar("Hủy duyệt thành công.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <AbortForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Abort;
