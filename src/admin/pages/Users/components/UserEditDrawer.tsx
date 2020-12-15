import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import {
  Button,
  TextField,
  Grid,
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import PropTypes from "prop-types";
import { bindActionCreators, Dispatch } from "redux";

import { Drawer, Dropdown, UsernameField, Tabs } from '../../../components';

import { updateUser } from "../../../store/users/actions";
import { axios } from "../../../utils";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  user: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const UserEditDrawer: React.FC<Props> = ({ opened, user, onClose, updateUser }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [teamId, setTeamId] = useState(undefined);
  const [teamOptions, setTeamOptions] = useState([]);
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isActive, setIsActive] = useState("enabled");

  useEffect(() => {
    if (opened) {
      axios.get("/api/v1/teams/list/").then(({ data }) => {
        setTeamOptions(data.data.teams.map((el: any) => ({
          value: el.team_id,
          label: el.team_name,
        })))
      }).catch(console.error);
    } else {
      setActiveTab(0);
    }
  }, [opened]);

  useEffect(() => {
    setFirstName(user ? user.first_name : '');
    setLastName(user ? user.last_name : '');
    setTeamId(user ? user.team_id : '');
    setEmail(user ? user.email : '');
    if (user && user.phone_number) {
      const arr = user.phone_number.split('-');
      setCountryCode(arr[0]);
      arr.splice(0, 1);
      setPhoneNumber(arr.join());
    } else {
      setCountryCode('');
      setPhoneNumber('');
    }
    setIsActive(user ? user.is_active ? 'enabled' : 'disabled' : 'enabled');
  }, [user]);

  const onUsernameChange = (ev: React.ChangeEvent<HTMLInputElement>, attr: string) => {
    if (attr === 'first_name') {
      setFirstName(ev.target.value);
    } else {
      setLastName(ev.target.value);
    }
  };

  const onSave = () => {
    let phone_number = '';
    if (countryCode || phoneNumber) {
      phone_number = `${countryCode}-${phoneNumber}`;
    }

    updateUser({
      user_id: user.user_id,
      first_name,
      last_name,
      email,
      team_id: teamId,
      phone_number, 
      is_active: isActive === "enabled"
    });
    onClose();
  };

  return (
    <Drawer
      className="user-Page-drawer"
      opened={opened}
      onClose={onClose}
    >
      {user && (
        <>
          <Drawer.Header>
            <UsernameField
              first_name={first_name}
              last_name={last_name}
              onChange={onUsernameChange}
            />
            <div className="group-selector">
              <label>Team: </label>
              <Dropdown
                options={teamOptions}
                value={teamId}
                placeholder="No team assigned"
                onChange={setTeamId}
              />
            </div>
          </Drawer.Header>
          <Drawer.Body className="user-Page-drawer-body">
            <Grid item xs={12}>
              <Tabs value={activeTab} tabs={["Personal Info", "Booking"]} onChange={(event: React.ChangeEvent<{}>, newValue: any) => setActiveTab(newValue)} />
              {activeTab === 0 ? (
                <div className="tab-content">
                  <Grid item sm={6} xs={12}>
                    <FormLabel className="radio-label">Email Address</FormLabel>
                    <FormControl>
                      <TextField
                        type="email"
                        placeholder="email@email.com"
                        variant="outlined"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormLabel className="radio-label">Phone Number</FormLabel>
                    <FormControl className="phone-input-field">
                      <TextField
                        className="country-code-input"
                        placeholder="XXX"
                        variant="outlined"
                        value={countryCode}
                        onChange={(ev) => setCountryCode(ev.target.value)}
                        inputProps={{ maxLength: 3 }}
                      />
                      <TextField
                        className="phone-number-input"
                        placeholder="XXX"
                        variant="outlined"
                        value={phoneNumber}
                        onChange={(ev) => setPhoneNumber(ev.target.value)}
                        inputProps={{ maxLength: 11 }}
                      />
                    </FormControl>
                  </Grid>
                </div>
              ) : (
                <div className="tab-content" style={{ display:"block" }}>
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
              )}
            </Grid>
            <div className="reset-link">
              <Button>Send password reset link?</Button>
            </div>
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
  updateUser: bindActionCreators(updateUser, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(UserEditDrawer);
