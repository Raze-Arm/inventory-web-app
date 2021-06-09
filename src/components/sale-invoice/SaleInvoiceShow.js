import React from "react";
import _ from 'lodash';
import {connect} from "react-redux";
import Moment from 'react-moment';
import {Container, Dimmer, Divider, Header, List, Loader, Segment, Table} from "semantic-ui-react";

import {getSInvoice} from "../../actions/sale-invoice";
import Loading from "../Loading";
import moment from "jalali-moment";
import {convertToPersianNumber} from "../../utility/numberConverter";

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
                    <List.Header>نام</List.Header>
                    {customer.firstName}
                </List.Item>
                <List.Item>
                    <List.Header>نام خانوادگی</List.Header>
                    {customer.lastName || <br />}
                </List.Item>
                <List.Item>
                    <List.Header>آدرس</List.Header>
                    {customer.address || <br />}
                </List.Item>
                <List.Item>
                    <List.Header>تاریخ</List.Header>
                    {customer.createdDate ?
                        convertToPersianNumber(moment(customer.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))
                        : <br />}
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
                            <Table.HeaderCell>شناسه</Table.HeaderCell>
                            <Table.HeaderCell>نام محصول</Table.HeaderCell>
                            <Table.HeaderCell>تعداد</Table.HeaderCell>
                            <Table.HeaderCell>قیمت</Table.HeaderCell>
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
        if(!invoice) return  <Loading />;

        return  (
            <Container>
                <Segment color={"grey"}>
                    <Header>صورتحساب فروش</Header>
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