import * as React from "react";
import {
  Button,
  Grid,
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

import { Drawer, Select, Tabs, NameField } from '../../../components';

import PropTypes from "prop-types";
import {bindActionCreators, Dispatch} from "redux";
import { useState, useEffect } from "react";
import {updateTeam} from "../../../store/teams/actions";
import {connect} from "react-redux";
import {axios} from "../../../utils";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  team: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const TeamEditDrawer: React.FC<Props> = ({ opened, team, onClose, updateTeam }) => {
  const [teamName, setTeamName] = useState('');
  const [adminID, setAdminID] = useState(undefined);
  const [adminOptions, setAdminOptions] = useState([]);
  const [memberID, setMemberID] = useState([]);
  const [memberOptions, setMemberOptions] = useState([]);
  const [isActive, setIsActive] = useState("enabled");

  useEffect(() => {
    if (opened) {
      axios.get(`/api/v1/users/list/${team.team_id}/`).then(({ data }) => {
        setAdminOptions(data.data.users.map((el: any) => ({
          value: el.user_id,
          label: el.username,
        })))
      }).catch(console.error);
      axios.get(`/api/v1/users/list/${team.team_id}/`).then(({ data }) => {
        setMemberOptions(data.data.users.map((el: any) => ({
          value: el.user_id,
          label: el.username,
        })))
      }).catch(console.error);
    }
  }, [opened, team]);

  useEffect(() => {
    setTeamName(team? team.team_name : '');
    setAdminID(team ? team.leader_id : undefined);
    setMemberID(team ? team.members : []);
    setIsActive(team ? team.is_booking ? 'enabled' : 'disabled' : 'enabled');
  }, [team]);

  const onSave = () => {
    updateTeam({
      team_id: team.team_id,
      team_name: teamName,
      is_booking: isActive === 'enabled',
      admin_id: adminID,
      members: memberID
    });
    onClose();
  };

  return (
    <Drawer
      className="team-Page-modal"
      opened={opened}
      onClose={onClose}
    >
      {team && (
        <>
          <Drawer.Header>
            <NameField value={teamName} onChange={(ev) => setTeamName(ev.target.value)} />
          </Drawer.Header>
          <Drawer.Body>
            <Grid container spacing={3} style={{ marginBottom: 30 }}>
              <Grid item sm={6} xs={12}>
                <FormLabel className="radio-label">Team Members</FormLabel>
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
                <FormLabel className="radio-label">Team Lead(s)</FormLabel>
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
          </Drawer.Body>
          <Drawer.Footer className="edit-form-buttons">
            <Button
              variant="outlined"
              className="btn-primary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="btn-filled"
              onClick={onSave}
            >
              Save
            </Button>
          </Drawer.Footer>
        </>
      )}
    </Drawer>
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateTeam: bindActionCreators(updateTeam, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(TeamEditDrawer);
