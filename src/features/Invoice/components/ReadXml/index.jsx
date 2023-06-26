import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import ReadXmlFrom from "../ReaXmlForm";
import { inputStatus, xmlRead } from "features/Invoice/invoiceSlice";

ReadXml.propTypes = {
  closeDialog: PropTypes.func,
  openDialogCreate: PropTypes.func,
};

function ReadXml(props) {
  const { closeDialog, openDialogCreate } = props;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = xmlRead(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      if (closeDialog) {
        closeDialog();

        const action = inputStatus(false); // update false input status
        dispatch(action);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const handleOpenDialogCreate = () => {
    if (openDialogCreate) {
      openDialogCreate();
    }
  };

  return (
    <div>
      <ReadXmlFrom
        onSubmit={handleSubmit}
        openDialogCreate={handleOpenDialogCreate}
      />
    </div>
  );
}

export default ReadXml;
