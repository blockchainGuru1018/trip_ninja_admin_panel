import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
};

export type Props = PropTypes.InferProps<typeof propTypes>

const Header: React.FC<Props> = ({ className, children }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      {children}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    margin: '0 30px',
    padding: '24px 36px 24px 0',
    borderBottom: '1px solid #CACDD6'
  },
});

export default Header;