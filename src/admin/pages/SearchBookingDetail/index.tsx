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
import { makeStyles } from '@material-ui/core/styles';

import userSharedStyles from '../../globalStyles';

const SearchBookingDetail: React.FC = () => {
  const classes = useStyles();
  const sharedClasses = userSharedStyles();

  return (
    <>
      <div className={sharedClasses.pageHeader}>
        <Typography variant="h3" component="h1" className={sharedClasses.pageTitle}>
          Search & Booking Defaults
        </Typography>
      </div>
      <Typography className={sharedClasses.pageDescription}>
        Configure how and when bookings are made. While these are the account defaults, some of these settings can be overwritten on an individual basis.
      </Typography>
      <Grid container spacing={3} className={sharedClasses.pageRow}>
        <Grid item sm={6} xs={12}>
          <FormLabel className={sharedClasses.radioLabel}>Agents can create PNRs?</FormLabel>
          <FormControl>
            <RadioGroup name="date" row defaultValue="Enabled">
              <FormControlLabel
                className={sharedClasses.radioRadio}
                value="Enabled"
                control={<Radio color="default" />}
                label="Enabled"
              />
              <FormControlLabel
                className={sharedClasses.radioRadio}
                value="Disabled"
                control={<Radio color="default" />}
                label="Disabled"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormLabel className={sharedClasses.radioLabel}>Virtual Interlining</FormLabel>
          <FormControl>
            <RadioGroup name="date" row defaultValue="Enabled">
              <FormControlLabel
                className={sharedClasses.radioRadio}
                value="Enabled"
                control={<Radio color="default" />}
                label="Enabled"
              />
              <FormControlLabel
                className={sharedClasses.radioRadio}
                value="Disabled"
                control={<Radio color="default" />}
                label="Disabled"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
};

const useStyles = makeStyles({
});

export default SearchBookingDetail
