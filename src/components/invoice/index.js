import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Container, Segment, Table, Menu, Header, Button, Input} from "semantic-ui-react";

import {getInvoicePage} from "../../actions/invoice";
import PurchaseInvoicePage from  '../purchase-invoice';
import SaleInvoicePage from '../sale-invoice';
import history from "../../history";
import AppPagination from "../AppPagination";
import moment from "jalali-moment";
import {convertToPersianNumber} from "../../utility/numberConverter";

const ALL = 'همه';
const PURCHASE = 'خرید';
const SALE=  'فروش';
class Index extends React.Component {
    state = {activeItem: ALL, search: ''};




    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    {/*<Table.HeaderCell>شناسه</Table.HeaderCell>*/}
                    <Table.HeaderCell>نام</Table.HeaderCell>
                    <Table.HeaderCell>نوع</Table.HeaderCell>
                    <Table.HeaderCell>تاریخ</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </React.Fragment>
        );
    }


    renderRows = (items) => {
        return (
            _.map(items , (i) => {
                if(!i) return ;
                return (
                    <Table.Row key={i.id}>
                        {/*<Table.Cell>{i.id}</Table.Cell>*/}
                        <Table.Cell>{i.name}</Table.Cell>
                        <Table.Cell>{i.type}</Table.Cell>
                        <Table.Cell>
                            {convertToPersianNumber(moment(i.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm - YYYY/MM/DD'))}
                        </Table.Cell>
                        <Table.Cell>
                            <Button color={"green"} inverted onClick={() => history.push(`/${i.type}-invoice/show/${i.id}`)}  >نمایش</Button>
                            <Button color={"red"} inverted onClick={() => history.push(`/${i.type}-invoice/delete/${i.id}`)}>حذف</Button>
                        </Table.Cell>
                    </Table.Row>
                );
            })
        );
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    renderInvoiceNavigation = () => {
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
    debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 1000,{ leading: false });
    renderAllInvoices = () => {
        return (
            <React.Fragment>
                <Input icon='search' placeholder='جستجو...' onChange={this.onSearch}  />
                <AppPagination fetchPage={({page, size}) => this.props.getInvoicePage({page, size})}
                               itemList={Object.values(this.props.invoices)} totalElements={this.props.totalElements}
                               search={this.state.search}
                               renderHeaders={this.renderHeaders()}
                               renderRows={this.renderRows} pageCount={this.props.pageCount}/>
            </React.Fragment>

        );
    }

    render() {
        const {activeItem} = this.state;
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}}>
                < Header >صورتحساب</Header>
                {this.renderInvoiceNavigation()}
                <Segment  secondary  basic style={{ margin: '0', padding: '0'}} >


                    {activeItem === ALL && this.renderAllInvoices()}
                    {activeItem === PURCHASE && <PurchaseInvoicePage />}
                    {activeItem === SALE && <SaleInvoicePage />}
                </Segment>
            </Container>
        );
    }



}


const mapStateToProps = (state) => {
    const {items, totalPages, totalElements} =  state.invoice;
    return {invoices: items, pageCount: totalPages, totalElements};
}


export default connect(mapStateToProps, {getInvoicePage})(Index);