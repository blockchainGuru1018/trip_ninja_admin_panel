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

import { Select, ToolTip } from "../../components";

import "./styles.css";

const GeneralInfo: React.FC = () => {

  return (
    <div className="generalInfo__Page">
      <div className="page-header">
        <Typography variant="h3" component="h1" className="page-title">
          General Information
        </Typography>
      </div>
      <Typography className="page-description">
        Configure how information is displayed.
        While these are the account defaults, some of these settings can be overwritten on an individual basis.
      </Typography>
      <Grid container spacing={3} className="page-row">
        <Grid item xs={12}>
          <FormLabel className="radio-label labelWithTooltip">
            Company Name
            <ToolTip
              text='Your company name, as it should appear on quotes and invoices. Legal name recommended.'
            >
              <img
                className="icon"
                src={require('../../assets/info.svg')}
                alt="svg"
              />
            </ToolTip>
          </FormLabel>
          <FormControl>
            <TextField type="company_name" placeholder="Trip Ninja Inc." variant="outlined" />
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

export default GeneralInfo
