import "./styles.scss";
import { useForm } from "react-hook-form";
import InputField from "components/InputField";
import { Grid, MenuItem } from "@mui/material";
import { SelectField } from "components/SelectField";
import { DateField } from "components/DateField";

Filter.propTypes = {};

function Filter(props) {
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });

  return (
    <div className="filter">
      <form>
        <Grid container spacing={3}>
          <Grid item xs={4} md={4} sm={4}>
            <SelectField name="room" label="Phòng/ban" form={form}>
              <MenuItem>Phòng Quản Lý Nội Bộ</MenuItem>
              <MenuItem>Phòng Khách Hàng Doanh Nghiệp</MenuItem>
              <MenuItem>Phòng Khách Hàng Cá Nhân</MenuItem>
            </SelectField>
          </Grid>
          <Grid item xs={4} md={4} sm={4}>
            <DateField
              name="date"
              lable="Ngày hóa đơn"
              inputFormat="DD/MM/YYYY"
              form={form}
            />
          </Grid>
          <Grid item xs={4} md={4} sm={4}>
            <InputField name="search" label="Tìm kiếm..." form={form} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Filter;
