import { Pagination, Stack } from "@mui/material";
import PropTypes from "prop-types";
import "./styles.scss";

PaginationPage.propTypes = {
  onChange: PropTypes.func,
  count: PropTypes.number,
  page: PropTypes.number,
  item: PropTypes.string,
};

function PaginationPage(props) {
  const { onChange, count, page, item } = props;
  const handleChangePage = (event, page) => {
    if (onChange) {
      onChange(page);
    }
  };

  return (
    <div className="paginationPage">
      <Stack direction="row" spacing={3}>
        <h5 className="paginationPage__item">{`${item || 0} item`}</h5>
        <Pagination
          color="secondary"
          variant="outlined"
          count={count}
          page={page}
          onChange={handleChangePage}
        />
      </Stack>
    </div>
  );
}

export default PaginationPage;
