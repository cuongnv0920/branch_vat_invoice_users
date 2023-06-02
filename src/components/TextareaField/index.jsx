import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Textarea from "@mui/joy/Textarea";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";

TextareaField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export function TextareaField(props) {
  const { form, name, label, disabled, placeholder } = props;
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
          margin="normal"
          variant="outlined"
          fullWidth
          error={invalid}
        >
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Textarea
            size="lg"
            minRows={2}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            disabled={disabled}
            color="neutral"
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
