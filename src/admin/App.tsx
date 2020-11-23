import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';

import {
  BasicInfo,
  GeneralInfo,
  ContentSources,
  SearchBookingDetail,
  BillingAccountManagement,
  Users,
  Teams,
  AgencyAccounts,
} from "./pages";
import { Header, SideMenu } from './components';

import 'react-perfect-scrollbar/dist/css/styles.css';
import "./styles.css";

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Header />

      <div className={classes.mainContent}>
        <div className={classes.pageHeader}>
          Settings
        </div>

        <div className={classes.pageContent}>
          <SideMenu />

          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route path="/" exact component={BasicInfo} />
              <Route path="/general-info" exact component={GeneralInfo} />
              <Route path="/content-sources" exact component={ContentSources} />
              <Route path="/search-booking-detail" exact component={SearchBookingDetail} />
              <Route path="/billing-account-management" exact component={BillingAccountManagement} />
              <Route path="/users" exact component={Users} />
              <Route path="/teams" exact component={Teams} />
              <Route path="/agency-accounts" exact component={AgencyAccounts} />
            </Switch>
          </Container>
        </div>
      </div>
    </BrowserRouter>
  );
};

const useStyles = makeStyles((theme) => ({
  mainContent: {
    marginTop: 54
  },
  pageHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 47px',
    height: 90,
    fontSize: 40,
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'bold',
    color: '#45565E',
  },
  pageContent: {
    display: 'flex',
    height: `calc(100vh - ${144}px)`,
    borderTop: '1px solid #ABB3B7',
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    maxWidth: '100%',
  },
}));

export default App;
