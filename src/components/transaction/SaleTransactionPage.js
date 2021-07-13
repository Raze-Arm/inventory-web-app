import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Card, Grid, Header, Image, Input, Table} from "semantic-ui-react";

import {getSaleTrPage} from "../../actions/transaction";
import AppPagination from "../AppPagination";
import moment from "jalali-moment";
import {convertToPersianNumber, numberWithCommas} from "../../utility/numberConverter";
import {BACKEND_API} from "../../apis/address";

class  SaleTransactionPage extends  React.Component {
    state = {search: ''};

    renderSmall = (items) => {
        return (
            <React.Fragment key={'mobile'}     >
                {_.map(items ,(tr, i) => {
                    return (
                        <Card fluid raised key={i}>
                            <Grid celled    padded >
                                <Grid.Row key={tr.productName}>
                                    <Grid.Column as={'b'} width={8}>محصول</Grid.Column>
                                    <Grid.Column width={8}>
                                        <Header as={'h4'} image>
                                            {tr.imageAvailable  ? <Image src={BACKEND_API + `/v1/download/small/product/${tr.productId}`}  rounded size='mini' /> : ''}
                                            <Header.Content>{tr.productName}</Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row key={tr.price}>
                                    <Grid.Column as={'b'} width={8}>قیمت</Grid.Column><Grid.Column width={8}>{convertToPersianNumber(numberWithCommas(parseFloat(tr.price)))}</Grid.Column>
                                </Grid.Row>
                                <Grid.Row key={tr.quantity}>
                                    <Grid.Column as={'b'} width={8}>تعداد</Grid.Column><Grid.Column width={8}>{tr.quantity.toLocaleString('fa')}</Grid.Column>
                                </Grid.Row>
                                <Grid.Row key={tr.createdDate}>
                                    <Grid.Column as={'b'} width={8}>تاریخ</Grid.Column>
                                    <Grid.Column width={8}>{tr.createdDate ?
                                        convertToPersianNumber(moment(tr.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))
                                        : ''}</Grid.Column>
                                </Grid.Row>

                            </Grid>
                        </Card>
                    )
                })}
            </React.Fragment>
        );
    }


    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    {/*<Table.HeaderCell>شناسه</Table.HeaderCell>*/}
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
                        {/*<Table.Cell>{tr.id}</Table.Cell>*/}
                        <Table.Cell>
                            <Header as={'h4'} image>
                                {tr.imageAvailable  ? <Image src={BACKEND_API + `/v1/download/small/product/${tr.productId}`}  rounded size='mini' /> : ''}
                                <Header.Content>{tr.productName}</Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{convertToPersianNumber(numberWithCommas(parseFloat(tr.price)))}</Table.Cell>
                        <Table.Cell>{tr.quantity.toLocaleString('fa')}</Table.Cell>
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
    debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 500,{ leading: false });
    render() {
        return (
            <React.Fragment>
                <Input icon='search' placeholder='جستجو...' onChange={this.onSearch}  />
                <AppPagination fetchPage={({page, size}) => this.props.getSaleTrPage({page, size})}
                               itemList={Object.values(this.props.transactions)} totalElements={this.props.totalElements}
                               search={this.state.search}
                               renderSmallDevices={this.renderSmall}
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
