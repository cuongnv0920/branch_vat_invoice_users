import { FormLabel, RadioGroup } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

RadioField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export function RadioField(props) {
  const { form, name, label, children } = props;
  const { control } = form;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { invalid, error },
      }) => (
        <>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            name={name}
            row
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            {children}
          </RadioGroup>
        </>
      )}
    />
  );
}
