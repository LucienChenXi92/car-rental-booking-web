import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function PendingBlock(){
    return(
        <Grid container justify={'center'} alignItems={'center'} direction={'column'} style={{paddingTop:30,paddingBottom:30}}>
            <Grid item><CircularProgress/></Grid>
            <Grid item><Typography variant={'subtitle1'} color={'textSecondary'}><strong>Loading...</strong></Typography></Grid>
        </Grid>
    )
}