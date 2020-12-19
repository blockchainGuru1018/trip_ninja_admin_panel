import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {
  Button,
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

import { fetchBasicInfo, updateBasicInfo, changePassword } from "../../store/users/actions";
import {getBasicInfo} from "../../store/users/selectors";

import "./styles.css";

const propTypes = {
  basic_info: PropTypes.any.isRequired,
  fetchBasicInfo: PropTypes.func.isRequired,
  updateBasicInfo: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const BasicInfo: React.FC<Props> = ({ basic_info, fetchBasicInfo, updateBasicInfo, changePassword }) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [current_password, setCurrentPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ password?: string }>({});
  const [currency, setCurrency] = useState('');
  const [dateType, setDateType] = useState('dd/mm/yyyy');

  useEffect(() => { fetchBasicInfo(); }, [fetchBasicInfo]);

  useEffect ( () => {
    setFirstName(basic_info? basic_info.first_name : '');
    setLastName(basic_info? basic_info.last_name : '');
    if (basic_info && basic_info.phone_number) {
      const arr = basic_info.phone_number.split('-');
      setCountryCode(arr[0]);
      arr.splice(0, 1);
      setPhoneNumber(arr.join());
    } else {
      setCountryCode('');
      setPhoneNumber('');
    }
    setEmail(basic_info && basic_info.email_address ? basic_info.email_address : '');
    setCurrency(basic_info? basic_info.currency : '');
    setDateType(basic_info && basic_info.date_type ? basic_info.date_type : 'dd/mm/yyyy');
  }, [basic_info]);

  const onInputChange = (attr: string, value: string) => {
    let phone_number = phoneNumber;
    let country_code = countryCode;

    switch(attr) {
      case 'first_name':
        setFirstName(value);
        break;
      case 'last_name':
        setLastName(value);
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
      first_name,
      last_name,
      email_address: email,
      currency,
      date_type: dateType,
      ...data
    });
  };

  const onChangePassword =() => {
    if (new_password === confirm_password) {
      changePassword({
        current_password,
        new_password
      });
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
      setErrors({})
    }
    else {
      setErrors({
        password: 'Does not match password'
      })
    }
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
          first_name={first_name}
          last_name={last_name}
          onChange={(ev, attr) => onInputChange(attr, ev.target.value)}
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

      <Grid container spacing={3}>
        <Grid item sm={3} xs={12}>
          <FormLabel className="current-password">Current Password</FormLabel>
          <FormControl>
            <TextField
              type="password"
              className="password-input"
              placeholder="Current Password"
              variant="outlined"
              value={current_password}
              onChange={(ev) => setCurrentPassword(ev.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item sm={3} xs={12}>
          <FormLabel className="new-password">New Password</FormLabel>
          <FormControl>
            <TextField
              type="password"
              className="password-input"
              placeholder="New Password"
              variant="outlined"
              value={new_password}
              onChange={(ev) => setNewPassword(ev.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item sm={3} xs={12}>
          <FormLabel className="confirm-password">Confirm Password</FormLabel>
          <FormControl>
            <TextField
              type="password"
              className="password-input"
              placeholder="New Password"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password}
              value={confirm_password}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <div className="btn-group">
        <Button
          variant="outlined"
          className="btn-primary"
          onClick={onChangePassword}
        >
          Change Password
        </Button>
      </div>
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
  changePassword: bindActionCreators(changePassword, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicInfo);
