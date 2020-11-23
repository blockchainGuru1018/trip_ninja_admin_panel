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
import classNames from "classnames";

import { ToolTip } from "../../components";
import useSharedStyles from '../../globalStyles';

const GeneralInfo: React.FC = () => {
  const classes = useStyles();
  const sharedClasses = useSharedStyles();

  return (
    <>
      <div className={sharedClasses.pageHeader}>
        <Typography variant="h3" component="h1" className={sharedClasses.pageTitle}>
          General Information
        </Typography>
      </div>
      <Typography className={sharedClasses.pageDescription}>
        Configure how information is displayed.
        While these are the account defaults, some of these settings can be overwritten on an individual basis.
      </Typography>
      <Grid container spacing={3} className={sharedClasses.pageRow}>
        <Grid item xs={12}>
          <FormLabel className={classNames(sharedClasses.radioLabel, classes.labelWithTooltip)}>
            Company Name
            <ToolTip
              text='Your company name, as it should appear on quotes and invoices. Legal name recommended.'
            >
              <img
                className={classes.icon}
                src={require('../../assets/info.svg')}
                alt="svg"
              />
            </ToolTip>
          </FormLabel>
          <FormControl>
            <TextField type="email" placeholder="Trip Ninja Inc." variant="outlined" />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={sharedClasses.pageRow}>
        <Grid item sm={6} xs={12}>
          <FormLabel className={sharedClasses.radioLabel}>Default Currency</FormLabel>
          <FormControl />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormLabel className={sharedClasses.radioLabel}>Default Calendar layout</FormLabel>
          <FormControl>
            <RadioGroup name="date" row defaultValue="mm/dd/yyyy">
              <FormControlLabel
                className={sharedClasses.radioRadio}
                value="dd/mm/yyyy"
                control={<Radio color="default" />}
                label="DD/MM/YYYY"
              />
              <FormControlLabel
                className={sharedClasses.radioRadio}
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
  labelWithTooltip: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    cursor: 'pointer',
    width: 15,
    marginLeft: 15
  },
});

export default GeneralInfo
