import React from 'react';
import { Drawer as ReactDrawer } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Header, { Props as HeaderProps } from './Header';
import Body, { Props as BodyProps } from './Body';
import Footer, { Props as FooterProps } from './Footer';

import "./styles.css";

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

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <ReactDrawer
      anchor="right"
      PaperProps={{
        className: classNames("drawer-Component", className)
      }}
      open={!!opened}
      onClose={handleClose}
    >
      <div className="content">
        {children}
        <CloseIcon className="closeIcon" onClick={handleClose} />
      </div>
    </ReactDrawer>
  );
};

Drawer.Header = Header;
Drawer.Body = Body;
Drawer.Footer = Footer;

export default Drawer;