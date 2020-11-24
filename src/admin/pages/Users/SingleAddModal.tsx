import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

import { Modal, Stepper, ToolTip } from '../../components';
import classNames from "classnames";
import useSharedStyles from '../../globalStyles';

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const SingleAddModal: React.FC<Props> = ({ opened, onClose }) => {
  const classes = useStyles();
  const sharedClasses = useSharedStyles();
  const [step, setStep] = useState(0);

  const onNext = () => {
    setStep(Math.min(step + 1, 2));
  };

  const onBack = () => {
    setStep(Math.max(step - 1, 0));
  };

  const renderStepContent = () => {
    if (step === 0) {
      return (
        <div className={classes.firstStep}>
          <Typography variant="h3" component="h1" className={classNames(classes.userFormTitle, classes.firstTitle)}>Create a new user</Typography>
          <Grid container spacing={3} className={classes.row}>
            <Grid item sm={6} xs={12}>
              <FormLabel className={classes.label}>First Name</FormLabel>
              <FormControl>
                <TextField type="first_name" placeholder="First Name" variant="outlined" />
              </FormControl>
            </Grid>
            <Grid sm={6} item xs={12}>
              <FormLabel className={classes.label}>Last Name</FormLabel>
              <FormControl>
                <TextField type="last_name" placeholder="Last Name" variant="outlined" />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.row}>
            <Grid item xs={12}>
              <FormLabel className={classes.label}>Email Address</FormLabel>
              <FormControl>
                <TextField type="email" placeholder="User@user.com" variant="outlined" />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    } else if (step === 1) {
      return (
        <div className={classes.secondStep}>
          <Typography variant="h3" component="h1" className={classes.userFormTitle}>Rob.dumont@tripninja.io</Typography>
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
    }

    return (
      <div className={classes.thirdStep}>
        <Typography variant="h3" component="h1" className={classes.userFormTitle}>Invite your teammate to QuickTrip</Typography>
        <Typography className={classes.teamFormDescription}>
          Sent them an invitation with everything they need to get started. Once new users are activated, they will be prorated and added to your next invoice.
        </Typography>
      </div>
    )
  };

  return (
    <Modal
      title="Add User"
      opened={opened}
      onClose={onClose}
    >
      <Stepper
        steps={["Create User", "Set Permissions", "Send Invites"]}
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
            {step < 2 ? (
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
                Send Invites
              </Button>
            )}
          </div>
        </div>
      </Stepper>
    </Modal>
  )
};

const useStyles = makeStyles({
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

  userFormTitle: {
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
    width: '70%',
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
  thirdStep: {
    textAlign: 'center',
    width: '90%',
    marginInline: 'auto'
  },
  teamFormDescription: {
    fontSize: 16,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'lighter',
    margin: '30px 0',
  },
});

export default SingleAddModal
