import { Grid } from "@mui/material";
import InputField from "components/InputField";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useForm } from "react-hook-form";
import "./styles.scss";
import { useRef, useState } from "react";
import { filter } from "features/Room/roomSlice";
import { useDispatch } from "react-redux";

Filter.propTypes = {};

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  margin: "0px 5px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Filter(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimoutRef = useRef(null);
  const dispatch = useDispatch();

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
      const action = filter({
        value: formValue,
      });
      dispatch(action);
    }, 300);
  };

  return (
    <div className="filter">
      <Grid container spacing={3}>
        <Grid item xs={4} md={4} sm={4}></Grid>
        <Grid item xs={4} md={4} sm={4}></Grid>
        <Grid item xs={4} md={4} sm={4}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm..."
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchTermChange}
              value={searchTerm}
            />
          </Search>
        </Grid>
      </Grid>
    </div>
  );
}

export default Filter;
