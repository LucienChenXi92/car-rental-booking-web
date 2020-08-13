import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonAppBar from './components/ButtonAppBar';
import StockPanel from './components/StockPanel';
import RentalOrderPanel from './components/RentalOrderPanel';

const useStyles = makeStyles((theme) => ({
  welcomePanel: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
    borderBottom: '1px solid #dedcdc'
  },
  stockPanel: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
  },
  orderPanel: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
  }
}));

const App = (props) => {
  const classes = useStyles();
  return (
    <Grid container>
      <ButtonAppBar />
      <Grid container className={classes.welcomePanel}>
        <Typography variant="h3" color="textSecondary">Welcome Lucien</Typography>
      </Grid>
      <Grid container className={classes.stockPanel}>
        <Typography variant="h5" color="textSecondary">Stock Information</Typography>
        <StockPanel />
      </Grid>
      <Grid container className={classes.orderPanel}>
        <Typography variant="h5" color="textSecondary">Rental Order Information</Typography>
        <RentalOrderPanel />
      </Grid>
    </Grid>
  );
}

export default App;
