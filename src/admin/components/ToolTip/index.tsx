import React from 'react';
import PropTypes from 'prop-types';

import "./styles.css";

const propTypes = {
  text: PropTypes.string.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const ToolTip: React.FC<Props> = ({ text, children }) => {

  return (
    <div className="tooltip-Component">
      <div className="tooltip">
        {children}
        <div className="tooltip-content">
          {text}
        </div>
      </div>
    </div>
  )
};

export default ToolTip;