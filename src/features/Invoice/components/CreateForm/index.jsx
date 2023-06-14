import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import {
  Avatar,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  Stack,
} from "@mui/material";
import InputField from "components/InputField";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./styles.scss";
import { useEffect, useState } from "react";
import {
  DateField,
  PasswordField,
  RadioField,
  SelectField,
  UploadField,
} from "components";
import { levelApi, roomApi } from "api";

CreateForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateForm(props) {
  const [roomList, setRoomList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [sex, setSex] = useState("Mr");
  const [birthday, setBirthday] = useState(new Date());

  const schema = yup.object().shape({
    file_1: yup.string().required("Vui lòng đính kèm file hóa đơn .xml."),
    file_2: yup.string().required("Vui lòng đính kèm file hóa đơn .pdf."),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu.")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
    retypePassword: yup
      .string()
      .required("Vui lòng xác nhận lại mật khẩu.")
      .oneOf([yup.ref("password")], "Mật khẩu xác nhận không đúng."),
    room: yup.string().required("Vui phòng chọn phòng/ ban."),
    level: yup.string().required("Vui phòng chọn chức danh."),
    phone: yup.string().required("Vui phòng nhập số điện thoại di động."),
  });

  useEffect(() => {
    (async () => {
      const { roomList } = await roomApi.getAll();
      setRoomList(roomList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { levelList } = await levelApi.getAll();
      setLevelList(levelList);
    })();
  }, []);

  const form = useForm({
    defaultValues: {
      file_1: "",
      file_2: "",
      password: "",
      retypePassword: "",
      room: "",
      level: "",
      phone: "",
      ext: "",
      sex: sex,
      role: "user",
      birthday: birthday,
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

  const handleChangeBirtday = (date) => {
    setBirthday(date);
  };
  const handleChangeSex = (event) => {
    setSex(event.target.value);
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="createUser">
      <Avatar className="createUser__avatar avatarCreate">
        <AddCircleIcon />
      </Avatar>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={6}>
            <UploadField name="file_1" label="File hóa đơn .xml" form={form} />
          </Grid>
          {/* <Grid item xs={12} md={6} sm={6}>
            <UploadField name="file_2" label="File hóa đơn .pdf" form={form} />
          </Grid> */}
        </Grid>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={6}>
            <PasswordField name="password" label="Mật khẩu" form={form} />
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <PasswordField
              name="retypePassword"
              label="Xác nhận lại mật khẩu"
              form={form}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={6}>
            <SelectField name="room" label="Phòng/ ban" form={form}>
              {roomList.map((room, _) => (
                <MenuItem value={room.id}>{room.name}</MenuItem>
              ))}
            </SelectField>
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <SelectField name="level" label="Chức danh" form={form}>
              {levelList.map((level, _) => (
                <MenuItem value={level.id}>{level.name}</MenuItem>
              ))}
            </SelectField>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={6}>
            <InputField
              name="phone"
              label="Số điện thoại di động"
              form={form}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <InputField name="ext" label="Số điện thoại nội bộ" form={form} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={6} mt={1}>
            <RadioField
              name="sex"
              label="Giới tính"
              onChange={handleChangeSex}
              form={form}
            >
              <FormControlLabel value="Mr" control={<Radio />} label="Nam" />
              <FormControlLabel value="Ms" control={<Radio />} label="Nữ" />
            </RadioField>
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <DateField
              name="birthday"
              inputFormat="DD/MM/YYYY"
              value={birthday}
              onChange={handleChangeBirtday}
              label="Ngày sinh nhật"
              form={form}
            />
          </Grid>
        </Grid> */}
        <Stack direction="row" spacing={3} mt={3} className="createUser__stack">
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
                className="createUser__progress"
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
