import { unwrapResult } from "@reduxjs/toolkit";
import { readXml } from "features/Invoice/invoiceSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import ReadXmlFrom from "../ReaXmlForm";

ReadXml.propTypes = {
  closeDialog: PropTypes.func,
};

function ReadXml(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = readXml(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const { closeDialog } = props; // close dialog
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <ReadXmlFrom onSubmit={handleSubmit} />
    </div>
  );
}

export default ReadXml;
