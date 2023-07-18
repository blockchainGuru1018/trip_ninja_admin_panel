import React from 'react';
import { Typography } from '@material-ui/core';

import "./styles.css";

const ContentSources: React.FC = () => {

  return (
    <div className="content-Sources-Page">
      <div className="page-header">
        <Typography variant="h3" component="h1" className="page-title">
          Content Sources
        </Typography>
      </div>
      <Typography className="page-description">
        Email support@tripninja.io with questions or concerns about data sources.
      </Typography>
    </div>
  )
};

export default ContentSources
