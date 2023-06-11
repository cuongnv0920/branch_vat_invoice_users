import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import "./styles.scss";

Filter.propTypes = {
  values: PropTypes.func,
};

function Filter(props) {
  const { values } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimoutRef = useRef(null);

  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (typingTimoutRef.current) {
      clearTimeout(typingTimoutRef.current);
    }

    typingTimoutRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: value,
      };

      if (values) {
        values(formValue);
      }
    }, 300);
  };

  return (
    <div className="filter">
      <Grid container spacing={3} className="filter__boxFilter">
        <Grid item xs={4} md={4} sm={4}>
          <TextField
            fullWidth
            onChange={handleSearchTermChange}
            value={searchTerm}
            label="Tìm kiếm..."
            size="small"
            name="search"
          />
        </Grid>
        <Grid item xs={4} md={4} sm={4}>
          <FormControl fullWidth disabled size="small">
            <InputLabel>Disabled</InputLabel>
            <Select label="Chọn" value="" inputProps={{ readOnly: true }}>
              <MenuItem value="">
                <em>Disabled</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} md={4} sm={4}>
          <FormControl fullWidth disabled size="small">
            <InputLabel>Disabled</InputLabel>
            <Select label="Chọn" value="" inputProps={{ readOnly: true }}>
              <MenuItem value="">
                <em>Disabled</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default Filter;
