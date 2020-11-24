import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
};

export type Props = PropTypes.InferProps<typeof propTypes>

const Body: React.FC<Props> = ({ className, children }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      {children}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: '24px 30px'
  },
});

export default Body;