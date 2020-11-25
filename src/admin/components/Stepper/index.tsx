import React from 'react';
import { Step, StepLabel, Stepper as ReactStepper } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import "./styles.css";

const propTypes = {
  className: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeStep: PropTypes.number
};

type Props = PropTypes.InferProps<typeof propTypes>

const Stepper:React.FC<Props> = ({ className, steps, activeStep, children }) => {

  return (
    <div className={classNames("stepper__Component", className)}>
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
};

export default Stepper;