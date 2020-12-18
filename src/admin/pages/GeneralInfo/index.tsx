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
import PropTypes from "prop-types";
import {bindActionCreators, Dispatch} from "redux";

import { Currency, ToolTip } from "../../components";


import {fetchGeneralInfo, updateGeneralInfo} from "../../store/users/actions";
import {getGeneralInfo} from "../../store/users/selectors";

import "./styles.css";

const propTypes = {
  basic_info: PropTypes.any.isRequired,
  fetchGeneralInfo: PropTypes.func.isRequired,
  updateGeneralInfo: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const GeneralInfo: React.FC<Props> = ({ basic_info, fetchGeneralInfo, updateGeneralInfo }) => {
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('');
  const [dateType, setDateType] = useState('dd/mm/yyyy');

  useEffect(() => { fetchGeneralInfo(); }, [fetchGeneralInfo]);

  useEffect ( () => {
    setName(basic_info && basic_info.name ? basic_info.name : '');
    setCurrency(basic_info && basic_info.currency ? basic_info.currency : '');
    setDateType(basic_info && basic_info.date_type ? basic_info.date_type : 'dd/mm/yyyy');
  }, [basic_info]);

  const onInputChange = (attr: string, value: string) => {
    if (attr === 'name') {
      setName(value);
    }
    if (attr === 'date_type') {
      setDateType(value);
    }
    if (attr === 'currency') {
      setCurrency(value);
    }
    onUpdate({
      [attr]: value
    });
  };

  const onUpdate = (data: any) => {
    updateGeneralInfo({
      name,
      currency,
      date_type: dateType,
      ...data
    });
  };

  return (
    <div className="generalInfo-Page">
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
            <TextField
              placeholder="Trip Ninja Inc."
              variant="outlined"
              value={name}
              onChange={(ev) => onInputChange('name', ev.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} className="page-row">
        <Grid item sm={6} xs={12}>
          <FormLabel className="radio-label">Default Currency</FormLabel>
          <FormControl>
            <Currency
              value={currency}
              onChange={(value) => onInputChange('currency', value)}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormLabel className="radio-label">Default Calendar layout</FormLabel>
          <FormControl>
            <RadioGroup
              row
              value={dateType}
              onChange={(ev) => onInputChange('date_type', ev.target.value)}>
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
    basic_info: getGeneralInfo(state.users),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchGeneralInfo: bindActionCreators(fetchGeneralInfo, dispatch),
  updateGeneralInfo: bindActionCreators(updateGeneralInfo, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralInfo);
