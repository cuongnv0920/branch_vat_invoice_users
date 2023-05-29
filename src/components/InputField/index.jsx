import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

InputField.defaultProps = {
  type: "text",
};

function InputField(props) {
  const { form, name, label, inputProps, disabled, type } = props;
  const { control } = form;

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value, name },
          fieldState: { invalid, error },
        }) => (
          <TextField
            margin="normal"
            variant="outlined"
            type={type}
            fullWidth
            label={label}
            error={invalid}
            helperText={error?.message}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            disabled={disabled}
            inputProps={inputProps}
          />
        )}
      />
    </div>
  );
}

export default InputField;
