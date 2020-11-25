import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import PropTypes from "prop-types";

import {
  Modal,
  Drawer,
  Stepper,
  ToolTip,
  UsernameField,
} from '../../components';

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const SingleAddModal: React.FC<Props> = ({ opened, onClose }) => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [step, setStep] = useState(0);

  const onNext = () => {
    setStep(Math.min(step + 1, 2));
  };

  const onBack = () => {
    setStep(Math.max(step - 1, 0));
  };

  const onFinal = () => {
    onClose();
    setDrawerOpened(true);
  };

  const renderStepContent = () => {
    if (step === 0) {
      return (
        <div className="first_step">
          <Typography variant="h3" component="h1" className="user-form-title first-title">Create a new user</Typography>
          <Grid container spacing={3} className="row">
            <Grid item sm={6} xs={12}>
              <FormLabel className="label">First Name</FormLabel>
              <FormControl>
                <TextField type="first_name" placeholder="First Name" variant="outlined" />
              </FormControl>
            </Grid>
            <Grid sm={6} item xs={12}>
              <FormLabel className="label">Last Name</FormLabel>
              <FormControl>
                <TextField type="last_name" placeholder="Last Name" variant="outlined" />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} className="row">
            <Grid item xs={12}>
              <FormLabel className="label">Email Address</FormLabel>
              <FormControl>
                <TextField type="email" placeholder="User@user.com" variant="outlined" />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    } else if (step === 1) {
      return (
        <div className="second-step">
          <Typography variant="h3" component="h1" className="user-form-title">Rob.dumont@tripninja.io</Typography>
          <Grid container spacing={3} className="row">
            <Grid item xs={12}>
              <FormLabel className="label label-with-tooltip">
                Inherit global default permissions
                <ToolTip
                  text='These settings can be overwritten later by team leads or account administrators.'
                >
                  <img
                    className="icon"
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
      <div className="third-step">
        <Typography variant="h3" component="h1" className="user-form-title">Invite your teammate to QuickTrip</Typography>
        <Typography className="team-form-description">
          Sent them an invitation with everything they need to get started. Once new users are activated, they will be prorated and added to your next invoice.
        </Typography>
      </div>
    )
  };

  return (
    <>
      <Modal
        className="user__Page__singleAdd__modal"
        title="Add User"
        opened={opened}
        onClose={onClose}
      >
        <Stepper
          steps={["Create User", "Set Permissions", "Send Invites"]}
          activeStep={step}
        >
          <form className="stepper-content">
            <div className="stepper-content-inner">
              {renderStepContent()}
            </div>
          </form>
          <div className="stepper-actions">
            <div className="stepper-actions-inner">
              {step > 0 && (
                <Button
                  variant="outlined"
                  className="btn-primary"
                  style={{ marginRight: 'auto' }}
                  onClick={onBack}
                >
                  Back
                </Button>
              )}
              {step < 2 ? (
                <Button
                  variant="contained"
                  className="btn-filled"
                  style={{ marginLeft: 'auto' }}
                  onClick={onNext}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="btn-filled"
                  style={{ marginLeft: 'auto' }}
                  onClick={onFinal}
                >
                  Send Invites
                </Button>
              )}
            </div>
          </div>
        </Stepper>
      </Modal>

      <Drawer
        className="user__Page__singleAdd__modal"
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
      >
        <Drawer.Header>
          <UsernameField value="Bob Jones" onChange={console.log} />
        </Drawer.Header>
        <Drawer.Body>
          <Grid container spacing={3} className="page-row">
            <Grid item sm={6} xs={12}>
              <FormLabel className="radio-label">Email Address</FormLabel>
              <FormControl>
                <TextField type="email" placeholder="email@email.com" variant="outlined" />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormLabel className="radio-label">Phone Number</FormLabel>
              <FormControl className="phone-input-field">
                <TextField className="country-code-input" placeholder="XXX" variant="outlined" />
                <TextField className="phone-number-input" placeholder="XXX" variant="outlined" />
              </FormControl>
            </Grid>
          </Grid>
        </Drawer.Body>
        <Drawer.Footer className="edit-form-buttons">
          <Button
            variant="outlined"
            className="btn-primary"
            onClick={() => setDrawerOpened(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="btn-filled"
            onClick={() => setDrawerOpened(false)}
          >
            Save
          </Button>
        </Drawer.Footer>
      </Drawer>
    </>
  )
};

export default SingleAddModal
