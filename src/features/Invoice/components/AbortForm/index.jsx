import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./styles.scss";

AbortForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AbortForm(props) {
  const invoice = useSelector((state) => state.invoice.getData);

  const form = useForm({
    defaultValues: {
      id: invoice._id,
      status: false,
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
    <div className="abort">
      <Avatar className="abort__avatar avatarAbort">
        <ThumbDownIcon />
      </Avatar>
      <h3 className="abort__content">{`Bạn có Đồng ý hủy duyệt Hóa đơn số: ${invoice.invoiceNo}`}</h3>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack direction="row" spacing={3} mt={3} className="abort__stack">
          <Button
            className="dialogButtonAbort dialogButton"
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<ThumbDownIcon />}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress
                size={20}
                color="secondary"
                className="abort__progress"
              />
            ) : (
              "Duyệt"
            )}
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default AbortForm;
