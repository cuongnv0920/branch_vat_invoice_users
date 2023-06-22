import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import { InputField, UploadField } from "components";
import storageKeys from "configs/storageKeysConf";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./styles.scss";

CreateForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateForm(props) {
  const fileSize = 8 * 1024 * 1024;
  const supportedFormats = ["text/xml"];
  const getItem = localStorage.getItem(storageKeys.READXML);
  const invoice = JSON.parse(getItem);
  const { serial, invoiceNo, invoiceDate } = invoice[0];

  const schema = yup.object().shape({
    filePdf: yup
      .mixed()
      .required("Vui lòng chọn tệp tin pdf.")
      .test(
        "fileSize",
        "Kích thước tệp tin không được vượt quá 8Mb.",
        (value) => value && value.size <= fileSize
      )
      .test(
        "fileFormat",
        "Vui lòng chỉ chọn tệp tin có định dạng pdf.",
        (value) => value && supportedFormats.includes(value.type)
      ),
  });

  const form = useForm({
    defaultValues: {
      filePdf: "",
      serial: serial[0],
      invoiceNo: invoiceNo[0],
      invoiceDate: invoiceDate[0],
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="createInvoice">
      <Avatar className="createInvoice__avatar avatarCreate">
        <AddCircleIcon />
      </Avatar>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <UploadField name="filePdf" label="Chọn tệp tin pdf" form={form} />
        <InputField name="serial" label="Ký hiệu hóa đơn" form={form} />
        <InputField name="invoiceNo" label="Số hóa đơn" form={form} />
        <InputField name="invoiceDate" label="Ngày hóa đơn" form={form} />
        <Stack
          direction="row"
          spacing={3}
          mt={3}
          className="createInvoice__stack"
        >
          <Button
            className="dialogButtonSave dialogButton"
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<SaveIcon />}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress
                size={20}
                color="secondary"
                className="createInvoice__progress"
              />
            ) : (
              "Lưu"
            )}
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default CreateForm;
