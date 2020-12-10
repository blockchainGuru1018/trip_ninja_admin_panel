import React from 'react';
import {
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  FormControl,
  FormLabel,
} from '@material-ui/core';

import "./styles.css";

const SearchBookingDetail: React.FC = () => {
  return (
    <div className="searchBookingDetail-Page">
      <div className="page-header">
        <Typography variant="h3" component="h1" className="page-title">
          Search & Booking Defaults
        </Typography>
      </div>
      <Typography className="page-description">
        Configure how and when bookings are made. While these are the account defaults, some of these settings can be overwritten on an individual basis.
      </Typography>
      <Grid container spacing={3} className="page-row">
        <Grid item sm={6} xs={12}>
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
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormLabel className="radio-label">Virtual Interlining</FormLabel>
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
        </Grid>
      </Grid>
    </div>
  )
};

export default SearchBookingDetail
