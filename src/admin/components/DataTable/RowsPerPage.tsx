import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

type Props = PropTypes.InferProps<typeof propTypes>

const DataTable:React.FC<Props> = ({ className, value, onChange }) => {
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('click', closeList);
    } else {
      document.removeEventListener('click', closeList);
    }

    return () => {
      if (isOpened) {
        document.removeEventListener('click', closeList);
      }
    }
  }, [isOpened]);

  const closeList = () => {
    setIsOpened(false);
  }

  const onClickItem = (val: number) => {
    setIsOpened(false);

    if (onChange) {
      onChange(val);
    }
  }

  return (
    <div className={classNames(classes.root, className)}>
      <Button className={classes.ddSelected} onClick={() => setIsOpened(true)}>{value} per page</Button>

      {isOpened && (
        <ul className={classes.ddContainer}>
          <li className={classes.ddItem} onClick={() => onClickItem(10)}>
            10 per page
          </li>
          <li className={classes.ddItem} onClick={() => onClickItem(25)}>
            25 per page
          </li>
          <li className={classes.ddItem} onClick={() => onClickItem(50)}>
            50 per page
          </li>
        </ul>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    position: 'relative'
  },
  ddSelected: {
    color: '#00B4C3',
    textTransform: 'none',
    fontFamily: 'NeuzitGrotesk',
    fontSize: 16,
    fontWeight: 'bold',
    borderBottom: '2px solid #00B4C3',
    borderRadius: 0,
    padding: '0 8px'
  },
  ddContainer: {
    position: 'absolute',
    left: 0,
    bottom: '100%',
    width: '100%',
    background: 'white',
    boxShadow: '0px 3px 6px #45565E0F',
    border: '1px solid #45565E41',
    padding: '8px 0',
    marginBottom: 12,

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '50%',
      width: 20,
      height: 20,
      background: 'white',
      borderBottom: '1px solid #45565E41',
      borderRight: '1px solid #45565E41',
      transform: 'translate(-50%, -50%) rotate(45deg)'
    }
  },
  ddItem: {
    display: 'flex',
    padding: '8px 12px',
    fontSize: 14,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    cursor: 'pointer',

    '&:hover': {
      background: '#45565E0D'
    }
  }
});

export default DataTable;
