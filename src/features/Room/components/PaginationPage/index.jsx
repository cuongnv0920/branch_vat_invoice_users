import { Pagination, Stack } from "@mui/material";
import PropTypes from "prop-types";

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
    <Stack direction="row" spacing={3}>
      <h5>{`${item} item`}</h5>
      <Pagination
        color="primary"
        variant="outlined"
        count={count}
        page={page}
        onChange={handleChangePage}
      />
    </Stack>
  );
}

export default PaginationPage;
