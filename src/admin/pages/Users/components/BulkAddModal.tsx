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
  Dropdown,
  Modal,
  Stepper,
  ToolTip,
  Switch,
  Tabs,
  Tag
} from '../../../components';

import { addBulkUsers } from "../../../store/users/actions";

import { axios, validateEmail } from "../../../utils";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  addBulkUsers: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const BulkAddModal: React.FC<Props> = ({ opened, onClose, onSuccess, addBulkUsers }) => {
  const user = JSON.parse(localStorage.getItem('authInfo')!);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string, agency?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamId, setTeamId] = useState(undefined);
  const [teamOptions, setTeamOptions] = useState([]);
  const [agencyId, setAgencyId] = useState(undefined);
  const [agencyOptions, setAgencyOptions] = useState([]);
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
    if (opened) {
      axios.get("/api/v1/teams/agency/list/").then(({ data }) => {
        setAgencyOptions(data.data.agency.map((el: any) => ({
          value: el.agency_id,
          label: el.agency_name,
        })))
      }).catch(console.error);
    }
  }, [opened]);

  const handleClose = () => {
    setStep(0);
    setEmail('');
    setEmails([]);
    setPassword('');
    setErrors({});
    setIsSubmitting(false);
    setTeamId(undefined);
    setAgencyId(undefined);
    setIsActive("enabled");
    onClose();
  };

  const onInputEmail = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === "Enter") {
      setIsSubmitting(true);

      if (!validateEmail(email)) {
        setErrors({
          email: 'Invalid email'
        });
      } else {
        if (emails.includes(email)) {
          setErrors({
            email: 'Email already taken'
          });
        } else {
          axios.get('/api/v1/users/email-check/', {
            params: { email }
          }).then(({ data }) => {
            if (data.result) {
              setEmails([ ...emails, email ]);
              setIsSubmitting(false);
              setErrors({});
              setEmail('');
            } else {
              setErrors({
                email: 'This user already exists'
              });
            }
          }).catch(console.error)
        }
      }
    }
  };

  const onEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);

    if (isSubmitting) {
      if (validateEmail(ev.target.value)) {
        setErrors({});
      } else {
        setErrors({
          email: 'Invalid email'
        });
      }
    }
  };

  const onAgencyChange = (val: any) => {
    setAgencyId(val);
    axios.get(`/api/v1/teams/list/${val}/`).then(({ data }) => {
      console.log(data);
      setTeamOptions(data.data.teams.map((el: any) => ({
        value: el.team_id,
        label: el.team_name,
      })))
    }).catch(console.error);

    if (isSubmitting) {
      if (agencyId) {
        setErrors({});
      } else {
        setErrors({
          agency: true
        });
      }
    }
  };

  const onEmailRemove = (e: string) => {
    setEmails(emails.filter((el) => el !== e))
  };

  const onNext = () => {
    if (step === 0) {
      setIsSubmitting(true);
      if (emails.length) {
        if (user.user.is_superuser && agencyId) {
          setIsSubmitting(false);
          setErrors({});
          return setStep(1);
        }
        else if (!user.user.is_superuser && !agencyId) {
          setIsSubmitting(false);
          setErrors({});
          return setStep(1);
        }
        else {
          return setErrors({
            agency: true
          });
        }
      } else {
        return setErrors({
          email: 'You must add at least 1 email'
        });
      }
    }
    setStep(Math.min(step + 1, 3));
  };

  const onBack = () => {
    setStep(Math.max(step - 1, 0));
  };

  const onFinal = () => {
    addBulkUsers({
      emails,
      team_id: teamId,
      agency_id: agencyId,
      password,
      is_active: isActive === "enabled"
    }, onSuccess);
    handleClose();
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
              <Grid sm={6} item xs={12}>
                <FormLabel className="label label-with-tooltip">
                  Email Address
                  <ToolTip
                    text='Adding more than one user? Separate users with a space.'
                  >
                    <img
                      className="icon"
                      src={require('../../../assets/info.svg')}
                      alt="svg"
                    />
                  </ToolTip>
                </FormLabel>
                <FormControl>
                  <TextField
                    type="email"
                    variant="outlined"
                    error={isSubmitting && !!errors.email}
                    helperText={errors.email}
                    value={email}
                    onChange={onEmailChange}
                    onKeyPress={onInputEmail}
                  />
                </FormControl>
              </Grid>
              <Grid sm={6} item xs={12}>
                <FormLabel className="label">Password</FormLabel>
                <FormControl fullWidth>
                  <TextField
                    type="password"
                    placeholder="password"
                    value={password}
                    variant="outlined"
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                </FormControl>
              </Grid>
              {user.user.is_superuser && (
                <Grid item xs={12} className="group-selector">
                  <label>Agency: </label>
                  <Dropdown
                    options={agencyOptions}
                    value={agencyId}
                    error={isSubmitting && !!errors.agency}
                    placeholder="No agency assigned"
                    position="top"
                    onChange={onAgencyChange}
                  />
                </Grid>
              )}
              <PerfectScrollbar className="email-list">
                {emails.map((el) => (
                  <Tag key={el} className="email-tag" text={el} onRemove={() => onEmailRemove(el)} />
                ))}
              </PerfectScrollbar>
            </Grid>
          </div>
        </>
      )
    } else if (step === 1) {
      return (
        <div className="second-step">
          <Typography variant="h3" component="h1" className="second-title">Set Users Team</Typography>
          <Grid container spacing={3} className="row">
            {!user.user.is_team_lead && (
              <Grid item xs={12} className="group-selector">
                <label>Team: </label>
                <Dropdown
                  options={teamOptions}
                  value={teamId}
                  placeholder="No team assigned"
                  onChange={setTeamId}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <PerfectScrollbar className="email-list">
                {emails.join(' | ')}
              </PerfectScrollbar>
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
                    src={require('../../../assets/info.svg')}
                    alt="svg"
                  />
                </ToolTip>
                <Switch defaultChecked={true} inputProps={{ 'aria-label': 'primary checkbox' }} className="custom-switch" />
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
      <div className="fourth-step">
        <Typography variant="h3" component="h1" className="fourth-title">Invite your teammate to QuickTrip</Typography>
        <Typography className="team-form-description">
          Sent them an invitation with everything they need to get started. Once new users are activated, they will be prorated and added to your next invoice.
        </Typography>
      </div>
    )
  };

  return (
    <Modal
      className="user-Page-bulkAdd-modal"
      title="Bulk Add Users"
      opened={opened}
      onClose={handleClose}
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
  addBulkUsers: bindActionCreators(addBulkUsers, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(BulkAddModal);
