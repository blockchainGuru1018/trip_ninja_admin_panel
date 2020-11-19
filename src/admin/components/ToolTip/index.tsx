import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const ToolTip: React.FC<Props> = ({ text, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.tooltip}>
      {children}
      <div className="tooltip-content">
        {text}
      </div>
    </div>
  )
};

const useStyles = makeStyles(() => ({
  tooltip: {
    position: 'relative',

    '&:hover .tooltip-content': {
      display: 'block'
    }
  }
}));

export default ToolTip;