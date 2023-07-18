import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import { TextField, InputAdornment } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, SearchOutlined } from "@material-ui/icons";
import classNames from 'classnames';
import PropTypes from 'prop-types';

import "./styles.css";

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

type Props = PropTypes.InferProps<typeof propTypes>

const Select:React.FC<Props> = ({ className, value, options, multiple, placeholder, onChange }) => {
  const [isOpened, setIsOpened] = useState(false);
  let selectedOptions: any = multiple ? (
    options.filter((el) => value.includes(el.value))
  ) : (
    options.find((el) => el.value === value)
  );

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('click', onClose);
    } else {
      document.removeEventListener('click', onClose);
    }

    return () => {
      if (isOpened) {
        document.removeEventListener('click', onClose);
      }
    }
  }, [isOpened]);

  const getValue = () => {
    if (multiple) {
      if (selectedOptions.length > 0) {
        let val = selectedOptions[0].label;

        if (selectedOptions.length > 1) {
          val += `, +${selectedOptions.length - 1}`;
        }

        return val;
      }

      return "";
    }

    return selectedOptions ? selectedOptions.label : "";
  };

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsOpened(!isOpened);
  };

  const onClose = () => {
    setIsOpened(false)
  };

  const handleChange = (opt: any) => {
    if (!onChange) return;

    if (!multiple) {
      setIsOpened(false);
      if (value === opt.value) {
        onChange(undefined);
      } else {
        onChange(opt.value)
      }
    } else {
      const isSelected = selectedOptions.find((el: any) => el.value === opt.value);

      if (!isSelected) {
        onChange([
          ...selectedOptions.map((el: any) => el.value),
          opt.value
        ])
      } else {
        onChange(selectedOptions.filter((el: any) => el.value !== opt.value).map((el: any) => el.value))
      }
    }
  };

  return (
    <div className={classNames(className, "select-Component")}>
      <TextField
        className={classNames("input", {
          "opened": isOpened
        })}
        disabled
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isOpened ? (
                <ArrowDropUp />
              ) : (
                <ArrowDropDown />
              )}
            </InputAdornment>
          )
        }}
        onClick={onClick}
        placeholder={placeholder || ''}
        value={getValue()}
        variant="outlined"
      />
      {isOpened && (
        <div className="select-container" onClick={(e) => e.stopPropagation()}>
          <ReactSelect
            autoFocus
            components={{
              DropdownIndicator: () => <SearchOutlined style={{ width: 18, height: 18 }} />,
              IndicatorSeparator: null,
            }}
            controlShouldRenderValue={false}
            isClearable={false}
            menuIsOpen
            onChange={handleChange}
            options={options}
            placeholder="Search"
            styles={{
              control: (provided, state) => ({
                ...provided,
                minWidth: 240,
                minHeight: 32,
                margin: 8,
                borderRadius: 'none',
                boxShadow: 'none',
                cursor: 'text',

                borderColor: state.isFocused ? '#0DBE7C' : provided.borderColor,
                '&:hover': {
                  borderColor: '#0DBE7C'
                },
              }),
              menu: () => ({ width: '100%' }),
              indicatorsContainer: (provided) => ({ ...provided, paddingRight: 8 }),
              placeholder: (provided) => ({
                ...provided,
                fontFamily: 'NeuzitGrotesk',
                fontSize: 14,
                color: '#B1BBC0'
              }),
              input: (provided) => ({
                ...provided,
                fontFamily: 'NeuzitGrotesk',
                fontSize: 14,
                color: '#B1BBC0'
              }),
              option: (provided, state) => {
                return {
                ...provided,
                fontFamily: 'NeuzitGrotesk',
                fontSize: 14,
                color: '#45565E',
                backgroundColor: state.isSelected ? '#F8F8F9' : 'transparent',
                fontWeight: state.isSelected || state.isFocused ? 'bold' : provided.fontWeight,
                cursor: 'pointer',

                '&:active': {
                  backgroundColor: '#F8F8F9'
                }
              }},
            }}
            value={selectedOptions}
          />
        </div>
      )}
    </div>
  );
};

export default Select;