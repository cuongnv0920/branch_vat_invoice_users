import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import "./styles.scss";
import { InputField } from "components";

ShowForm.propTypes = {
  onSubmit: PropTypes.func,
};

function ShowForm(props) {
  const room = useSelector((state) => state.room.getData);
  const { _id: id, code, name, sort } = room;
  const [disabledField, setDisabledField] = useState(true);
  const schema = yup.object().shape({
    code: yup.string().required("Vui lòng nhập mã Phòng/ ban."),
    name: yup.string().required("Vui lòng nhập tên Phòng/ ban."),
    sort: yup.string().required("Vui lòng nhập Số sắp xếp thứ tự."),
  });

  const form = useForm({
    defaultValues: {
      id,
      code,
      name,
      sort,
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleChangeDisabledField = () => {
    setDisabledField(false);
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="showRoom">
      <Avatar className="showRoom__avatar avatarShow">
        <VisibilityIcon />
      </Avatar>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          disabled={disabledField}
          name="code"
          label="Mã phòng/ ban"
          form={form}
        />
        <InputField
          disabled={disabledField}
          name="name"
          label="Tên phòng/ ban"
          form={form}
        />
        <InputField
          disabled={disabledField}
          name="sort"
          label="Số sắp xếp thứ tự"
          type="number"
          form={form}
        />
        <Stack direction="row" spacing={3} mt={3} className="showRoom__stack">
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
        </Stack>
      </form>
    </div>
  );
}

export default ShowForm;
