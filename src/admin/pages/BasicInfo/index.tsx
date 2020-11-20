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
import { makeStyles } from '@material-ui/core/styles';

import { UsernameField } from "../../components";

const BasicInfo: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3" component="h1" className={classes.title}>
        Basic Information
      </Typography>
      <Typography className={classes.subtitle}>
        Configure your name and personal details.
        Settings changed here will overwrite Global Defaults and Team Defaults.
      </Typography>
      <div className={classes.usernameSection}>
        <div className={classes.avatar}>
          <Typography className={classes.name}>NM</Typography>
        </div>

        <UsernameField value="Niloufar Mazloumpar" onChange={console.log} />
      </div>
      <Grid container spacing={3} className={classes.row}>
        <Grid item sm={6} xs={12}>
          <FormLabel className={classes.label}>Phone Number</FormLabel>
          <FormControl className={classes.phoneInputField}>
            <TextField className={classes.countryCodeInput} placeholder="XXX" variant="outlined" />
            <TextField className={classes.phoneNumberInput} placeholder="XXX" variant="outlined" />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormLabel className={classes.label}>Email Address</FormLabel>
          <FormControl>
            <TextField type="email" placeholder="email@email.com" variant="outlined" />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.row}>
        <Grid item sm={6} xs={12}>
          <FormLabel className={classes.label}>Default Currency</FormLabel>
          <FormControl>
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormLabel className={classes.label}>Default Calendar layout</FormLabel>
          <FormControl>
            <RadioGroup name="date" row defaultValue="mm/dd/yyyy">
              <FormControlLabel
                className={classes.radio}
                value="dd/mm/yyyy"
                control={<Radio color="default" />}
                label="DD/MM/YYYY"
              />
              <FormControlLabel
                className={classes.radio}
                value="mm/dd/yyyy"
                control={<Radio color="default" />}
                label="MM/DD/YYYY"
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
  usernameSection: {
    display: 'flex',
    alignItems: 'center',
    margin: '40px 0',
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    border: '3px solid #45565E',
    borderRadius: '50%',
    marginRight: 30
  },
  name: {
    fontSize: 32,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'bolder',
  },
  row: {
    marginTop: 0,
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
  phoneInputField: {
    flexDirection: 'row'
  },
  countryCodeInput: {
    width: 60,
  },
  phoneNumberInput: {
    flex: 1,
    marginLeft: 16
  },
  radio: {
    '& .MuiFormControlLabel-label': {
      fontSize: 14,
      fontFamily: 'NeuzitGrotesk',
      color: '#45565E',
    }
  }
});

export default BasicInfo
