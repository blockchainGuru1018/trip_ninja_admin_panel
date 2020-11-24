import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Fade, Modal as ReactModal, Typography } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  opened: PropTypes.bool,
  onClose: PropTypes.func,
};

type Props = PropTypes.InferProps<typeof propTypes>

const Modal:React.FC<Props> = ({ title, className, opened, onClose, children }) => {
  const classes = useStyles();

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <ReactModal
      className={classNames(classes.modal, className)}
      open={!!opened}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={!!opened}>
        <div className={classes.modalContent}>
          <div className={classes.modalHeader}>
            <Typography variant="h3" component="h1" className={classes.modalTitle}>{ title }</Typography>

            <CloseIcon className={classes.modalClose} onClick={handleClose} />
          </div>
          <div className={classes.modalBody}>
            {children}
          </div>
        </div>
      </Fade>
    </ReactModal>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 15px'
  },
  modalContent: {
    border: '1px solid #B1BBC0',
    boxShadow: '0px 3px 6px #45565E29',
    width: '100%',
    maxWidth: 720,
    outline: 'none !important'
  },
  modalHeader: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    background: '#45565E'
  },
  modalTitle: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'bold',
  },
  modalClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    fill: 'white',
    cursor: 'pointer'
  },
  modalBody: {
    background: 'white'
  }
}));

export default Modal;