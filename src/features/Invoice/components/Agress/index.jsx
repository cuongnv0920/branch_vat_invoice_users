import { unwrapResult } from "@reduxjs/toolkit";
import { updateStatus } from "features/Invoice/invoiceSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import AgressForm from "../AgressForm";

Agress.propTypes = {
  closeDialog: PropTypes.func,
};

function Agress(props) {
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
      enqueueSnackbar("Duyệt thành công.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <AgressForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Agress;
