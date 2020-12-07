import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
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

import { Currency, ToolTip } from "../../components";
import PropTypes from "prop-types";

import {bindActionCreators, Dispatch} from "redux";

import { fetchBasicInfo } from "../../store/users/actions";
import {getBasicInfo} from "../../store/users/selectors";

import "./styles.css";

const propTypes = {
  basic_info: PropTypes.any.isRequired,
  fetchBasicInfo: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const GeneralInfo: React.FC<Props> = ({ basic_info, fetchBasicInfo }) => {
  const [currency, setCurrency] = useState(undefined);
  const [dateType, setDateType] = useState('dd/mm/yyyy');

  useEffect(() => { fetchBasicInfo(); }, []);

  useEffect ( () => {
    setCurrency(basic_info? basic_info.currency : undefined);
    setDateType(basic_info? basic_info.date_type : 'dd/mm/yyyy');
  }, [basic_info]);

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
            <Currency
              value={currency}
              onChange={setCurrency}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormLabel className="radio-label">Default Calendar layout</FormLabel>
          <FormControl>
            <RadioGroup row value={dateType} onChange={(ev) => setDateType(ev.target.value)}>
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

const mapStateToProps = (state: any) => {
  return {
    basic_info: getBasicInfo(state.users),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBasicInfo: bindActionCreators(fetchBasicInfo, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralInfo);
