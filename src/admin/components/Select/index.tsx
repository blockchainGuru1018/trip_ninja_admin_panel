import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, SearchOutlined } from "@material-ui/icons";
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState(false);
  let selectedOptions: any = multiple ? (
    options.filter((el) => value.includes(el.value))
  ) : (
    options.find((el) => el.value === value)
  )

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

      return null;
    }

    return selectedOptions ? selectedOptions.label : null;
  }

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsOpened(!isOpened);
  }

  const onClose = () => {
    setIsOpened(false)
  };

  const handleChange = (opt: any) => {
    if (!multiple) {
      setIsOpened(false);
      onChange && onChange(opt.value)
    } else {
      onChange && onChange([
        ...selectedOptions.map((el: any) => el.value),
        opt.value
      ])
    }
  }

  return (
    <div className={classNames(className, classes.root)}>
      <TextField
        className={classes.input}
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
        <div onClick={(e) => e.stopPropagation()}>
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
              // container: (provided) => ({ ...provided, zIndex: 999 }),
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

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    border: '1px solid #DEDEDF',
    borderRadius: 4
  },
  input: {
    width: '100%',
    cursor: 'pointer',

    '& input': {
      fontFamily: 'NeuzitGrotesk',
      fontSize: 14,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .Mui-disabled': {
      cursor: 'pointer'
    }
  }
}));

export default Select;