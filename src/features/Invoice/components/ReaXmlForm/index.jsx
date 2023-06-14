import { yupResolver } from "@hookform/resolvers/yup";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import SaveIcon from "@mui/icons-material/Save";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import InputField from "components/InputField";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./styles.scss";
import { UploadField } from "components";

ReadXmlFrom.propTypes = {
  onSubmit: PropTypes.func,
};

function ReadXmlFrom(props) {
  const schema = yup.object().shape({
    file_1: yup.string().required("Vui lòng đính kèm file hóa đơn .xml."),
  });

  const form = useForm({
    defaultValues: {
      file_1: "",
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
    <div className="createReadXml">
      <Avatar className="createReadXml__avatar avatarCreate">
        <MarkChatReadIcon />
      </Avatar>
      <Button>Nhập thủ công</Button>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <UploadField name="file_1" label="Chọn file hóa đơn .xml" form={form} />
        <Stack
          direction="row"
          spacing={3}
          mt={3}
          className="createReadXml__stack"
        >
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
              "Đọc file .xml"
            )}
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default ReadXmlFrom;
