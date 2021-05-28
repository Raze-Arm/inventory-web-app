import React from "react";
import _ from 'lodash';
import {connect} from "react-redux";
import Moment from 'react-moment';
import {Container, Dimmer, Divider, Header, List, Loader, Segment, Table} from "semantic-ui-react";

import {getSInvoice} from "../../actions/sale-invoice";


class SaleInvoiceShow extends React.Component {
    
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getSInvoice(id);
    }
    
    
    renderCustomer(customer) {
        if(!customer) return ;
        return (
            <List divided relaxed>
                <List.Item>
                    <List.Header>First Name</List.Header>
                    {customer.firstName}
                </List.Item>
                <List.Item>
                    <List.Header>Last Name</List.Header>
                    {customer.lastName || <br />}
                </List.Item>
                <List.Item>
                    <List.Header>Address</List.Header>
                    {customer.address || <br />}
                </List.Item>
                <List.Item>
                    <List.Header>Created Date</List.Header>
                    {customer.createdDate ? <Moment format={'YYYY/MM/DD hh:mm'}>{customer.createdDate}</Moment> : <br />}
                </List.Item>
            </List>
        );

    }

    renderTransactions(transactions) {
        if(!transactions) return ;
        return (
            <Segment color={"blue"}>
                <Header>Transactions</Header>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Product Name</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(transactions, (tr, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{tr.id}</Table.Cell>
                                <Table.Cell>{tr.productName}</Table.Cell>
                                <Table.Cell>{tr.quantity}</Table.Cell>
                                <Table.Cell>{tr.price}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>
        );
    }


    render() {
        const invoice =this.props.invoice;
        if(!invoice) return  <Dimmer><Loader /></Dimmer>;

        return  (
            <Container>
                <Segment color={"grey"}>
                    <Header>Sale Invoice</Header>
                    <Divider />
                    {this.renderCustomer(invoice.customer )}
                    {this.renderTransactions(invoice?.transactions)}
                </Segment>
            </Container>
        );
    }



}


const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {invoice: state.saleInvoice.items[id]};
}

export default connect(mapStateToProps, {getSInvoice})(SaleInvoiceShow);