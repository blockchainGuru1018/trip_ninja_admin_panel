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

import { Drawer, Select, Tabs, UsernameField } from '../../../components';

import PropTypes from "prop-types";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const TeamEditDrawer: React.FC<Props> = ({ opened, onClose }) => {

  return (
    <Drawer
      className="team__Page__modal"
      opened={opened}
      onClose={onClose}
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

export default TeamEditDrawer;
