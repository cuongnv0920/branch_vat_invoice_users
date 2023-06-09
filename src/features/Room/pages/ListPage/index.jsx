import { Box, Grid, Paper } from "@mui/material";
import ActionBar from "features/Room/components/ActionBar";
import Filter from "features/Room/components/Filter";
import PaginationPage from "features/Room/components/PaginationPage";
import RoomList from "features/Room/components/RoomList";
import { useState } from "react";

ListPage.propTypes = {};

function ListPage(props) {
  const [pagination, setPagination] = useState({
    limit: 2,
    count: 2,
    page: 1,
  });
  const [filters, setFilter] = useState({
    _page: 1,
    _count: 2,
  });

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Paper elevation={1}>
            <div className="titleTable">
              <h2 className="tileTableContent">Danh sách phòng/ ban</h2>
            </div>
            <Filter />
            <ActionBar />
            <RoomList />
            <PaginationPage />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ListPage;
