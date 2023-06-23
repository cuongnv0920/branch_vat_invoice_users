import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import { DateField, InputField, TextareaField, UploadField } from "components";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import "./styles.scss";

CreateForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateForm(props) {
  const FILE_SIZE = 8 * 1024 * 1024;
  const SUPPORTED_FORMATS = ["application/pdf", "text/html"];
  const data = useSelector((state) => state.invoice.current?.invoice || []);
  const user = useSelector((state) => state.auth.current);
  const invoice = data[0];
  const [invoiceDate, setInvoiceDate] = useState(
    new Date(invoice?.invoiceDate) || new Date()
  );

  const schema = yup.object().shape({
    filePdf: yup
      .mixed()
      .test(
        "isRequired",
        "Vui lòng chọn tệp tin pdf hoặc html.",
        function (value) {
          return value !== "" && value !== null;
        }
      )
      .test(
        "fileSize",
        "Kích thước tệp tin không được vượt quá 8Mb.",
        function (value) {
          return value && value.size <= FILE_SIZE;
        }
      )
      .test(
        "fileFormat",
        "Vui lòng chỉ chọn tệp tin có định dạng pdf.",
        function (value) {
          return value && SUPPORTED_FORMATS.includes(value.type);
        }
      ),
    serial: yup.string().required("Vui lòng nhập Ký hiệu hóa đơn."),
    invoiceNo: yup.string().required("Vui lòng nhập Số hóa đơn."),
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
      filePdf: "",
      fileXml: invoice?.path || "",
      serial: invoice?.serial[0] || "",
      invoiceNo: invoice?.invoiceNo[0] || "",
      invoiceDate: invoiceDate,
      taxCode: invoice?.taxCode[0] || "",
      seller: invoice?.seller[0] || "",
      payment: invoice?.payment[0] || "",
      content: "",
      createdUser: user._id,
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
        <UploadField name="filePdf" label="Chọn tệp tin pdf" form={form} />
        <InputField name="serial" label="Ký hiệu hóa đơn" form={form} />
        <InputField name="invoiceNo" label="Số hóa đơn" form={form} />
        <DateField
          name="invoiceDate"
          label="Ngày hóa đơn"
          inputFormat="DD/MM/YYYY"
          value={invoiceDate}
          onChange={handleChangeInvoiceDate}
          form={form}
        />
        <InputField
          name="taxCode"
          label="Mã số thuế đơn vị cung cấp"
          form={form}
        />
        <TextareaField
          name="seller"
          placeholder="Tên đơn vị cung cấp..."
          form={form}
        />
        <TextareaField
          name="content"
          placeholder="Nội dung thanh toán..."
          form={form}
        />
        <InputField name="payment" label="Tổng số tiền" form={form} />
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
