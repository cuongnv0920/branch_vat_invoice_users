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
  className: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
};

export function InputField(props) {
  const { form, name, label, inputProps, disabled, type, className } = props;
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
            className={className}
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
