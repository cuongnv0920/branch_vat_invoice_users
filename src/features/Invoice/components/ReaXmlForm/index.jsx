import { yupResolver } from "@hookform/resolvers/yup";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import { UploadField } from "components";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./styles.scss";

ReadXmlFrom.propTypes = {
  onSubmit: PropTypes.func,
  openDialogCreate: PropTypes.func,
};

function ReadXmlFrom(props) {
  const FILE_SIZE = 2 * 1024 * 1024;
  const SUPPORTED_FORMATS = ["text/xml"];

  const schema = yup.object().shape({
    fileXml: yup
      .mixed()
      .test("isRequired", "Vui lòng chọn tệp tin xml.", function (value) {
        return value !== "" && value !== null;
      })
      .test(
        "fileSize",
        "Kích thước tệp tin không được vượt quá 2Mb.",
        function (value) {
          return value && value.size <= FILE_SIZE;
        }
      )
      .test(
        "fileFormat",
        "Vui lòng chỉ chọn tệp tin có định dạng xml.",
        function (value) {
          return value && SUPPORTED_FORMATS.includes(value.type);
        }
      ),
  });

  const form = useForm({
    defaultValues: {
      upload: "",
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleOpenDialogCreate = () => {
    const { openDialogCreate } = props;
    openDialogCreate();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="createReadXml">
      <Avatar className="createReadXml__avatar avatarCreate">
        <MarkChatReadIcon />
      </Avatar>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <UploadField name="fileXml" label="Chọn tệp tin xml" form={form} />
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
            startIcon={<SendIcon />}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress
                size={20}
                color="secondary"
                className="createUser__progress"
              />
            ) : (
              "Gửi"
            )}
          </Button>
          <Button
            type="button"
            variant="contained"
            startIcon={<KeyboardIcon />}
            className="diglogButtonHandicraft dialogButton"
            onClick={handleOpenDialogCreate}
          >
            Nhập thủ công
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default ReadXmlFrom;
