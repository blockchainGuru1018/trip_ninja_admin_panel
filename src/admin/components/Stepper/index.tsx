import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Step, StepLabel, Stepper as ReactStepper } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeStep: PropTypes.number
};

type Props = PropTypes.InferProps<typeof propTypes>

const Stepper:React.FC<Props> = ({ className, steps, activeStep, children }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <ReactStepper activeStep={activeStep || 0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </ReactStepper>
      {children}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);

export default Stepper;