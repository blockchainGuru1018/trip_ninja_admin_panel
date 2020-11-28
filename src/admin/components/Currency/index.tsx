import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Select } from "../../components";

import "./styles.css";

const propTypes = {
  className: PropTypes.string,
};

type Props = PropTypes.InferProps<typeof propTypes>

const Currency:React.FC<Props> = ({ className}) => {
  return (
    <div className={classNames(className, "currency__Component")}>
      <Select
        className="select"
        options={[
          { value: 'cad', label: 'CAD' },
          { value: 'usd', label: 'USD' },
          { value: 'eur', label: 'EUR' },
        ]}
        value="usd"
        placeholder="Default currency"
      />
    </div>
  );
};

export default Currency;