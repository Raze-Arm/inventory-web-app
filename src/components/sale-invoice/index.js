import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import Moment from "react-moment";
import {Button, Container, Header, Input, Segment, Table} from "semantic-ui-react";

import { getSInvoicePage} from "../../actions/sale-invoice";
import history from "../../history";
import AppPagination from "../AppPagination";



class Index extends React.Component {
    state = {search: ''}


    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Customer</Table.HeaderCell>
                    <Table.HeaderCell>Total Price</Table.HeaderCell>
                    <Table.HeaderCell>Created</Table.HeaderCell>
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
                        <Table.Cell>{i.id}</Table.Cell>
                        <Table.Cell>{i?.customer?.firstName} {i?.customer?.lastName}</Table.Cell>
                        <Table.Cell>{totalPrice || 0}</Table.Cell>
                        <Table.Cell>   <Moment
                            format={'YYYY/MM/DD hh:mm'}>{i.createdDate}</Moment></Table.Cell>
                        <Table.Cell>
                            <Button color={"green"} inverted onClick={() => history.push(`/sale-invoice/show/${i.id}`)}  >Show</Button>
                            <Button color={"red"} inverted onClick={() => history.push(`/sale-invoice/delete/${i.id}`)}>Delete</Button>
                        </Table.Cell>
                    </Table.Row>
                );
            })
        );
    }
    onCreate = () => {
        history.push('/sale-invoice/save');
    }
    onSearch = (e ,{value}) => {
        this.debouncedSearch((search) => this.setState({...this.state, search}), value );
    }
    debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 1000,{ leading: false });
    render() {
        return (
                    <React.Fragment>
                        <Input icon='search' placeholder='Search...' onChange={this.onSearch}  />
                        <AppPagination fetchPage={({page, size}) => this.props.getSInvoicePage({page, size})}
                                       itemList={Object.values(this.props.invoices)} totalElements={this.props.totalElements}
                                       search={this.state.search}
                                       renderHeaders={this.renderHeaders()}
                                       renderRows={this.renderRows} pageCount={this.props.pageCount}/>
                        <Button style={{marginTop: '1rem'}} color={'facebook'} floated={'right'} onClick={this.onCreate}>Create</Button>
                    </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    const {items, totalPages, totalElements} = state.saleInvoice;
    return {invoices: items, pageCount: totalPages, totalElements};
}

export default connect(mapStateToProps, { getSInvoicePage})(Index);