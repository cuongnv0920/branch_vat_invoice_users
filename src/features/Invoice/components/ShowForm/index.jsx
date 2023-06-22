import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import "./styles.scss";
import { levelApi, roomApi } from "api";
import {
  DateField,
  InputField,
  PasswordField,
  RadioField,
  SelectField,
} from "components";

ShowForm.propTypes = {
  onSubmit: PropTypes.func,
  openDialogDelete: PropTypes.func,
};

function ShowForm(props) {
  const { onSubmit, openDialogDelete } = props;
  const user = useSelector((state) => state.user.getData);
  const [sex, setSex] = useState(user.sex);
  const [birthday, setBirthday] = useState(user.birthday);
  const [roomList, setRoomList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [disabledField, setDisabledField] = useState(true);

  const schema = yup.object().shape({
    fullName: yup.string().required("Vui lòng nhập họ và tên."),
    email: yup
      .string()
      .required("Vui lòng nhập địa chỉ email.")
      .email("Địa chỉ email không hợp lệ."),
    retypePassword: yup
      .string()
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
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      password: "",
      retypePassword: "",
      room: user.room._id,
      level: user.level._id,
      phone: user.phone,
      ext: user.ext,
      sex: sex,
      birthday: birthday,
    },

    resolver: yupResolver(schema),
  });

  const handleChangeDisabledField = () => {
    setDisabledField(false);
  };

  const handleChangeBirtday = (date) => {
    setBirthday(date);
  };

  const handleChangeSex = (event) => {
    setSex(event.target.value);
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
    <div className="showUser">
      <Avatar className="showUser__avatar avatarShow">
        <VisibilityIcon />
      </Avatar>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={6}>
            <InputField
              disabled={disabledField}
              name="fullName"
              label="Họ và tên"
              form={form}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <InputField
              disabled={disabledField}
              name="email"
              label="Địa chỉ email"
              form={form}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={6}>
            <PasswordField
              disabled={disabledField}
              name="password"
              label="Mật khẩu"
              form={form}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <PasswordField
              disabled={disabledField}
              name="retypePassword"
              label="Xác nhận lại mật khẩu"
              form={form}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={6}>
            <SelectField
              disabled={disabledField}
              name="room"
              label="Phòng/ ban"
              form={form}
            >
              {roomList.map((room, _) => (
                <MenuItem value={room.id}>{room.name}</MenuItem>
              ))}
            </SelectField>
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <SelectField
              disabled={disabledField}
              name="level"
              label="Chức danh"
              form={form}
            >
              {levelList.map((level, _) => (
                <MenuItem value={level.id}>{level.name}</MenuItem>
              ))}
            </SelectField>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={6}>
            <InputField
              disabled={disabledField}
              name="phone"
              label="Số điện thoại di động"
              form={form}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <InputField
              disabled={disabledField}
              name="ext"
              label="Số điện thoại nội bộ"
              form={form}
            />
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
              <FormControlLabel
                disabled={disabledField}
                value="Mr"
                control={<Radio />}
                label="Nam"
              />
              <FormControlLabel
                disabled={disabledField}
                value="Ms"
                control={<Radio />}
                label="Nữ"
              />
            </RadioField>
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <DateField
              disabled={disabledField}
              name="birthday"
              inputFormat="DD/MM/YYYY"
              value={birthday}
              onChange={handleChangeBirtday}
              label="Ngày sinh nhật"
              form={form}
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={3} mt={3} className="showUser__stack">
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
                className="showUser__progress"
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
            startIcon={<EditIcon />}
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
