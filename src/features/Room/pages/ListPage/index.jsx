import { Box, Grid, Paper } from "@mui/material";
import ActionBar from "features/Room/components/ActionBar";
import Filter from "features/Room/components/Filter";
import RoomList from "features/Room/components/RoomList";

ListPage.propTypes = {};

function ListPage(props) {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={12} sx={{ position: "relative" }}>
          <Paper elevation={1} sx={{ position: "relative" }}>
            <div className="titleTable">
              <h2 className="tileTableContent">Danh sách phòng/ ban</h2>
            </div>
            <Filter />
            <ActionBar />
            <RoomList />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ListPage;
