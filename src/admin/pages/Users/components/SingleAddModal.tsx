import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
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
import { bindActionCreators, Dispatch } from "redux";

import {
  Modal,
  Dropdown,
  Stepper,
  ToolTip,
  Switch,
  Tabs
} from '../../../components';

import { addUser } from "../../../store/users/actions";

import {axios, validateEmail} from "../../../utils";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const SingleAddModal: React.FC<Props> = ({ opened, onClose, addUser }) => {
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamId, setTeamId] = useState(undefined);
  const [teamOptions, setTeamOptions] = useState([]);
  const [isActive, setIsActive] = useState("enabled");

  useEffect(() => {
    if (opened) {
      axios.get("/api/v1/teams/list/").then(({ data }) => {
        setTeamOptions(data.data.teams.map((el: any) => ({
          value: el.team_id,
          label: el.team_name,
        })))
      }).catch(console.error);
    }
  }, [opened]);

  const handleClose = () => {
    setStep(0);
    setFirstName('');
    setLastName('');
    setEmail('');
    setErrors({});
    setIsSubmitting(false);
    setTeamId(undefined);
    setIsActive("enabled");
    onClose();
  };

  const onEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);

    if (isSubmitting) {
      if (validateEmail(ev.target.value)) {
        setErrors({});
      } else {
        setErrors({
          email: 'Invalid Email'
        });
      }
    }
  };

  const onNext = async () => {
    if (step === 0) {
      setIsSubmitting(true);

      if (email) {
        try {
          const resp = await axios.get('/api/v1/users/email-check/', {
            params: {email}
          });

          if (resp.data.result) {
            setIsSubmitting(false);
            setErrors({});
            return setStep(1);
          } else {
            return setErrors({
              email: 'This user already exists'
            });
          }
        } catch (err) {
          console.error(err);
          return setErrors({
            email: 'Response Error'
          });
        }
      } else {
        return setErrors({
          email: 'Empty Email'
        });
      }
    } else {
      setStep(Math.min(step + 1, 2));
    }
  };

  const onBack = () => {
    setStep(Math.max(step - 1, 0));
  };

  const onFinal = () => {
    addUser({
      email,
      first_name: firstName,
      last_name: lastName,
      team_id: teamId,
      is_active: isActive === "enabled"
    });
    handleClose();
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
                <TextField
                  placeholder="First Name"
                  value={firstName}
                  variant="outlined"
                  onChange={(ev) => setFirstName(ev.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid sm={6} item xs={12}>
              <FormLabel className="label">Last Name</FormLabel>
              <FormControl>
                <TextField
                  placeholder="Last Name"
                  value={lastName}
                  variant="outlined"
                  onChange={(ev) => setLastName(ev.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} className="row">
            <Grid item xs={12}>
              <FormLabel className="label">Email Address</FormLabel>
              <FormControl fullWidth>
                <TextField
                  type="email"
                  variant="outlined"
                  error={isSubmitting && !!errors.email}
                  helperText={errors.email}
                  value={email}
                  onChange={onEmailChange}
                />
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
            <Grid item xs={12} className="group-selector">
              <label>Team: </label>
              <Dropdown
                options={teamOptions}
                value={teamId}
                placeholder="No team assigned"
                onChange={setTeamId}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel className="label-with-tooltip">
                <label>Inherit global default permissions</label>
                <ToolTip
                  text='These settings can be overwritten later by team leads or account administrators.'
                >
                  <img
                    className="icon"
                    src={require('../../../assets/info.svg')}
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
                  <RadioGroup row value={isActive} onChange={(ev) => setIsActive(ev.target.value)}>
                    <FormControlLabel
                      className="radio-radio"
                      value="enabled"
                      control={<Radio color="default" />}
                      label="Enabled"
                    />
                    <FormControlLabel
                      className="radio-radio"
                      value="disabled"
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
      <div className="third-step">
        <Typography variant="h3" component="h1" className="user-form-title">Invite your teammate to QuickTrip</Typography>
        <Typography className="team-form-description">
          Sent them an invitation with everything they need to get started. Once new users are activated, they will be prorated and added to your next invoice.
        </Typography>
      </div>
    )
  };

  return (
    <Modal
      className="user-Page-singleAdd-modal"
      title="Add User"
      opened={opened}
      onClose={handleClose}
    >
      <Stepper
        steps={["Create User", "Set Permissions", "Send Invites"]}
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
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addUser: bindActionCreators(addUser, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(SingleAddModal);
