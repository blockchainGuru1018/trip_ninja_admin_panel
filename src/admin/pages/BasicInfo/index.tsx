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

import {
  Currency,
  UsernameField
} from "../../components";
import PropTypes from "prop-types";

import {bindActionCreators, Dispatch} from "redux";

import { fetchBasicInfo } from "../../store/users/actions";

import "./styles.css";
import {getBasicInfo} from "../../store/users/selectors";

const propTypes = {
  basic_info: PropTypes.any.isRequired,
  fetchBasicInfo: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const BasicInfo: React.FC<Props> = ({ basic_info, fetchBasicInfo }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [currency, setCurrency] = useState('');
  const [dateType, setDateType] = useState('dd/mm/yyyy');

  useEffect(() => { fetchBasicInfo(); }, []);

  useEffect ( () => {
    setName(basic_info? basic_info.name : '');
    setPhoneNumber(basic_info? basic_info.phone_number : '');
    setEmail(basic_info? basic_info.email_address : '');
    setCurrency(basic_info? basic_info.currency : '');
    setDateType(basic_info? basic_info.date_type : 'dd/mm/yyyy');
  }, [basic_info]);


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

        <UsernameField
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
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
            <TextField
              placeholder="email@email.com"
              value={email}
              variant="outlined"
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} className="page-row">
        <Grid item sm={6} xs={12}>
          <FormLabel className="radio-label">Default Currency</FormLabel>
          <FormControl>
            <Currency />
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
)(BasicInfo);
