import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const CurrencySelectForm: React.FC<Props> = ({ value, onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
    </div>
  )
};

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default CurrencySelectForm;
