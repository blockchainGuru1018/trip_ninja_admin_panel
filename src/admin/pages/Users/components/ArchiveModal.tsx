import React from 'react';
import { connect } from "react-redux";
import { Button, Typography } from '@material-ui/core';
import PropTypes from "prop-types";
import { bindActionCreators, Dispatch } from "redux";

import { Modal } from '../../../components';

import { archiveUser } from "../../../store/users/actions";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.any,
  archiveUser: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const ArchiveModal: React.FC<Props> = ({ opened, onClose, user, archiveUser }) => {
  const onArchive = () => {
    archiveUser(user.user_id);
    onClose();
  };

  return (
    <Modal
      className="user-Page-archive-modal"
      opened={opened}
      onClose={onClose}
    >
      <Typography variant="h3" component="h3">
        Are you sure you want to archive this user?
      </Typography>
      <Typography className="description">
        You can reinstate them at any time from the users menu.
      </Typography>
      <div className="actions">
        <Button
          variant="outlined"
          className="btn-primary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className="btn-filled"
          onClick={onArchive}
        >
          {user && user.is_active ? 'Archive User' : 'Recover User'}
        </Button>
      </div>
    </Modal>
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  archiveUser: bindActionCreators(archiveUser, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(ArchiveModal);
