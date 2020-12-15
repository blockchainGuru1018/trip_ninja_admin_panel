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
import {
  Currency,
  UsernameField
} from "../../components";

import { fetchBasicInfo, updateBasicInfo } from "../../store/users/actions";
import {getBasicInfo} from "../../store/users/selectors";

import "./styles.css";

const propTypes = {
  basic_info: PropTypes.any.isRequired,
  fetchBasicInfo: PropTypes.func.isRequired,
  updateBasicInfo: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const BasicInfo: React.FC<Props> = ({ basic_info, fetchBasicInfo, updateBasicInfo }) => {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [currency, setCurrency] = useState('');
  const [dateType, setDateType] = useState('dd/mm/yyyy');

  useEffect(() => { fetchBasicInfo(); }, []);

  useEffect ( () => {
    setName(basic_info? basic_info.name : '');
    if (basic_info && basic_info.phone_number) {
      const arr = basic_info.phone_number.split('-');
      setCountryCode(arr[0]);
      arr.splice(0, 1);
      setPhoneNumber(arr.join());
    } else {
      setCountryCode('');
      setPhoneNumber('');
    }
    setEmail(basic_info? basic_info.email_address : '');
    setCurrency(basic_info? basic_info.currency : '');
    setDateType(basic_info? basic_info.date_type : 'dd/mm/yyyy');
  }, [basic_info]);

  const onInputChange = (attr: string, value: string) => {
    let phone_number = phoneNumber;
    let country_code = countryCode;

    switch(attr) {
      case 'name':
        setName(value);
        break;
      case 'country_code':
        country_code = value;
        setCountryCode(value);
        break;
      case 'phone_number':
        phone_number = value;
        setPhoneNumber(value);
        break;
      case 'email_address':
        setEmail(value);
        break;
      case 'date_type':
        setDateType(value);
        break;
      case 'currency':
        setCurrency(value);
        break;
    }

    if (country_code || phone_number) {
      phone_number = `${country_code}-${phone_number}`;
    } else {
      phone_number = '';
    }
    if (['country_code', 'country_code'].includes(attr)) {
      onUpdate({ phone_number });
    } else {
      onUpdate({
        [attr]: value,
        phone_number
      });
    }
  };

  const onUpdate = (data: any) => {
    updateBasicInfo({
      name,
      email_address: email,
      currency,
      date_type: dateType,
      ...data
    });
  };


  return (
    <div className="basicInfo-Page">
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
          onChange={(ev) => onInputChange('name', ev.target.value)}
        />
      </div>
      <Grid container spacing={3} className="page-row">
        <Grid item sm={6} xs={12}>
          <FormLabel className="radio-label">Phone Number</FormLabel>
          <FormControl className="phone-input-field">
            <TextField
              className="country-code-input"
              placeholder="XXX"
              variant="outlined"
              value={countryCode}
              onChange={(ev) => onInputChange('country_code', ev.target.value)}
              inputProps={{ maxLength: 3 }}
            />
            <TextField
              className="phone-number-input"
              placeholder="XXX"
              variant="outlined"
              value={phoneNumber}
              onChange={(ev) => onInputChange('phone_number', ev.target.value)}
              inputProps={{ maxLength: 11 }}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormLabel className="radio-label">Email Address</FormLabel>
          <FormControl>
            <TextField
              placeholder="email@email.com"
              value={email}
              variant="outlined"
              onChange={(ev) => onInputChange('email_address', ev.target.value)}
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
    basic_info: getBasicInfo(state.users),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBasicInfo: bindActionCreators(fetchBasicInfo, dispatch),
  updateBasicInfo: bindActionCreators(updateBasicInfo, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicInfo);
