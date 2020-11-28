import React, { useState } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Button,
  TextField,
  Typography,
  Grid,
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import PropTypes from "prop-types";

import {
  Modal,
  Drawer,
  Stepper,
  ToolTip,
  UsernameField,
  Switch,
  Tabs
} from '../../components';

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const BulkAddModal: React.FC<Props> = ({ opened, onClose }) => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [resetModalOpened, setResetModalOpened] = useState(false);
  const [step, setStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const onNext = () => {
    setStep(Math.min(step + 1, 3));
  };

  const onBack = () => {
    setStep(Math.max(step - 1, 0));
  };

  const openDrawer = () => {
    onClose();
    setDrawerOpened(true);
  };

  const openReset = () => {
    setDrawerOpened(false);
    setResetModalOpened(true);
  };

  const renderStepContent = () => {
    if (step === 0) {
      return (
        <>
          <div className="first-step">
            <Typography variant="h3" component="h1" className="user-form-title">Bulk Add Users</Typography>
            <Typography className="team-form-description">
              Add new users to your QuickTrip account
            </Typography>
            <Grid container spacing={3} className="row">
              <Grid item xs={12}>
                <FormLabel className="label label-with-tooltip">
                  Email Address
                  <ToolTip
                    text='Adding more than one user? Separate users with a space.'
                  >
                    <img
                      className="icon"
                      src={require('../../assets/info.svg')}
                      alt="svg"
                    />
                  </ToolTip>
                </FormLabel>
                <FormControl>
                  <TextField type="email" placeholder="Agent emails" variant="outlined" />
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </>
      )
    } else if (step === 1) {
      return (
        <div className="second-step">
          <Typography variant="h3" component="h1" className="second-title">Set Users Team</Typography>
          <Grid container spacing={3} className="row">
            <Grid item xs={12}>
              <Typography variant="h3" component="h1" className="user-form-content">
                Rod.dumont@tripninja.io | bob.jones@tripninja.io | Rob.dumont@tripninja.io |
                Rod.dumont@tripninja.io | bob.jones@tripninja.io | Rob.dumont@tripninja.io |
                Rod.dumont@tripninja.io | bob.jones@tripninja.io | Rob.dumont@tripninja.io |
                Rod.dumont@tripninja.io | bob.jones@tripninja.io | Rob.dumont@tripninja.io
              </Typography>
            </Grid>
          </Grid>
        </div>
      )
    } else if (step === 2) {
      return (
        <div className="third-step">
          <Typography variant="h3" component="h1" className="user-form-title">Multiple Users</Typography>
          <Grid container spacing={3} className="row">
            <Grid item xs={12}>
              <FormLabel className="label" style={{ alignItems: 'center' }}>
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
                <Switch inputProps={{ 'aria-label': 'primary checkbox' }} className="custom-switch" />
              </FormLabel>
            </Grid>
            <Grid item xs={12}>
              <Tabs value={0} tabs={["Booking"]} />
              <div className="tab-content">
                <FormLabel className="radio-label">Agents can create PNRs?</FormLabel>
                <FormControl>
                  <RadioGroup name="date" row defaultValue="Enabled">
                    <FormControlLabel
                      className="radio-radio"
                      value="Enabled"
                      control={<Radio color="default" />}
                      label="Enabled"
                    />
                    <FormControlLabel
                      className="radio-radio"
                      value="Disabled"
                      control={<Radio color="default" />}
                      label="Disabled"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>
          </Grid>
        </div>
      )
    }

    return (
      <div className="fourth-step">
        <Typography variant="h3" component="h1" className="fourth-title">Invite your teammate to QuickTrip</Typography>
        <Typography className="team-form-description">
          Sent them an invitation with everything they need to get started. Once new users are activated, they will be prorated and added to your next invoice.
        </Typography>
      </div>
    )
  };

  return (
    <>
      <Modal
        className="user__Page__bulkAdd__modal"
        title="Bulk Add Users"
        opened={opened}
        onClose={onClose}
      >
        <Stepper
          steps={["Create User", "Set Team", "Set Permissions", "Send Invite"]}
          activeStep={step}
        >
          <PerfectScrollbar className="stepper-content">
            {renderStepContent()}
          </PerfectScrollbar>
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
              {step < 3 ? (
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
                  onClick={openDrawer}
                >
                  Send Invites
                </Button>
              )}
            </div>
          </div>
        </Stepper>
      </Modal>
      <Drawer
        className="user__Page__bulkAdd__drawer"
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
      >
        <Drawer.Header>
          <UsernameField value="Bob Jones" onChange={console.log} />
        </Drawer.Header>
        <Drawer.Body className="user__Page__bulkAdd__drawer__body">
          <Grid item xs={12}>
            <Tabs value={activeTab} tabs={["Personal Info", "Booking"]} onChange={(event: React.ChangeEvent<{}>, newValue: any) => setActiveTab(newValue)} />
            {activeTab === 0 ? (
              <div className="tab-content">
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
              </div>
            ) : (
              <div className="tab-content" style={{ display:"block" }}>
                <FormLabel className="radio-label">Agents can create PNRs?</FormLabel>
                <FormControl>
                  <RadioGroup name="date" row defaultValue="Enabled">
                    <FormControlLabel
                      className="radio-radio"
                      value="Enabled"
                      control={<Radio color="default" />}
                      label="Enabled"
                    />
                    <FormControlLabel
                      className="radio-radio"
                      value="Disabled"
                      control={<Radio color="default" />}
                      label="Disabled"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            )}
          </Grid>
          <div className="reset-link">
            <Button onClick={openReset}>Send password reset link?</Button>
          </div>
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
      <Modal
        className="user__Page__bulkAdd__modal"
        title="Reset Password"
        opened={resetModalOpened}
        onClose={() => setResetModalOpened(false)}
      >
        <form className="stepper-content">
          <div className="stepper-content-inner">
            <Grid container spacing={3} className="page-row">
              <Grid item xs={12}>
                <FormLabel className="radio-label labelWithTooltip">Confirm Current Password</FormLabel>
                <FormControl fullWidth>
                  <TextField type="company_name" placeholder="Trip Ninja Inc." variant="outlined"/>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3} className="page-row">
              <Grid item xs={12}>
                <FormLabel className="radio-label labelWithTooltip">New Password</FormLabel>
                <FormControl fullWidth>
                  <TextField type="company_name" placeholder="Trip Ninja Inc." variant="outlined"/>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </form>
        <div className="stepper-actions">
          <div className="stepper-actions-inner">
            <Button
              variant="outlined"
              className="btn-primary"
              style={{ marginRight: 'auto' }}
              onClick={() => setResetModalOpened(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="btn-filled"
              style={{ marginLeft: 'auto' }}
              onClick={() => setResetModalOpened(false)}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
};

export default BulkAddModal
