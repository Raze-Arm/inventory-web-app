import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Button, Card, Container, Grid, Header, Image, Input, Menu, Segment, Table} from "semantic-ui-react";

import {getTransactionPage} from "../../actions/transaction";
import AppPagination from "../AppPagination";
import PurchaseTransactionPage from "./PurchaseTransactionPage";
import SaleTransactionPage from "./SaleTransactionPage";

import moment from "jalali-moment";
import {convertToPersianNumber, numberWithCommas} from "../../utility/numberConverter";
import {BACKEND_API} from "../../apis/address";

const ALL = 'کل';
const PURCHASE = 'خرید';
const SALE = 'فروش';
class Index extends React.Component {
    state = {activeItem: ALL , search: ''};



    renderSmall = (data) => {

        const {activeItem} = this.state;
        // const items = Object.values(this.props.transactions || {}).filter((tr) => {
        const items = Object.values(data || {}).filter((tr) => {
            if(activeItem === PURCHASE) {
                if(tr.type === 'purchase') return true;
                else return false;
            }
            if(activeItem === SALE) {
                if(tr.type === 'sale') return true;
                else return false;
            }
            return true;

        });
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
                                <Grid.Row key={`p.${i}`}>
                                    <Grid.Column as={'b'} width={8}>قیمت</Grid.Column><Grid.Column width={8}>
                                        {convertToPersianNumber(numberWithCommas(parseFloat(tr.price)))}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row key={tr.quantity}>
                                    <Grid.Column as={'b'} width={8}>تعداد</Grid.Column><Grid.Column width={8}>
                                    {tr.quantity.toLocaleString('fa')}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row key={tr.type}>
                                    <Grid.Column as={'b'} width={8}>نوع</Grid.Column><Grid.Column width={8}>
                                    {tr.type.trim() === 'sale' ? 'فروش' : 'خرید'}
                                    </Grid.Column>
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
                    <Table.HeaderCell>نوع</Table.HeaderCell>
                    <Table.HeaderCell>تاریخ</Table.HeaderCell>
                </Table.Row>
            </React.Fragment>
        );
    }


    renderRows = (data) => {
        const {activeItem} = this.state;
        // const items = Object.values(this.props.transactions || {}).filter((tr) => {
        const items = Object.values(data || {}).filter((tr) => {
            if(activeItem === PURCHASE) {
                if(tr.type === 'purchase') return true;
                else return false;
            }
            if(activeItem === SALE) {
                if(tr.type === 'sale') return true;
                else return false;
            }
            return true;

        });
        return (
            _.map(items , (tr, i) => {
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
                        <Table.Cell>{tr.type.trim() === 'sale' ? 'فروش' : 'خرید'}</Table.Cell>
                        <Table.Cell>
                            {convertToPersianNumber(moment(tr.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))}
                        </Table.Cell>

                    </Table.Row>
                );
            })
        );
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    renderTransactionNavigation = () => {
        return (
            <Menu stackable  color={"yellow"} attached={"bottom"}>
                <Menu.Item header name={ALL}
                           active={this.state.activeItem === ALL}
                           onClick={this.handleItemClick}   />
                <Menu.Item
                    name={PURCHASE}
                    active={this.state.activeItem === PURCHASE}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name={SALE}
                    active={this.state.activeItem === SALE}
                    onClick={this.handleItemClick}
                />
            </Menu>
        );
    }

    onSearch = (e ,{value}) => {
        this.debouncedSearch((search) => this.setState({...this.state, search}), value );
    }
    debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 500,{ leading: false });
    renderTransactions = () => {
        return (
            <React.Fragment>
                <Input icon='search' placeholder='جستجو...' onChange={this.onSearch}  />
                <AppPagination fetchPage={({page, size}) => this.props.getTransactionPage({page, size})}
                               itemList={Object.values(this.props.transactions)} totalElements={this.props.totalElements}
                               search={this.state.search}
                               renderSmallDevices={this.renderSmall}
                               renderHeaders={this.renderHeaders()}
                               renderRows={this.renderRows} pageCount={this.props.pageCount}/>
            </React.Fragment>
        );
    }

    renderAllTransactions = () => {
        const {activeItem} = this.state;
        switch (activeItem) {
            case ALL: {
                return this.renderTransactions();
            }
            case PURCHASE: {
                return <PurchaseTransactionPage />
            }
            case  SALE: {
                return <SaleTransactionPage />
            }
            default: {
                return this.renderTransactions();
            }
        }
    }


    render() {

        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}}>

                <Header>تراکنش</Header>
                {this.renderTransactionNavigation()}
                <Segment  secondary  basic style={{ margin: '0'}} >

                    {this.renderAllTransactions()}

                </Segment>

            </Container>
        );
    }

}


const mapStateToProps = (state) => {
    const {items, totalPages, totalElements} = state.transaction;
    return {transactions: items, pageCount: totalPages, totalElements};
}

export default connect(mapStateToProps, {getTransactionPage})(Index);