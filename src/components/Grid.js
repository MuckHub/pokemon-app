import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 60,
    width: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function SpacingGrid({ data }) {
  const classes = useStyles();

  if (!data) return <CircularProgress />;

  return (
    <Grid container justify='center' spacing={2}>
      {data &&
        data.map((value) => (
          <Grid key={value.name} item>
            <Paper elevation={2} className={classes.paper}>
              {value.name}
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
}
