import React, { useState, useEffect } from 'react';
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
  };

  const onClickItem = (val: number) => {
    setIsOpened(false);

    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div className={classNames("dataTable-rowPerPage-Component", className)}>
      <Button className="ddSelected" onClick={() => setIsOpened(true)}>{value} per page</Button>

      {isOpened && (
        <ul className="ddContainer">
          <li className="ddItem" onClick={() => onClickItem(10)}>
            10 per page
          </li>
          <li className="ddItem" onClick={() => onClickItem(25)}>
            25 per page
          </li>
          <li className="ddItem" onClick={() => onClickItem(50)}>
            50 per page
          </li>
        </ul>
      )}
    </div>
  );
};

export default DataTable;
