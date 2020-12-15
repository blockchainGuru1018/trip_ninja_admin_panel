import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import {
  Login,
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

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('authInfo') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }
  />
);

const PublicRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('authInfo') ? (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const App: React.FC = () => {
  const classes = useStyles();
  const authInfo = localStorage.getItem('authInfo');
  let user = null;
  if (authInfo) {
    user = JSON.parse(authInfo);
  }

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/login" exact component={Login} />

        <React.Fragment>
          <Header />

          <div className={classes.mainContent}>
            <div className={classes.pageHeader}>
              Settings
            </div>

            <div className={classes.pageContent}>
              <SideMenu />

              <Container maxWidth="lg" className={classes.container}>
                <Switch>
                  <PrivateRoute path="/" exact component={BasicInfo} />
                  {user && user.user && !user.user.is_agent && (
                    <>
                      <PrivateRoute path="/general-info" exact component={GeneralInfo} />
                      <PrivateRoute path="/content-sources" exact component={ContentSources} />
                      <PrivateRoute path="/search-booking-detail" exact component={SearchBookingDetail} />
                      <PrivateRoute path="/billing-account-management" exact component={BillingAccountManagement} />
                      <PrivateRoute path="/users" exact component={Users} />
                      <PrivateRoute path="/teams" exact component={Teams} />
                      <PrivateRoute path="/agency-accounts" exact component={AgencyAccounts} />
                    </>
                  )}
                </Switch>
              </Container>
            </div>
          </div>a
        </React.Fragment>
      </Switch>
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
    height: `calc(100vh - ${145}px)`,
    borderTop: '1px solid #ABB3B7',
  },
  container: {
    padding: '24px 48px',
    maxWidth: '100%',
    overflow: 'auto'
  },
}));

export default App;
