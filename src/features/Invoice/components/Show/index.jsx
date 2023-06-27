import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import ShowForm from "../ShowForm";
import { edit } from "features/Invoice/invoiceSlice";

Show.propTypes = {
  closeDialog: PropTypes.func,
  openDialogDelete: PropTypes.func,
};

function Show(props) {
  const { closeDialog, openDialogDelete } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = edit(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar("Cập nhật thành công.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const handleOpenDialogDelete = () => {
    openDialogDelete();
  };

  return (
    <div>
      <ShowForm
        onSubmit={handleSubmit}
        openDialogDelete={handleOpenDialogDelete}
      />
    </div>
  );
}

export default Show;
