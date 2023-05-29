import { Box, Grid, Paper } from "@mui/material";
import Filter from "features/Invoice/components/Filter";
import InvoiceList from "features/Invoice/components/InvoiceList";

ListPage.propTypes = {};

function ListPage(props) {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Paper elevation={0}>
            <Filter />
            <InvoiceList />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ListPage;
