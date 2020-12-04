import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { ArrowDropDown } from "@material-ui/icons";
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

type Props = PropTypes.InferProps<typeof propTypes>

const Dropdown:React.FC<Props> = ({ className, value, options, placeholder, onChange }) => {
  const [isOpened, setIsOpened] = useState(false);
  const optionSelected = options.find((el) => el.value === value);

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('click', closeDropdown);
    } else {
      document.removeEventListener('click', closeDropdown);
    }

    return () => {
      if (isOpened) {
        document.removeEventListener('click', closeDropdown);
      }
    }
  }, [isOpened]);

  const closeDropdown = () => {
    setIsOpened(false);
  };

  const onClickItem = (val: string) => {
    setIsOpened(false);

    onChange && onChange(val);
  };

  return (
    <div className={classNames("dropdown__Component", className)}>
      <Button className="ddSelected" onClick={() => setIsOpened(true)}>
        {optionSelected ? optionSelected.label : placeholder ?  placeholder : 'Select'}
        <ArrowDropDown />
      </Button>

      {isOpened && (
        <ul className="ddContainer">
          {options.map((el) => (
            <li key={el.value} className="ddItem" onClick={() => onClickItem(el.value)}>
              {el.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
