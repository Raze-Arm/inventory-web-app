import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import Moment from "react-moment";
import {Grid, Input, Table} from "semantic-ui-react";

import {getPurchaseTrPage} from "../../actions/transaction";
import AppPagination from "../AppPagination";

class PurchaseTransactionPage extends React.Component {
    state =  {search: ''};
    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>createdDate</Table.HeaderCell>
                </Table.Row>
            </React.Fragment>
        );
    }

    renderRows = (items) => {
        // const items = Object.values(this.props.transactions || {});
        return (
            _.map(items , (tr) => {
                if(!tr) return ;
                return (
                    <Table.Row key={tr.id}>
                        <Table.Cell>{tr.id}</Table.Cell>
                        <Table.Cell>{tr.productName}</Table.Cell>
                        <Table.Cell>{tr.price}</Table.Cell>
                        <Table.Cell>{tr.quantity}</Table.Cell>
                        <Table.Cell>   <Moment
                            format={'YYYY/MM/DD hh:mm'}>{tr.createdDate}</Moment></Table.Cell>

                    </Table.Row>
                );
            })
        );
    }
    onSearch = (e ,{value}) => {
        this.debouncedSearch((search) => this.setState({...this.state, search}), value );
    }
    debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 1000,{ leading: false });
    render() {
        return (
            <React.Fragment>
                <Input icon='search' placeholder='Search...' onChange={this.onSearch}  />
                <AppPagination fetchPage={({page, size}) => this.props.getPurchaseTrPage({page, size})}
                               itemList={Object.values(this.props.transactions)} totalElements={this.props.totalElements}
                               search={this.state.search}
                               renderHeaders={this.renderHeaders()}
                               renderRows={this.renderRows} pageCount={this.props.pageCount}/>
            </React.Fragment>

        );
    }
}


const mapStateToProps =(state) => {
    const {items, totalPages, totalElements} = state.transaction.purchase;
    return {transactions: items, pageCount: totalPages, totalElements};
}

export default connect(mapStateToProps, {getPurchaseTrPage})(PurchaseTransactionPage);
