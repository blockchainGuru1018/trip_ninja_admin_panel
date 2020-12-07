import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Select } from "../../components";

import "./styles.css";

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func
};

type Props = PropTypes.InferProps<typeof propTypes>

const Currency:React.FC<Props> = ({ className, value}) => {
  let [currencyID , setCurrencyID] = useState(undefined);
  useEffect ( () => {
    setCurrencyID(value? currencyID = value : undefined);
  }, [value]);

  return (
    <div className={classNames(className, "currency__Component")}>
      <Select
        className="select"
        options={[
          { value: 'CAD', label: 'CAD' },
          { value: 'USD', label: 'USD' },
          { value: 'INR', label: 'INR' },
        ]}
        value={currencyID}
        placeholder="Default currency"
        onChange={setCurrencyID}
      />
    </div>
  );
};

export default Currency;