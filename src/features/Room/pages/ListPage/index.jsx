import { Box, Grid, Paper } from "@mui/material";
import ActionBar from "features/User/components/ActionBar";
import Filter from "features/User/components/Filter";
import UserList from "features/User/components/UserList";

ListPage.propTypes = {};

function ListPage(props) {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={12} sx={{ position: "relative" }}>
          <Paper elevation={1} sx={{ position: "relative" }}>
            <Filter />
            <ActionBar />
            <UserList />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ListPage;
