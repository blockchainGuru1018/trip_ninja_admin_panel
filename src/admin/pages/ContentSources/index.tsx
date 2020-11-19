import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const ContentSources: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3" component="h1" className={classes.title}>
        Content Sources
      </Typography>
      <Typography className={classes.subtitle}>
        Email support@tripninja.io with questions or concerns about data sources.
      </Typography>
    </>
  )
};

const useStyles = makeStyles({
  title: {
    fontSize: 24,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
  },
  subtitle: {
    fontSize: 16,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    marginTop: 30,
    padding: '24px 16px',
    border: '1px solid #CFD2D5'
  }
});

export default ContentSources
