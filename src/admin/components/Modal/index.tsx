import React from 'react';
import { Backdrop, Fade, Modal as ReactModal, Typography } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import "./styles.css";

const propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  opened: PropTypes.bool,
  onClose: PropTypes.func,
};

type Props = PropTypes.InferProps<typeof propTypes>

const Modal:React.FC<Props> = ({ title, className, opened, onClose, children }) => {

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <ReactModal
      className={classNames("modal-Component", className)}
      open={!!opened}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={!!opened}>
        <div className="modal-content">
          <div className="modal-header">
            {title && (
              <Typography variant="h3" component="h1" className="modal-title">{ title }</Typography>
            )}

            <CloseIcon className="modal-close" onClick={handleClose} />
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </Fade>
    </ReactModal>
  );
};

export default Modal;