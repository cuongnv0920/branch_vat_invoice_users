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
import { useDispatch } from "react-redux";
import { inputStatus } from "features/Invoice/invoiceSlice";
import validatorKeys from "configs/validatorKeysConf";

ReadXmlFrom.propTypes = {
  onSubmit: PropTypes.func,
  openDialogCreate: PropTypes.func,
};

function ReadXmlFrom(props) {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    xmlFile: yup
      .mixed()
      .test("isRequired", "Vui lòng chọn tệp tin xml.", function (value) {
        return value !== "" && value !== null;
      })
      .test(
        "fileSize",
        "Kích thước tệp tin không được vượt quá 3Mb.",
        function (value) {
          return value && value.size <= validatorKeys.FILE_SIZE_XML;
        }
      )
      .test(
        "fileFormat",
        "Vui lòng chỉ chọn tệp tin có định dạng xml.",
        function (value) {
          return (
            value && validatorKeys.SUPPORTED_FORMATS_XML.includes(value.type)
          );
        }
      ),
  });

  const form = useForm({
    defaultValues: {
      xmlFile: "",
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
    const action = inputStatus(true);
    dispatch(action);
    openDialogCreate();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="createReadXml">
      <Avatar className="createReadXml__avatar avatarCreate">
        <MarkChatReadIcon />
      </Avatar>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <UploadField name="xmlFile" label="Chọn tệp tin xml" form={form} />
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
              "Nhập tự động"
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
