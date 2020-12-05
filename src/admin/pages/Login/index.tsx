import React, { useState } from 'react';
import { connect } from "react-redux";
import {
  Button,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Container
} from '@material-ui/core';
import PropTypes from "prop-types";
import { bindActionCreators, Dispatch } from "redux";

import { login } from "../../store/auth/actions";

import "./styles.css";

const propTypes = {
  login: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const Login: React.FC<Props> = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    login({ username: email, password })
  }

  return (
    <div className="login__Page">
      <Typography variant="h3" component="h3">
        Login
      </Typography>

      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormLabel>Email Address</FormLabel>
              <FormControl fullWidth>
                <TextField
                  type="email"
                  placeholder="email@email.com"
                  variant="outlined"
                  required
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Password</FormLabel>
              <FormControl fullWidth>
                <TextField
                  type="password"
                  placeholder="Type password"
                  variant="outlined"
                  required
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                className="btn-filled"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: bindActionCreators(login, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
