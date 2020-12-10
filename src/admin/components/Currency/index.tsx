import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Select } from "../../components";

import "./styles.css";

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

type Props = PropTypes.InferProps<typeof propTypes>

const Currency:React.FC<Props> = ({ className, value, onChange}) => {
  return (
    <div className={classNames(className, "currency-Component")}>
      <Select
        className="select"
        options={[
          { value: 'CAD', label: 'CAD' },
          { value: 'USD', label: 'USD' },
          { value: 'INR', label: 'INR' },
        ]}
        value={value}
        placeholder="Default currency"
        onChange={onChange}
      />
    </div>
  );
};

export default Currency;