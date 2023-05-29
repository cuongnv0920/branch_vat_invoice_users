import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export function SelectField(props) {
  const { form, name, label, disabled, children, className } = props;
  const { control } = form;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <FormControl
          error={invalid}
          fullWidth
          margin="normal"
          variant="outlined"
        >
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select
            className={className}
            labelId={name}
            fullWidth
            label={label}
            name={name}
            error={error}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            value={value}
          >
            {children}
          </Select>

          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
