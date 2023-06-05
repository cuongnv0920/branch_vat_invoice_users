import { Box, Container, Grid, Paper } from "@mui/material";
import Login from "features/Auth/components/Login";
import Register from "features/Auth/components/Register";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./styles.scss";

ListPage.propTypes = {};

function ListPage(props) {
  return (
    <Box mt={4} mb={4}>
      <Container className="authListPage">
        <Grid container className="authListPage__grid">
          <Grid
            item
            xs={12}
            lg={4}
            sm={4}
            md={4}
            className="authListPage__item"
          ></Grid>
          <Grid
            item
            xs={12}
            lg={4}
            sm={12}
            md={4}
            className="authListPage__item"
          >
            <Paper elevation={2} className="authListPage__paper">
              <Tabs>
                <TabList>
                  <Tab>Đăng nhập</Tab>
                  <Tab>Đăng ký</Tab>
                </TabList>
                <TabPanel>
                  <Login className="authListPage__login" />
                </TabPanel>
                <TabPanel>
                  <Register className="authListPage__register" />
                </TabPanel>
              </Tabs>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            sm={12}
            md={4}
            className="pageAuth__item"
          ></Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
