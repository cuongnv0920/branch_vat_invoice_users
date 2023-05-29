import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

DateField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  lable: PropTypes.string,
  disabled: PropTypes.bool,
  inputFormat: PropTypes?.string,
  className: PropTypes?.string,
};

export function DateField(props) {
  const { form, name, disabled, lable, inputFormat, className } = props;
  const { control } = form;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            className={className}
            variant="inline"
            inputFormat={inputFormat}
            label={lable}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            disabled={disabled}
            renderInput={(params) => (
              <TextField margin="normal" fullWidth {...params} />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}
