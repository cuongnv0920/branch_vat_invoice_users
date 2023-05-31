import { Box, Grid, Paper } from "@mui/material";
import ActionBar from "features/Invoice/components/ActionBar";
import Filter from "features/Invoice/components/Filter";
import InvoiceList from "features/Invoice/components/InvoiceList";

ListPage.propTypes = {};

function ListPage(props) {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={12} sx={{ position: "relative" }}>
          <Paper elevation={0} sx={{ position: "relative" }}>
            <Filter />
            <ActionBar />
            <InvoiceList />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ListPage;
