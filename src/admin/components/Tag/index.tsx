import React from 'react';
import { Close as CloseIcon } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import "./styles.css";

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func
};

type Props = PropTypes.InferProps<typeof propTypes>

const Stepper:React.FC<Props> = ({ className, text, onRemove }) => (
  <div className={classNames("tag-Component", className)}>
    <span>{text}</span>
    {onRemove && (
      <CloseIcon onClick={onRemove} />
    )}
  </div>
);

export default Stepper;