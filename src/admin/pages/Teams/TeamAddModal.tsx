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
  Radio,
} from '@material-ui/core';

import {
  Drawer,
  Modal,
  Select,
  Stepper,
  Switch,
  Tabs,
  ToolTip,
  UsernameField
} from '../../components';

import PropTypes from "prop-types";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const TeamAddModal: React.FC<Props> = ({ opened, onClose }) => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [step, setStep] = useState(0);

  const onNext = () => {
    setStep(Math.min(step + 1, 3));
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
        <div className="first-step">
          <Typography variant="h3" component="h1" className="team-form-title first-title">Create a new team</Typography>
          <Grid container spacing={3} className="row">
            <Grid item xs={12}>
              <FormLabel className="label">Team Name</FormLabel>
              <FormControl fullWidth>
                <TextField type="team_name" placeholder="What should we call your team" variant="outlined" required={true} />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    } else if (step === 1) {
      return (
        <div className="second-step">
          <Typography variant="h3" component="h1" className="team-form-title">Islington Store</Typography>
          <Grid container spacing={3} className="row">
            <Grid item xs={12}>
              <FormLabel className="{label labelWithTooltip">
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
    } else if (step === 2) {
      return (
        <div className="third-step">
          <Typography variant="h3" component="h1" className="team-form-title">Islington Store</Typography>
          <Grid container spacing={3} className="row">
            <Grid item sm={6} xs={12}>
              <FormLabel className="label">Add Team Members</FormLabel>
              <FormControl fullWidth>
                <Select
                  className="select"
                  options={[
                    { value: 'regina_george', label: 'Regina George' },
                    { value: 'augustus', label: 'Augustus' },
                    { value: 'selena_gomez', label: 'Selena Gomez' },
                    { value: 'augustus', label: 'Augustus' },
                  ]}
                  value="regina_george"
                  placeholder="Add team members"
                />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormLabel className="label">Add Team Lead(s)</FormLabel>
              <FormControl fullWidth>
                <Select
                  className="select"
                  options={[
                    { value: 'regina_george', label: 'Regina George' },
                    { value: 'augustus', label: 'Augustus' },
                    { value: 'selena_gomez', label: 'Selena Gomez' },
                    { value: 'augustus', label: 'Augustus' },
                  ]}
                  value="regina_george"
                  placeholder="Add Team Lead(s)"
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    }
    return (
      <div className="fourth-step">
        <Typography variant="h3" component="h1" className="team-form-title">Create a new team!</Typography>
        <Typography className="team-form-description">
          Add users to your team immediately to get started. You can modify team or individual permissions at any time.
        </Typography>
      </div>
    )
  };

  return (
    <>
      <Modal
        className="team__Page__modal"
        title="Add Team"
        opened={opened}
        onClose={onClose}
      >
        <Stepper
          steps={["Create Team", "Set Permissions", "Add Members", "Send Invites"]}
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
        className="team__Page__modal"
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
      >
        <Drawer.Header>
          <UsernameField value="Niloufar Mazloumpar" onChange={console.log} />
        </Drawer.Header>
        <Drawer.Body>
          <Grid container spacing={3} style={{ marginBottom: 30 }}>
            <Grid item sm={6} xs={12}>
              <FormLabel className="radio-label">Team Members</FormLabel>
              <FormControl fullWidth>
                <Select
                  className="select"
                  options={[
                    { value: 'regina_george', label: 'Regina George' },
                    { value: 'augustus', label: 'Augustus' },
                    { value: 'selena_gomez', label: 'Selena Gomez' },
                    { value: 'augustus', label: 'Augustus' },
                  ]}
                  value="regina_george"
                  placeholder="Edit Team Members"
                />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormLabel className="radio-label">Team Lead(s)</FormLabel>
              <FormControl fullWidth>
                <Select
                  className="select"
                  options={[
                    { value: 'regina_george', label: 'Regina George' },
                    { value: 'augustus', label: 'Augustus' },
                    { value: 'selena_gomez', label: 'Selena Gomez' },
                    { value: 'augustus', label: 'Augustus' },
                  ]}
                  value="regina_george"
                  placeholder="Team Lead(s)"
                />
              </FormControl>
            </Grid>
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

export default TeamAddModal;
