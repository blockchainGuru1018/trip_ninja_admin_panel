import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Switch as ReactSwitch, SwitchProps } from '@material-ui/core';

const Switch: React.FC<SwitchProps> = (props: SwitchProps) => {
  return (
    <ReactSwitch {...props} />
  )
}

export default withStyles({
  switchBase: {
    '&$checked': {
      color: '#0DBE7C',
    },
    '&$checked + $track': {
      backgroundColor: '#0DBE7C',
    },
  },
  checked: {},
  track: {},
})(Switch);