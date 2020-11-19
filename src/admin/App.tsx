import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';

import { BasicInfo } from "./pages";
import { Header, SideMenu } from './components';

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
    padding: '0 30px',
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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

export default App;
