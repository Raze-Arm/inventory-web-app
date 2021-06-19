import React from "react";
import _ from 'lodash';
import {connect} from "react-redux";
import {Container, Divider, Header, List, Segment, Table} from "semantic-ui-react";


import {getPInvoice} from "../../actions/purchase-invoice";
import Loading from "../Loading";
import moment from "jalali-moment";
import {convertToPersianNumber, numberWithCommas} from "../../utility/numberConverter";

class PurchaseInvoiceShow extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getPInvoice(id);
    }

    renderSupplier(supplier) {
        if(!supplier) return ;
        return (
            <List divided relaxed>
                <List.Item>
                    <List.Header>نام</List.Header>
                    {supplier.firstName}
                </List.Item>
                <List.Item>
                    <List.Header>نام خانوادگی</List.Header>
                    {supplier.lastName || <br />}
                </List.Item>
                <List.Item>
                    <List.Header>آدرس</List.Header>
                    {supplier.address || <br />}
                </List.Item>
                <List.Item>
                    <List.Header>تاریخ</List.Header>
                    {supplier.createdDate ?
                        convertToPersianNumber(moment(supplier.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))
                        : <br />}
                </List.Item>
            </List>
        );
    }

    renderTransactions(transactions) {
        if(!transactions) return ;
        return (
            <Segment color={"blue"}>
                <Header>تراکنش ها</Header>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            {/*<Table.HeaderCell>شناسه</Table.HeaderCell>*/}
                            <Table.HeaderCell>نام محصول</Table.HeaderCell>
                            <Table.HeaderCell>تعداد</Table.HeaderCell>
                            <Table.HeaderCell>قیمت</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(transactions, (tr, index) => (
                            <Table.Row key={index}>
                                {/*<Table.Cell>{tr.id}</Table.Cell>*/}
                                <Table.Cell>{tr.productName}</Table.Cell>
                                <Table.Cell>{tr.quantity.toLocaleString('fa')}</Table.Cell>
                                <Table.Cell>{convertToPersianNumber(numberWithCommas(parseFloat(tr.price)))}</Table.Cell>
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
                    <Header>صورتحساب خرید</Header>
                    <Divider />
                    {this.renderSupplier(invoice.supplier )}
                    {this.renderTransactions(invoice?.transactions)}
                </Segment>
            </Container>
        );
    }

}


const mapStateToProps =(state, props) => {
    const id = props.match.params.id;
    return {invoice: state.purchaseInvoice.items[id]};
}

export default connect(mapStateToProps, {getPInvoice})(PurchaseInvoiceShow);