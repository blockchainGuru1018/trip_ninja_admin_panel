import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
};

export type Props = PropTypes.InferProps<typeof propTypes>

const Footer: React.FC<Props> = ({ className, children }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      {children}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    padding: 30,
    background: '#F8F8F9',
    borderTop: '1px solid #D1D6D8'
  },
});

export default Footer;