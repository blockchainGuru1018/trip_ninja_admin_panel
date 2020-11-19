import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField } from "@material-ui/core";
import PropTypes from 'prop-types';

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const UsernameField: React.FC<Props> = ({ value, onChange }) => {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    <div className={classes.content}>
      {opened ? (
        <TextField value={value} onChange={onChange} variant="outlined" />
      ) : (
        <Typography variant="h3" component="h1" className={classes.label}>{value}</Typography>
      )}
      <span>
        <img
          className={classes.icon}
          src={opened ? require('../../assets/close.svg') : require('../../assets/edit-24px.svg')}
           onClick={() => setOpened(!opened)}
           alt="svg"
        />
      </span>
    </div>
  )
};

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'lighter',
  },
  icon: {
    marginLeft: 13,
    marginTop: 5,
    cursor: 'pointer',
    width: '24px'
  }
}));

export default UsernameField;
