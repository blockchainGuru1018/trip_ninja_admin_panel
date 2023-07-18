import React, { useState } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
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
  position: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
};

type Props = PropTypes.InferProps<typeof propTypes>

const Dropdown:React.FC<Props> = ({
  className,
  value,
  options,
  placeholder,
  onChange,
  error,
  position
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const optionSelected = options.find((el) => el.value === value);

  const openDropdown = () => {
    setIsOpened(true);

    setTimeout(() => {
      document.addEventListener('click', closeDropdown);
    }, 1);
  };

  const closeDropdown = () => {
    setIsOpened(false);
    document.removeEventListener('click', closeDropdown);
  };

  const onClickItem = (val: string) => {
    closeDropdown();

    onChange && onChange(val);
  };

  return (
    <div className={classNames("dropdown-Component", className)}>
      <Button className={error? "noSelected" : "ddSelected"} onClick={openDropdown}>
        {optionSelected ? optionSelected.label : placeholder ?  placeholder : 'Select'}
        <ArrowDropDown />
      </Button>

      {isOpened && (
        <ul className={`ddContainer ${position ? position : 'bottom'}`}>
          <PerfectScrollbar style={{ maxHeight: 200 }}>
            {options.map((el) => (
              <li key={el.value} className="ddItem" onClick={() => onClickItem(el.value)}>
                {el.label}
              </li>
            ))}
          </PerfectScrollbar>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
