import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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

  return (
    <Grid container justify='center' spacing={2}>
      {data &&
        data.map((value) => {
          let id = value.url.split('/')[6];

          return (
            <Grid key={value.name} item>
              <Link to={`/pokemon/${id}`}>
                <Paper elevation={2} className={classes.paper}>
                  {value.name}
                </Paper>
              </Link>
            </Grid>
          );
        })}
    </Grid>
  );
}
