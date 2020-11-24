import React from 'react';
import { Typography } from '@material-ui/core';

import useSharedStyles from "../../globalStyles";

const ContentSources: React.FC = () => {
  const sharedClasses = useSharedStyles();

  return (
    <>
      <div className={sharedClasses.pageHeader}>
        <Typography variant="h3" component="h1" className={sharedClasses.pageTitle}>
          Content Sources
        </Typography>
      </div>
      <Typography className={sharedClasses.pageDescription}>
        Email support@tripninja.io with questions or concerns about data sources.
      </Typography>
    </>
  )
};

export default ContentSources
