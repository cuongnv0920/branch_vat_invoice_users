import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./styles.scss";

AgressForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AgressForm(props) {
  const invoice = useSelector((state) => state.invoice.getData);
  const user = useSelector((state) => state.auth.current);

  const form = useForm({
    defaultValues: {
      id: invoice._id,
      status: true,
      approvedUser: user._id,
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
    <div className="agress">
      <Avatar className="agress__avatar avatarAgress">
        <ThumbUpAltIcon />
      </Avatar>
      <h3 className="agress__content">
        {"Duyệt Hóa đơn số: " + invoice.invoiceNo}
      </h3>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack direction="row" spacing={3} mt={3} className="agress__stack">
          <Button
            className="dialogButtonAgress dialogButton"
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<ThumbUpAltIcon />}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress
                size={20}
                color="secondary"
                className="agress__progress"
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

export default AgressForm;
