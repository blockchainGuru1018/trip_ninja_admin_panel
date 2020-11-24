import React, { useState } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  Grid,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";

import {
  DataTable,
  Modal,
  Stepper
} from '../../components';
import { makeStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import useSharedStyles from '../../globalStyles';

const columns = [
  { field: 'accountName', headerName: 'Account Name' },
  { field: 'numberOfUsers', headerName: 'Number of Users' },
  { field: 'dataSource', headerName: 'Data Source' },
  { field: 'status', headerName: 'Status' },
  { field: 'action', headerName: '' },
];

const rows = [
  { accountName: 'Company', numberOfUsers: 1500, dataSource: 'Travelport, +1', status: 'Active', action: 35 },
  { accountName: 'Company', numberOfUsers: 1400, dataSource: 'Amadeus, +2', status: 'Archived', action: 35 },
];

const AgencyAccounts: React.FC = () => {
  const classes = useStyles();
  const sharedClasses = useSharedStyles();
  const [modalOpened, setModalOpened] = useState(false);
  const [step, setStep] = useState(0);

  const onNext = () => {
    setStep(Math.min(step + 1, 3));
  };

  const onBack = () => {
    setStep(Math.max(step - 1, 0));
  };

  const renderStepContent = () => {
    if (step === 0) {
      return (
        <div className={classes.firstStep}>
          <Typography variant="h3" component="h1" className={classNames(classes.agencyFormTitle, classes.firstTitle)}>Create a new agency</Typography>
          <Grid container spacing={3} className={classes.row}>
            <Grid item xs={12}>
              <FormLabel className={classes.label}>Agency Name</FormLabel>
              <FormControl>
                <TextField type="agency_name" placeholder="What should we call your agency" variant="outlined" />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    } else if (step === 1) {
      return (
        <div className={classes.secondStep}>
          <Grid container spacing={3} className={classes.row}>
            <Grid item sm={6} xs={12}>
              <FormLabel className={classes.label}>API Username</FormLabel>
              <FormControl>
                <TextField type="agency_name" placeholder="API Username" variant="outlined" />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormLabel className={classes.label}>API Password</FormLabel>
              <FormControl>
                <TextField type="agency_name" placeholder="API Password" variant="outlined" />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    } else if (step === 2) {
      return (
        <div className={classes.thirdStep}>
          <Typography variant="h3" component="h1" className={classes.agencyFormTitle}>Islington Store</Typography>
          <Grid container spacing={3} className={classes.row}>
            <Grid item sm={6} xs={12}>
              <FormLabel className={classes.label}>Add Team Members</FormLabel>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormLabel className={classes.label}>Add Team Lead(s)</FormLabel>
            </Grid>
          </Grid>
        </div>
      )
    }
    return (
      <div className={classes.fourthStep}>
        <Typography variant="h3" component="h1" className={classes.agencyFormTitle}>Create your Agency</Typography>
        <Typography className={classes.agencyFormDescription}>
          Once your agency is created it can be edited or archived anytime from the overview panel.
        </Typography>
      </div>
    )
  };

  return (
    <>
      <div className={sharedClasses.pageHeader}>
        <Typography variant="h3" component="h1" className={sharedClasses.pageTitle}>Agency Accounts</Typography>
        <Button variant="outlined" className={sharedClasses.btnPrimary} onClick={() => setModalOpened(true)}>Add Agency account</Button>
      </div>
      <Typography className={sharedClasses.pageDescription}>
        Add, edit, and remove available agency accounts.
      </Typography>
      <TextField
        placeholder="Search agency account name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          )
        }}
        variant="outlined"
      />

      <Typography className={sharedClasses.dataTableTotal}>Teams: { rows ? rows.length : 0 }</Typography>
      <DataTable className={classes.table} rows={rows} columns={columns} />

      <Modal
        title="Add Agency"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <Stepper
          steps={["Create Agency", "Set API Creds", "Add Data Sources", "Finalize Settings"]}
          activeStep={step}
        >
          <form className={classes.stepperContent}>
            <div className={classes.stepperContentInner}>
              {renderStepContent()}
            </div>
          </form>
          <div className={classes.stepperActions}>
            <div className={classes.stepperActionsInner}>
              {step > 0 && (
                <Button
                  variant="outlined"
                  className={sharedClasses.btnPrimary}
                  style={{ marginRight: 'auto' }}
                  onClick={onBack}
                >
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  variant="contained"
                  className={sharedClasses.btnFilled}
                  style={{ marginLeft: 'auto' }}
                  onClick={onNext}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={sharedClasses.btnFilled}
                  style={{ marginLeft: 'auto' }}
                  onClick={onNext}
                >
                  Create Agency
                </Button>
              )}
            </div>
          </div>
        </Stepper>
      </Modal>
    </>
  )
};

const useStyles = makeStyles(() => ({
  table: {
    marginTop: 15
  },
  stepperContent: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 15px',
    borderTop: '1px solid #CACDD6',
  },
  stepperContentInner: {
    width: '100%',
    maxWidth: 600
  },
  stepTitle: {
    fontSize: 24,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
  },
  stepperActions: {
    display: 'flex',
    justifyContent: 'center',
    borderTop: '1px solid #CACDD6',
    padding: '25px 15px'
  },
  stepperActionsInner: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 600
  },
  label: {
    display: 'block',
    fontSize: 16,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'bolder',
    marginBottom: 12
  },
  agencyFormTitle: {
    fontSize: 24,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'lighter',
  },
  row: {
    marginTop: 30,
    marginBottom: 0
  },
  firstStep: {
    width: '40%',
    margin: 'auto'
  },
  firstTitle: {
    textAlign: 'center'
  },
  secondStep: {},
  labelWithTooltip: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    display: 'flex',
    cursor: 'pointer',
    width: 15,
    marginLeft: 15
  },
  thirdStep: {},
  fourthStep: {
    textAlign: 'center',
    width: '70%',
    marginInline: 'auto'
  },
  agencyFormDescription: {
    fontSize: 16,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'lighter',
    margin: '30px 0',
  },
}));

export default AgencyAccounts;
