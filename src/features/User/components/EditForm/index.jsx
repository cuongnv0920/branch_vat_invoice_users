import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { levelApi, roomApi } from "api";
import { DateField, PasswordField, RadioField, SelectField } from "components";
import InputField from "components/InputField";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

EditForm.propTypes = {
  onSubmit: PropTypes.func,
};

function EditForm(props) {
  const [rooms, setRooms] = useState([]);
  const [levels, setLevels] = useState([]);
  const [sex, setSex] = useState("Mr");
  const [birthday, setBirthday] = useState(new Date());

  const schema = yup.object().shape({
    fullName: yup.string().required("Vui lòng nhập họ và tên người dùng."),
    email: yup
      .string()
      .required("Vui lòng nhập địa chỉ email người dùng.")
      .email("Địa chỉ email không hợp lệ."),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu người dùng.")
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
    const fetchRooms = async () => {
      const rooms = await roomApi.getAll();
      setRooms(rooms);
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchLevels = async () => {
      const levels = await levelApi.getAll();
      setLevels(levels);
    };
    fetchLevels();
  }, []);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
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
      <Avatar className="createUser__avatar avatarAdd">
        <AddCircleIcon />
      </Avatar>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={6} sm={6}>
            <InputField name="fullName" label="Họ và tên" form={form} />
          </Grid>
          <Grid item xs={6} md={6} sm={6}>
            <InputField name="email" label="Địa chỉ email" form={form} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6} md={6} sm={6}>
            <PasswordField name="password" label="Mật khẩu" form={form} />
          </Grid>
          <Grid item xs={6} md={6} sm={6}>
            <PasswordField
              name="retypePassword"
              label="Xác nhận mật khẩu"
              form={form}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6} md={6} sm={6}>
            <SelectField name="room" label="Phòng/ ban" form={form}>
              {rooms.map((room, _) => (
                <MenuItem value={room.id}>{room.name}</MenuItem>
              ))}
            </SelectField>
          </Grid>
          <Grid item xs={6} md={6} sm={6}>
            <SelectField name="level" label="Chức danh" form={form}>
              {levels.map((level, _) => (
                <MenuItem value={level.id}>{level.name}</MenuItem>
              ))}
            </SelectField>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6} md={6} sm={6}>
            <InputField
              name="phone"
              label="Số điện thoại di động"
              form={form}
            />
          </Grid>
          <Grid item xs={6} md={6} sm={6}>
            <InputField name="ext" label="Số điện thoại nội bộ" form={form} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6} md={6} sm={6}>
            <SelectField name="role" label="Nhóm quyền" form={form}>
              <MenuItem value="user">Người sử dụng</MenuItem>
              <MenuItem value="post">Đăng bài viết</MenuItem>
              <MenuItem value="margin">Biên độ tỷ giá</MenuItem>
              <MenuItem value="postAndMargin">
                Đăng bài viết & Biên độ tỷ giá
              </MenuItem>
              <MenuItem value="admin">Quản trị</MenuItem>
            </SelectField>
          </Grid>

          <Grid item xs={6} md={6} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6} sm={6} mt={1}>
                <RadioField
                  name="sex"
                  label="Giới tính"
                  onChange={handleChangeSex}
                  value={sex}
                  form={form}
                >
                  <FormControlLabel
                    value="Mr"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel value="Ms" control={<Radio />} label="Nữ" />
                </RadioField>
              </Grid>

              <Grid item xs={6} md={6} sm={6}>
                <DateField
                  name="birthday"
                  onChange={handleChangeBirtday}
                  form={form}
                  value={birthday}
                  lable="Ngày sinh nhật"
                  inputFormat="DD/MM/YYYY"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress
              color="secondary"
              className="createUser__progress"
            />
          ) : (
            "Lưu"
          )}
        </Button>
      </form>
    </div>
  );
}

export default EditForm;
