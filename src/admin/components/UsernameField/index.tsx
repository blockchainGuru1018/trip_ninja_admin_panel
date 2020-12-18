import React, { useState } from 'react';
import { Typography, TextField } from "@material-ui/core";
import PropTypes from 'prop-types';

import "./styles.css";

const propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const UsernameField: React.FC<Props> = ({ first_name, last_name, onChange }) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="userNameField-Component">
      <div className="content">
        {opened ? (
          <>
            <TextField style={{ marginRight: "20px" }} value={first_name} onChange={(ev) => onChange(ev, 'first_name')} variant="outlined" />
            <TextField value={last_name} onChange={(ev) => onChange(ev, 'last_name')} variant="outlined" />
          </>
        ) : (
          <Typography variant="h3" component="h1" className="label">{`${first_name} ${last_name}`}</Typography>
        )}
        <span>
        <img
          className="icon"
          src={opened ? require('../../assets/close.svg') : require('../../assets/edit-24px.svg')}
          onClick={() => setOpened(!opened)}
          alt="svg"
        />
      </span>
      </div>
    </div>
  )
};

export default UsernameField;
