import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, InputAdornment, Typography } from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";

import { DataTable, Drawer, Modal, Stepper } from '../../components';
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
  }

  const onBack = () => {
    setStep(Math.max(step - 1, 0));
  }

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

      <Typography className={classes.total}>Teams: { rows ? rows.length : 0 }</Typography>
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
              <Typography variant="h3" component="h1" className={classes.stepTitle}>Step {step + 1}</Typography>
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
  total: {
    fontSize: 18,
    color: '#45565E',
    marginTop: 30
  },
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
  }
}));

export default Teams;
