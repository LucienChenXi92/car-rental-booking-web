import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Table, TableHead, TableRow, TableBody, TableCell, Button } from '@material-ui/core';
import PendingBlock from './common/PendingBlock';
import { DOMAIN } from '../config/config';

const classes = (theme) => ({
    root: {
        minHeight: 200,
    },
});

class RentalOrderPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            promise: "pending",
            data: []
        }
    }

    componentDidMount() {
        this.fetchAllOrderData();
    }

    fetchAllOrderData() {
        axios.get(`${DOMAIN}/api/orders`)
            .then((response) => {
                this.setState({ data: response.data.reverse(), promise: "fulfilled" });
                console.log(response);
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    }

    returnCarToCompany(rentalOrderId) {
        axios.put(`${DOMAIN}/api/order/${rentalOrderId}`, {
            rentalOrderId,
            rentalActualEndTime: new Date().toISOString(),
        }).then((response) => {
            console.log(response);
            window.history.go(0);
        })
        .catch((error) => {
            // handle error
            console.log(error);
        })
        .then(() => {
            // always executed
        });
    }

    deleteRentalOrder(rentalOrderId) {
        axios.delete(`${DOMAIN}/api/order/${rentalOrderId}`, {
            rentalOrderId,
        }).then((response) => {
            console.log(response);
            window.history.go(0);
        })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    }


    render() {
        const { promise, data } = this.state;
        if (promise === "pending") {
            return <PendingBlock />;
        }

        return (
            <Grid container className={this.props.classes.root} >
                {(data && data.length > 0) && <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order NO.</TableCell>
                            <TableCell>Stock Id</TableCell>
                            <TableCell>User Id</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>Target End Time</TableCell>
                            <TableCell>Actual End Time</TableCell>
                            <TableCell>Operation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item =>
                            <TableRow key={item.rentalOrderId}>
                                <TableCell>{item.rentalOrderId}</TableCell>
                                <TableCell>{item.stockId}</TableCell>
                                <TableCell>{item.userId}</TableCell>
                                <TableCell>{item.rentalStartTime}</TableCell>
                                <TableCell>{item.rentalTargetEndTime}</TableCell>
                                <TableCell>{item.rentalActualEndTime && item.rentalActualEndTime }</TableCell>
                                <TableCell>{item.rentalActualEndTime ?
                                    <Button onClick={() => this.deleteRentalOrder(item.rentalOrderId)}
                                            variant="outlined" color="primary">Delete</Button> :
                                    <Button onClick={() => this.returnCarToCompany(item.rentalOrderId)}
                                            variant="outlined" color="primary">Return Car</Button>}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>}
            </Grid>
        );
    }
}

export default withStyles(classes)(RentalOrderPanel)