import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./styles.scss";

DeleteForm.propTypes = {
  onSubmit: PropTypes.func,
};

function DeleteForm(props) {
  const user = useSelector((state) => state.user.getData);

  const form = useForm({
    defaultValues: {
      id: user._id,
    },
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="deleteUser">
      <Avatar className="deleteUser__avatar avatarDelete">
        <DeleteIcon />
      </Avatar>
      <h3 className="deleteUser__content">{`Bạn có chắc chắn muốn xóa Người dùng: ${user.email}`}</h3>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack direction="row" spacing={3} mt={3} className="deleteUser__stack">
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
                className="deleteUser__progress"
              />
            ) : (
              "Xóa"
            )}
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default DeleteForm;
