import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useSharedStyles from '../../globalStyles';

const BillingAccountManagement: React.FC = () => {
  const classes = useStyles();
  const sharedClasses = useSharedStyles();

  return (
    <>
      <div className={sharedClasses.pageHeader}>
        <Typography variant="h3" component="h1" className={sharedClasses.pageTitle}>
          Billing and Account Management
        </Typography>
      </div>
      <Typography className={sharedClasses.pageDescription}>
        Email support@tripninja.io with questions about your subscription or to change your subscription type.
      </Typography>
    </>
  )
};

const useStyles = makeStyles({
});

export default BillingAccountManagement
