import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Button, Container, Header, Input, Segment, Table} from "semantic-ui-react";

import {getPInvoicePage} from '../../actions/purchase-invoice';
import history from "../../history";
import AppPagination from "../AppPagination";
import moment from "jalali-moment";
import {convertToPersianNumber, numberWithCommas} from "../../utility/numberConverter";

class Index extends React.Component {
    state = {search: ''}

    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    {/*<Table.HeaderCell>شناسه</Table.HeaderCell>*/}
                    <Table.HeaderCell>تامین کننده</Table.HeaderCell>
                    <Table.HeaderCell>قیمت کل</Table.HeaderCell>
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
               const totalPrice =_.reduce(i?.transactions, (result, value) => result + parseFloat(value.price), 0.0);
                return (
                    <Table.Row key={i.id}>
                        {/*<Table.Cell>{i.id}</Table.Cell>*/}
                        <Table.Cell>{i?.supplier?.firstName} {i?.supplier?.lastName}</Table.Cell>
                        <Table.Cell>{convertToPersianNumber(numberWithCommas(parseFloat(totalPrice))) || 0}</Table.Cell>
                        <Table.Cell>
                            {convertToPersianNumber(moment(i.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))}
                        </Table.Cell>
                        <Table.Cell>
                                <Button color={"green"} inverted onClick={() => history.push(`/purchase-invoice/show/${i.id}`)}  >نمایش</Button>
                                <Button color={"red"} inverted onClick={() => history.push(`/purchase-invoice/delete/${i.id}`)}>حذف</Button>
                        </Table.Cell>
                    </Table.Row>
                );
            })
        );
    }
    onCreate = () => {
        history.push('/purchase-invoice/save');
    }
    onSearch = (e ,{value}) => {
        this.debouncedSearch((search) => this.setState({...this.state, search}), value );
    }
    debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 500,{ leading: false });

    renderWithoutStyle() {
        return (
            <React.Fragment >
                <Input icon='search' placeholder='جستجو...' onChange={this.onSearch}  />
                <AppPagination fetchPage={({page, size}) => this.props.getPInvoicePage({page, size})}
                               itemList={Object.values(this.props.invoices)} totalElements={this.props.totalElements}
                               search={this.state.search}
                               renderHeaders={this.renderHeaders()}
                               renderRows={this.renderRows} pageCount={this.props.pageCount}/>

                <Button style={{marginTop: '1rem'}} color={'facebook'} floated={'right'} onClick={this.onCreate}>افزودن</Button>
            </React.Fragment>
        );
    }

    render() {
        const  path = history.location.pathname;
        if(path === '/invoice') return  this.renderWithoutStyle();
        return (
            <Container >
                < Header >صورتحساب</Header>
                <Segment  secondary  basic style={{ margin: '0', padding: '0'}} >
                    <Input icon='search' placeholder='جستجو...' onChange={this.onSearch}  />
                    <AppPagination fetchPage={({page, size}) => this.props.getPInvoicePage({page, size})}
                                   itemList={Object.values(this.props.invoices)} totalElements={this.props.totalElements}
                                   search={this.state.search}
                                   renderHeaders={this.renderHeaders()}
                                   renderRows={this.renderRows} pageCount={this.props.pageCount}/>

                    <Button style={{marginTop: '1rem'}} color={'facebook'} floated={'right'} onClick={this.onCreate}>افزودن</Button>
                </Segment>
            </Container>
        );
    }

}



const mapStateToProps = (state) => {
    const {items ,totalPages, totalElements} = state.purchaseInvoice;
    return {invoices: items, pageCount: totalPages, totalElements};
}


export default connect(mapStateToProps , {getPInvoicePage})(Index);