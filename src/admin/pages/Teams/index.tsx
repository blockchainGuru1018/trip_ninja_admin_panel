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
  Drawer,
  Modal,
  Stepper,
  ToolTip,
} from '../../components';
import { makeStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import useSharedStyles from '../../globalStyles';

const columns = [
  { field: 'team', headerName: 'Team' },
  { field: 'members', headerName: 'Members' },
  { field: 'lead', headerName: 'Team Lead' },
  { field: 'action', headerName: '' },
];

const rows = [
  { team: 'Islington Store', members: 15, lead: 'Brett Ziegler, +1', action: 35 },
];

const Teams: React.FC = () => {
  const classes = useStyles();
  const sharedClasses = useSharedStyles();
  const [modalOpened, setModalOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);
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
          <Typography variant="h3" component="h1" className={classNames(classes.teamFormTitle, classes.firstTitle)}>Create a new team</Typography>
          <Grid container spacing={3} className={classes.row}>
            <Grid item xs={12}>
              <FormLabel className={classes.label}>Team Name</FormLabel>
              <FormControl>
                <TextField type="team_name" placeholder="What should we call your team" variant="outlined" required={true} />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    } else if (step === 1) {
      return (
        <div className={classes.secondStep}>
          <Typography variant="h3" component="h1" className={classes.teamFormTitle}>Islington Store</Typography>
          <Grid container spacing={3} className={classes.row}>
            <Grid item xs={12}>
              <FormLabel className={classNames(classes.label, classes.labelWithTooltip)}>
                Inherit global default permissions
                <ToolTip
                  text='These settings can be overwritten later by team leads or account administrators.'
                >
                  <img
                    className={classes.icon}
                    src={require('../../assets/info.svg')}
                    alt="svg"
                  />
                </ToolTip>
              </FormLabel>
            </Grid>
          </Grid>
        </div>
      )
    } else if (step === 2) {
      return (
        <div className={classes.thirdStep}>
          <Typography variant="h3" component="h1" className={classes.teamFormTitle}>Islington Store</Typography>
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
        <Typography variant="h3" component="h1" className={classes.teamFormTitle}>Create a new team</Typography>
        <Typography className={classes.teamFormDescription}>
          Add users to your team immediately to get started. You can modify team or individual permissions at any time..
        </Typography>
      </div>
    )
  };

  const onFinal = () => {
    setModalOpened(false);
    setDrawerOpened(true);
  }

  return (
    <>
      <div className={sharedClasses.pageHeader}>
        <Typography variant="h3" component="h1" className={sharedClasses.pageTitle}>Teams</Typography>
        <Button variant="outlined" className={sharedClasses.btnPrimary} onClick={() => setModalOpened(true)}>Add Team</Button>
      </div>
      <Typography className={sharedClasses.pageDescription}>
        Create new teams, customize team permissions, and archive teams from your account.
      </Typography>
      <TextField
        placeholder="Search Teams"
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
        title="Add Team"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <Stepper
          steps={["Create Team", "Set Permissions", "Add Members", "Send Invites"]}
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
                  onClick={onFinal}
                >
                  Create your Team
                </Button>
              )}
            </div>
          </div>
        </Stepper>
      </Modal>

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
       >
         <Drawer.Header>Test Drawer</Drawer.Header>
         <Drawer.Body>Test Drawer</Drawer.Body>
         <Drawer.Footer className={classes.editFormButtons}>
          <Button
            variant="outlined"
            className={sharedClasses.btnPrimary}
            onClick={() => setDrawerOpened(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className={sharedClasses.btnFilled}
          >
            Save
          </Button>
         </Drawer.Footer>
      </Drawer>
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
  editFormButtons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  teamFormTitle: {
    fontSize: 24,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'lighter',
  },
  row: {
    marginTop: 30,
    marginBottom: 0
  },
  label: {
    display: 'block',
    fontSize: 16,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'bolder',
    marginBottom: 12
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
  teamFormDescription: {
    fontSize: 16,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'lighter',
    margin: '30px 0',
  },
}));

export default Teams;
