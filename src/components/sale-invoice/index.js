import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import Moment from "react-moment";
import {Button, Container, Header, Segment, Table} from "semantic-ui-react";

import {getSInvoiceList} from "../../actions/sale-invoice";
import history from "../../history";



class Index extends React.Component {

    componentDidMount() {
        this.props.getSInvoiceList();
    }

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

    renderRows() {
        const items = Object.values(this.props.invoices);
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
                            <Button color={"green"} onClick={() => history.push(`/sale-invoice/show/${i.id}`)}  >Show</Button>
                            <Button color={"red"} onClick={() => history.push(`/sale-invoice/delete/${i.id}`)}>Delete</Button>
                        </Table.Cell>
                    </Table.Row>
                );
            })
        );
    }

    render() {
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}}>
                <Segment  secondary  basic style={{ margin: '0', padding: '0'}} >
                    <Header>Sale Invoice</Header>
                    <Table  celled stackable style={{width: '100%', margin: '0', padding: '0'}}>
                        <Table.Header>
                            {this.renderHeaders()}
                        </Table.Header>
                        <Table.Body>
                            {this.renderRows()}
                        </Table.Body>
                    </Table>
                </Segment>
            </Container>
        );
    }

}

const mapStateToProps = (state) => {
    return {invoices: state.saleInvoice.items};
}

export default connect(mapStateToProps, {getSInvoiceList})(Index);