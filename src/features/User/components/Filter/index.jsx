import { Grid } from "@mui/material";
import InputField from "components/InputField";
import { useForm } from "react-hook-form";
import "./styles.scss";

Filter.propTypes = {};

function Filter(props) {
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });

  return (
    <div className="filter">
      <form className="filter__form">
        <Grid container spacing={3}>
          <Grid item xs={4} md={4} sm={4}></Grid>
          <Grid item xs={4} md={4} sm={4}></Grid>
          <Grid item xs={4} md={4} sm={4}>
            <InputField name="search" label="Tìm kiếm..." form={form} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Filter;
