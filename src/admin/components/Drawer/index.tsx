import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer as ReactDrawer } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Header, { Props as HeaderProps } from './Header';
import Body, { Props as BodyProps } from './Body';
import Footer, { Props as FooterProps } from './Footer';

const propTypes = {
  className: PropTypes.string,
  opened: PropTypes.bool,
  onClose: PropTypes.func
};

type Props = PropTypes.InferProps<typeof propTypes>

type iDrawer = React.FC<Props> & {
  Header: React.FC<HeaderProps>,
  Body: React.FC<BodyProps>,
  Footer: React.FC<FooterProps>
}

const Drawer:iDrawer = ({ className, opened, onClose, children }) => {
  const classes = useStyles();

  const handleClose = () => {
    onClose && onClose();
  }

  return (
    <ReactDrawer
      anchor="right"
      PaperProps={{
        className: classNames(classes.root, className)
      }}
      open={!!opened}
      onClose={handleClose}
    >
      <div className={classes.content}>
        {children}
        <CloseIcon className={classes.closeIcon} onClick={handleClose} />
      </div>
    </ReactDrawer>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 720
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  closeIcon: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: 30,
    height: 30,
    cursor: 'pointer'
  }
});

Drawer.Header = Header;
Drawer.Body = Body;
Drawer.Footer = Footer;

export default Drawer;