import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./styles.scss";
import InputField from "components/InputField";
import { useSelector } from "react-redux";

CreateForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateForm(props) {
  const room = useSelector((state) => state.room.get);
  const schema = yup.object().shape({
    code: yup.string().required("Vui lòng nhập mã Phòng/ ban."),
    name: yup.string().required("Vui lòng nhập tên Phòng/ ban."),
    sort: yup.string().required("Vui lòng nhập Số sắp xếp thứ tự."),
  });

  const form = useForm({
    defaultValues: {
      id: room._id,
      code: room.code,
      name: room.name,
      sort: room.sort,
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="editRoom">
      <Avatar className="editRoom__avatar avatarEdit">
        <EditIcon />
      </Avatar>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="code" label="Mã phòng/ ban" form={form} />
        <InputField name="name" label="Tên phòng/ ban" form={form} />
        <InputField
          name="sort"
          label="Số sắp xếp thứ tự"
          type="number"
          form={form}
        />
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
              className="editUser__progress"
            />
          ) : (
            "Lưu"
          )}
        </Button>
      </form>
    </div>
  );
}

export default CreateForm;
