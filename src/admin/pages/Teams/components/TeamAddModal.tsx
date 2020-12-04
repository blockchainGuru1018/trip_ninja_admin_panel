import React, {useEffect, useState} from 'react';
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
  Modal,
  Select,
  Stepper,
  Switch,
  Tabs,
  ToolTip,
} from '../../../components';

import PropTypes from "prop-types";
import {bindActionCreators, Dispatch} from "redux";

import {connect} from "react-redux";
import { addTeam } from "../../../store/teams/actions";
import {axios} from "../../../utils";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addTeam: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const TeamAddModal: React.FC<Props> = ({ opened, onClose, addTeam }) => {
  const [step, setStep] = useState(0);
  const [teamName, setTeamName] = useState('');
  const [adminID, setAdminID] = useState(undefined);
  const [adminOptions, setAdminOptions] = useState([]);
  const [memberID, setMemberID] = useState([]);
  const [memberOptions, setMemberOptions] = useState([]);
  const [isActive, setIsActive] = useState("enabled");

  useEffect(() => {
    axios.get("/api/v1/users/list/").then(({ data }) => {
      setAdminOptions(data.data.users.map((el: any) => ({
        value: el.user_id,
        label: el.username,
      })))
    }).catch(console.error);
    axios.get("/api/v1/users/list/").then(({ data }) => {
      setMemberOptions(data.data.users.map((el: any) => ({
        value: el.user_id,
        label: el.username,
      })))
    }).catch(console.error);
  }, []);

  const handleClose = () => {
    setStep(0);
    setTeamName('');
    setIsActive("enabled");
    onClose();
  };

  const onNext = () => {
    setStep(Math.min(step + 1, 3));
  };

  const onBack = () => {
    setStep(Math.max(step - 1, 0));
  };

  const onFinal = () => {
    addTeam({
      team_name: teamName,
      is_booking: isActive === "enabled",
      admin_id: adminID,
      members: memberID,
    });
    handleClose();
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
                <TextField
                  placeholder="What should we call your team"
                  value={teamName}
                  variant="outlined"
                  onChange={(ev) => setTeamName(ev.target.value)}
                />
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
                  options={memberOptions}
                  value={memberID}
                  placeholder="Add team members"
                  onChange={setMemberID}
                  multiple
                />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormLabel className="label">Add Team Lead(s)</FormLabel>
              <FormControl fullWidth>
                <Select
                  className="select"
                  options={adminOptions}
                  value={adminID}
                  placeholder="Add Team Lead(s)"
                  onChange={setAdminID}
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
        onClose={handleClose}
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
    </>
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTeam: bindActionCreators(addTeam, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(TeamAddModal);
