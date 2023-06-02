import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, Stack } from "@mui/material";
import { DateField, TextareaField, UploadField } from "components";
import InputField from "components/InputField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./styles.scss";

CreateForm.propTypes = {};

function CreateForm(props) {
  const [disabledField, setDisabledField] = useState(true);

  const handleDisabledField = () => {
    setDisabledField(false);
  };

  const schema = yup.object().shape({
    serial: yup
      .string()
      .required("Vui lòng nhập Ký hiệu hóa đơn.")
      .min(6, "Ký hiệu hóa đơn phải có ít nhất 7 ký tự."),
    no: yup
      .string()
      .required("Vui lòng nhập Số hóa đơn.")
      .min(7, "Số hóa đơn phải có ít nhất 7 chữ số.")
      .max(8, "Số hóa đơn không được vượt quá 8 chữ số."),
    date: yup.string().required("Vui lòng chọn Ngày hóa đơn."),
    seller: yup.string().required("Vui lòng điền tên Đơn vị cung cấp."),
    payment: yup.string().required("Vui lòng điền Tổng số tiền trên hóa đơn."),
    content: yup.string().required("Vui lòng điền Nội dung thanh toán."),
  });

  const form = useForm({
    defaultValues: {
      serial: "",
      no: "",
      date: "",
      seller: "",
      payment: "",
      content: "",
    },

    resolver: yupResolver(schema),
  });

  return (
    <div className="createInvoice">
      <Stack direction="row" spacing={3} className="createInvoice__actionBar">
        <Button
          variant="contained"
          className="createInvoice__button button buttonManual"
          startIcon={<EditIcon />}
          onClick={handleDisabledField}
        >
          Nhập thủ công
        </Button>
      </Stack>

      <form className="createInvoice__form" action="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sm={12}>
            <UploadField name="xml" label="File .xml" form={form} />
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <UploadField name="pdf" label="File .pdf" form={form} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sm={12}>
            <InputField
              disabled={disabledField}
              name="serial"
              label="Ký hiệu"
              form={form}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <InputField
              disabled={disabledField}
              name="no"
              label="Số hóa đơn"
              form={form}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sm={12}>
            <DateField
              disabled={disabledField}
              className="createInvoice__dateField"
              name="date"
              label="Ngày hóa đơn"
              inputFormat="DD/MM/YYYY"
              form={form}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <InputField
              disabled={disabledField}
              name="payment"
              type="number"
              label="Số tiền thanh toán"
              form={form}
            />
          </Grid>
        </Grid>

        <TextareaField name="content" label="Nội dùng thanh toán" form={form} />

        <Button type="submit" fullWidth className="dialogButtonSave">
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default CreateForm;
