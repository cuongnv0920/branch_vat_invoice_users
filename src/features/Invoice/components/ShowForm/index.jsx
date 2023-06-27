import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import { DateField, InputField, TextareaField, UploadField } from "components";
import validatorKeys from "configs/validatorKeysConf";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import "./styles.scss";

ShowForm.propTypes = {
  onSubmit: PropTypes.func,
  openDialogDelete: PropTypes.func,
};

function ShowForm(props) {
  const { onSubmit, openDialogDelete } = props;
  const invoice = useSelector((state) => state.invoice.getData);
  const [disabledField, setDisabledField] = useState(true);
  const [invoiceDate, setInvoiceDate] = useState(
    new Date(invoice?.invoiceDate)
  );

  const schema = yup.object().shape({
    xmlFile: yup
      .mixed()
      .test(
        "fileSize",
        "Kích thước tệp tin không được vượt quá 2Mb.",
        function (value) {
          if (!value) return true;
          return value && value.size <= validatorKeys.FILE_SIZE_XML;
        }
      )
      .test(
        "fileFormat",
        "Vui lòng chỉ chọn tệp tin có định dạng xml.",
        function (value) {
          if (!value) return true;
          return (
            value && validatorKeys.SUPPORTED_FORMATS_XML.includes(value.type)
          );
        }
      ),
    pdfFile: yup
      .mixed()
      .test(
        "fileSize",
        "Kích thước tệp tin không được vượt quá 8Mb.",
        function (value) {
          if (!value) return true;
          return value && value.size <= validatorKeys.FILE_SIZE_PDF;
        }
      )
      .test(
        "fileFormat",
        "Vui lòng chỉ chọn tệp tin có định dạng pdf.",
        function (value) {
          if (!value) return true;
          return (
            value && validatorKeys.SUPPORTED_FORMATS_PDF.includes(value.type)
          );
        }
      ),
    serial: yup.string().required("Vui lòng nhập Ký hiệu hóa đơn."),
    invoiceNo: yup
      .string()
      .required("Vui lòng nhập Số hóa đơn.")
      .min(8, "Số hóa đơn không được nhỏ hơn 8 ký tự.")
      .max(8, "Số hóa đơn không được lớn hơn 8 ký tự."),
    invoiceDate: yup.string().required("Vui lòng chọn Ngày xuất hóa đơn."),
    taxCode: yup
      .string()
      .required("Vui lòng nhập Mã số thuế của đơn vị cung cấp."),
    seller: yup.string().required("Vui lòng nhập Tên đơn vị cung cấp."),
    payment: yup.string().required("Vui lòng nhập tổng số tiền trên hóa đơn."),
    content: yup.string().required("Vui lòng nhập nội dung thanh toán."),
  });

  const form = useForm({
    defaultValues: {
      id: invoice._id,
      pdfFile: "",
      xmlFile: "",
      serial: invoice?.serial,
      invoiceNo: invoice?.invoiceNo,
      invoiceDate: invoiceDate,
      taxCode: invoice?.taxCode,
      seller: invoice?.seller,
      payment: invoice?.payment,
      content: invoice?.content,
    },

    resolver: yupResolver(schema),
  });

  const handleChangeDisabledField = () => {
    setDisabledField(false);
  };
  const handleChangeInvoiceDate = (date) => {
    setInvoiceDate(date);
  };

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleOpenDialogDelete = () => {
    if (openDialogDelete) {
      openDialogDelete(true);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="showInvoice">
      <Avatar className="showInvoice__avatar avatarShow">
        <VisibilityIcon />
      </Avatar>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <UploadField
          disabled={disabledField}
          name="xmlFile"
          label="Chọn tệp tin xml."
          form={form}
        />

        <UploadField
          disabled={disabledField}
          name="pdfFile"
          label="Chọn tệp tin pdf."
          form={form}
        />
        <InputField
          className="showInvoice__serial"
          disabled={disabledField}
          name="serial"
          label="Ký hiệu hóa đơn."
          form={form}
        />
        <InputField
          disabled={disabledField}
          name="invoiceNo"
          label="Số hóa đơn."
          form={form}
        />
        <DateField
          disabled={disabledField}
          name="invoiceDate"
          lable="Ngày hóa đơn."
          inputFormat="DD/MM/YYYY"
          value={invoiceDate}
          onChange={handleChangeInvoiceDate}
          form={form}
        />
        <InputField
          disabled={disabledField}
          name="taxCode"
          label="Mã số thuế đơn vị cung cấp."
          form={form}
        />
        <TextareaField
          disabled={disabledField}
          name="seller"
          placeholder="Tên đơn vị cung cấp..."
          form={form}
        />
        <TextareaField
          disabled={disabledField}
          name="content"
          placeholder="Nội dung thanh toán..."
          form={form}
        />
        <InputField
          disabled={disabledField}
          name="payment"
          label="Tổng số tiền."
          form={form}
        />
        <Stack
          direction="row"
          spacing={3}
          mt={3}
          className="showInvoice__stack"
        >
          <Button
            className="dialogButtonSave dialogButton"
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={disabledField ? disabledField : isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress
                size={20}
                color="secondary"
                className="showInvoice__progress"
              />
            ) : (
              "Lưu"
            )}
          </Button>
          <Button
            type="button"
            variant="contained"
            startIcon={<EditIcon />}
            className="dialogButtonEdit dialogButton"
            onClick={handleChangeDisabledField}
          >
            Sửa
          </Button>
          <Button
            type="button"
            variant="contained"
            startIcon={<DeleteIcon />}
            className="dialogButtonDelete dialogButton"
            onClick={handleOpenDialogDelete}
          >
            Xóa
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default ShowForm;
