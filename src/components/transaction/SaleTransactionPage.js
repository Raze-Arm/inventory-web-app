import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Input, Table} from "semantic-ui-react";

import {getSaleTrPage} from "../../actions/transaction";
import AppPagination from "../AppPagination";
import moment from "jalali-moment";
import {convertToPersianNumber} from "../../utility/numberConverter";

class  SaleTransactionPage extends  React.Component {
    state = {search: ''}
    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    <Table.HeaderCell>شناسه</Table.HeaderCell>
                    <Table.HeaderCell>محصول</Table.HeaderCell>
                    <Table.HeaderCell>قیمت</Table.HeaderCell>
                    <Table.HeaderCell>تعداد</Table.HeaderCell>
                    <Table.HeaderCell>تاریخ</Table.HeaderCell>
                </Table.Row>
            </React.Fragment>
        );
    }

    renderRows = (items) => {
        return (
            _.map(items , (tr) => {
                if(!tr) return ;
                return (
                    <Table.Row key={tr.id}>
                        <Table.Cell>{tr.id}</Table.Cell>
                        <Table.Cell>{tr.productName}</Table.Cell>
                        <Table.Cell>{tr.price}</Table.Cell>
                        <Table.Cell>{tr.quantity}</Table.Cell>
                        <Table.Cell>
                            {convertToPersianNumber(moment(tr.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))}
                        </Table.Cell>

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
                <Input icon='search' placeholder='جستجو...' onChange={this.onSearch}  />
                <AppPagination fetchPage={({page, size}) => this.props.getSaleTrPage({page, size})}
                               itemList={Object.values(this.props.transactions)} totalElements={this.props.totalElements}
                               search={this.state.search}
                               renderHeaders={this.renderHeaders()}
                               renderRows={this.renderRows} pageCount={this.props.pageCount}/>
            </React.Fragment>

        );
    }

}

const mapStateToProps =(state) => {
    const {items, totalPages, totalElements} = state.transaction.sale;
    return {transactions: items, pageCount: totalPages, totalElements};
}


export default connect(mapStateToProps, {getSaleTrPage})(SaleTransactionPage);
