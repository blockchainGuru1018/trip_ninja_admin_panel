import React from 'react';
import { Typography } from '@material-ui/core';

import "./styles.css";

const BillingAccountManagement: React.FC = () => {

  return (
    <div className="billing-Account-Management-Page">
      <div className="page-header">
        <Typography variant="h3" component="h1" className="page-title">
          Billing and Account Management
        </Typography>
      </div>
      <Typography
        className="page-description description"
      >
        Email support@tripninja.io with questions about your subscription or to change your subscription type.
      </Typography>
    </div>
  )
};

export default BillingAccountManagement
