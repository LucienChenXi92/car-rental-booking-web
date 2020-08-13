import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Table, TableHead, TableRow, TableBody, TableCell, Button } from '@material-ui/core';
import PendingBlock from './common/PendingBlock';
import { DOMAIN } from '../config/config';

const classes = (theme) => ({
    root: {
        minHeight: 200,
    },
});

function aggregateStockData(data) {
    if (!data || data.length === 0) {
        return [];
    }

    const carIds = new Set();
    data.forEach(i => {
        carIds.add(i.carId);
    });

    const result = [];
    carIds.forEach(id => {
        let stocks = _.filter(data, (o) => o.carId === id);
        result.push({
            carId: id, brand: stocks[0].brand, model: stocks[0].model,
            costPerDay: stocks[0].costPerDay, count: stocks.length
        });
    })
    return result;
}

class StockPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            promise: "pending",
            data: []
        }
    }

    componentDidMount() {
        this.fetchAllAvailableStockData();
    }

    booking(carId) {
        let targetDate = new Date().getDate() + 1;
        let targetTime = new Date();
        targetTime.setDate(targetDate);
        axios.post(`${DOMAIN}/api/order`, {
            carId,
            rentalStartTime: new Date().toISOString(),
            rentalTargetEndTime: targetTime.toISOString(),
            userId: "lucien"
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

    fetchAllAvailableStockData() {
        axios.get(`${DOMAIN}/api/available-stocks`)
            .then((response) => {
                const aggregatedData = aggregateStockData(response.data);
                this.setState({ data: aggregatedData, promise: "fulfilled" });
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
                            <TableCell>NO.</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Cost($/day)</TableCell>
                            <TableCell>Available Number</TableCell>
                            <TableCell>Operation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item =>
                            <TableRow key={item.carId}>
                                <TableCell>{item.carId}</TableCell>
                                <TableCell>{item.brand}</TableCell>
                                <TableCell>{item.model}</TableCell>
                                <TableCell>{item.costPerDay}</TableCell>
                                <TableCell>{item.count}</TableCell>
                                <TableCell>
                                    <Button onClick={() => this.booking(item.carId)}
                                            variant="outlined" color="primary">Book</Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>}
            </Grid>
        );
    }
}

export default withStyles(classes)(StockPanel)