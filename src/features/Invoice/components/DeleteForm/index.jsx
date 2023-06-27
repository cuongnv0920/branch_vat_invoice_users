import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./styles.scss";

DeleteForm.propTypes = {
  onSubmit: PropTypes.func,
};

function DeleteForm(props) {
  const invoice = useSelector((state) => state.invoice.getData);

  const form = useForm({
    defaultValues: {
      id: invoice._id,
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
    <div className="deleteInvoice">
      <Avatar className="deleteInvoice__avatar avatarDelete">
        <DeleteIcon />
      </Avatar>
      <h3 className="deleteInvoice__content">{`Bạn có chắc chắn muốn xóa Hóa đơn số: ${invoice.taxCode}`}</h3>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack
          direction="row"
          spacing={3}
          mt={3}
          className="deleteInvoice__stack"
        >
          <Button
            className="dialogButtonSave dialogButton"
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<DeleteIcon />}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress
                size={20}
                color="secondary"
                className="deleteInvoice__progress"
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
