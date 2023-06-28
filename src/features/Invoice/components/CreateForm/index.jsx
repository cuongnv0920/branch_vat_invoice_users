import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import { DateField, InputField, TextareaField, UploadField } from "components";
import validatorKeys from "configs/validatorKeysConf";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { addZeros } from "utils/addZeros";
import * as yup from "yup";
import "./styles.scss";

CreateForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateForm(props) {
  const inputStatus = useSelector((state) => state.invoice.inputStatus);
  const disabledField = !inputStatus;
  const data = useSelector((state) => state.invoice.current?.invoice || []);
  const user = useSelector((state) => state.auth.current);
  const invoice = data[0];
  const [invoiceDate, setInvoiceDate] = useState(
    invoice?.invoiceDate && new Date(invoice?.invoiceDate || new Date())
  );

  const schemaObject = {
    pdfFile: yup
      .mixed()
      .test("isRequired", "Vui lòng chọn tệp tin pdf.", function (value) {
        return value !== "" && value !== null;
      })
      .test(
        "fileSize",
        "Kích thước tệp tin không được vượt quá 8Mb.",
        function (value) {
          return value && value.size <= validatorKeys.FILE_SIZE_PDF;
        }
      )
      .test(
        "fileFormat",
        "Vui lòng chỉ chọn tệp tin có định dạng pdf.",
        function (value) {
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
  };

  if (inputStatus) {
    schemaObject.xmlFile = yup
      .mixed()
      .test("isRequired", "Vui lòng chọn tệp tin xml.", function (value) {
        return value !== "" && value !== null;
      })
      .test(
        "fileSize",
        "Kích thước tệp tin không được vượt quá 2Mb.",
        function (value) {
          return value && value.size <= validatorKeys.FILE_SIZE_XML;
        }
      )
      .test(
        "fileFormat",
        "Vui lòng chỉ chọn tệp tin có định dạng xml.",
        function (value) {
          return (
            value && validatorKeys.SUPPORTED_FORMATS_XML.includes(value.type)
          );
        }
      );
  }

  const schema = yup.object().shape(schemaObject);

  const form = useForm({
    defaultValues: {
      pdfFile: "",
      xmlFile: invoice?.xmlFile || "",
      serial: invoice?.serial[0] || "",
      invoiceNo: addZeros(invoice?.invoiceNo[0]) || "",
      invoiceDate: invoiceDate,
      taxCode: invoice?.taxCode[0] || "",
      seller: invoice?.seller[0] || "",
      payment: invoice?.payment[0] || "",
      content: "",
      createdRoom: user.room,
      createdUser: user._id,
      inputStatus: inputStatus,
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleChangeInvoiceDate = (date) => {
    setInvoiceDate(date);
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="createInvoice">
      <Avatar className="createInvoice__avatar avatarCreate">
        <AddCircleIcon />
      </Avatar>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {inputStatus && (
          <UploadField
            disabled={disabledField}
            name="xmlFile"
            label="Chọn tệp tin xml."
            form={form}
          />
        )}
        <UploadField name="pdfFile" label="Chọn tệp tin pdf." form={form} />
        <InputField
          className="createInvoice__serial"
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
