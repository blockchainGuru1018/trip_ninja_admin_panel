import React from 'react';
import {
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  FormControl,
  FormLabel,
  TextField,
} from '@material-ui/core';

import { Select, UsernameField } from "../../components";

import "./styles.css";

const BasicInfo: React.FC = () => {

  return (
    <div className="basicInfo__Page">
      <div className="page-header">
        <Typography variant="h3" component="h1" className="page-title">
          Basic Information
        </Typography>
      </div>
      <Typography className="page-description">
        Configure your name and personal details.
        Settings changed here will overwrite Global Defaults and Team Defaults.
      </Typography>
      <div className="username-section">
        <div className="avatar">
          <Typography className="name">NM</Typography>
        </div>

        <UsernameField value="Niloufar Mazloumpar" onChange={console.log} />
      </div>
      <Grid container spacing={3} className="page-row">
        <Grid item sm={6} xs={12}>
          <FormLabel className="radio-label">Phone Number</FormLabel>
          <FormControl className="phone-input-field">
            <TextField className="country-code-input" placeholder="XXX" variant="outlined" />
            <TextField className="phone-number-input" placeholder="XXX" variant="outlined" />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormLabel className="radio-label">Email Address</FormLabel>
          <FormControl>
            <TextField type="email" placeholder="email@email.com" variant="outlined" />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} className="page-row">
        <Grid item sm={6} xs={12}>
          <FormLabel className="radio-label">Default Currency</FormLabel>
          <FormControl>
            <Select
              className="select"
              options={[
                { value: 'usd', label: 'USD' },
                { value: 'eur', label: 'EUR' },
              ]}
              value="usd"
              placeholder="Default currency"
            />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormLabel className="radio-label">Default Calendar layout</FormLabel>
          <FormControl>
            <RadioGroup name="date" row defaultValue="mm/dd/yyyy">
              <FormControlLabel
                className="radio-radio"
                value="dd/mm/yyyy"
                control={<Radio color="default" />}
                label="DD/MM/YYYY"
              />
              <FormControlLabel
                className="radio-radio"
                value="mm/dd/yyyy"
                control={<Radio color="default" />}
                label="MM/DD/YYYY"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
};

export default BasicInfo
