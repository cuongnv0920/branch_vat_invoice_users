import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./styles.scss";
import { InputField } from "components";

CreateForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateForm(props) {
  const schema = yup.object().shape({
    code: yup.string().required("Vui lòng nhập mã Phòng/ ban."),
    name: yup.string().required("Vui lòng nhập tên Phòng/ ban."),
    sort: yup.string().required("Vui lòng nhập Số sắp xếp thứ tự."),
  });

  const form = useForm({
    defaultValues: {
      code: "",
      name: "",
      sort: "",
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
    <div className="createRoom">
      <Avatar className="createRoom__avatar avatarCreate">
        <AddCircleIcon />
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
        <Stack direction="row" spacing={3} mt={3} className="createRoom__stack">
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
