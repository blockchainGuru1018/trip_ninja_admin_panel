import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
};

export type Props = PropTypes.InferProps<typeof propTypes>

const Header: React.FC<Props> = ({ className, children }) => {

  return (
    <div className={classNames("drawer-header", className)}>
      {children}
    </div>
  );
};

export default Header;