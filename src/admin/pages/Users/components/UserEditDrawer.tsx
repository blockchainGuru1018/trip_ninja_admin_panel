import React, { useState } from 'react';
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

import { Drawer, UsernameField, Tabs } from '../../../components';

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const UserEditDrawer: React.FC<Props> = ({ opened, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Drawer
      className="user__Page__singleAdd__drawer"
      opened={opened}
      onClose={onClose}
    >
      <Drawer.Header>
        <UsernameField value="Bob Jones" onChange={console.log} />
      </Drawer.Header>
      <Drawer.Body className="user__Page__singleAdd__drawer__body">
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
          onClick={onClose}
        >
          Save
        </Button>
      </Drawer.Footer>
    </Drawer>
  )
};

export default UserEditDrawer;
