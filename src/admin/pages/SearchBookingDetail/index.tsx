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

const SearchBookingDetail: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3" component="h1" className={classes.title}>
        Search & Booking Defaults
      </Typography>
      <Typography className={classes.subtitle}>
        Configure how and when bookings are made. While these are the account defaults, some of these settings can be overwritten on an individual basis.
      </Typography>
      <Grid container spacing={3} className={classes.row}>
        <Grid item sm={6} xs={12}>
          <FormLabel className={classes.label}>Agents can create PNRs?</FormLabel>
          <FormControl>
            <RadioGroup name="date" row defaultValue="Enabled">
              <FormControlLabel
                className={classes.radio}
                value="Enabled"
                control={<Radio color="default" />}
                label="Enabled"
              />
              <FormControlLabel
                className={classes.radio}
                value="Disabled"
                control={<Radio color="default" />}
                label="Disabled"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormLabel className={classes.label}>Virtual Interlining</FormLabel>
          <FormControl>
            <RadioGroup name="date" row defaultValue="Enabled">
              <FormControlLabel
                className={classes.radio}
                value="Enabled"
                control={<Radio color="default" />}
                label="Enabled"
              />
              <FormControlLabel
                className={classes.radio}
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
  title: {
    fontSize: 24,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
  },
  subtitle: {
    fontSize: 16,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    marginTop: 24,
  },
  row: {
    marginTop: 46,
    marginBottom: 0
  },
  label: {
    display: 'block',
    fontSize: 16,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'bolder',
    marginBottom: 12
  },
  radio: {
    '& .MuiFormControlLabel-label': {
      fontSize: 14,
      fontFamily: 'NeuzitGrotesk',
      color: '#45565E',
    }
  }
});

export default SearchBookingDetail
