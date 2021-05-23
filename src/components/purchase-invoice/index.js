import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import Moment from "react-moment";
import {Container, Header, Segment, Table} from "semantic-ui-react";


import {getPInvoiceList} from '../../actions/purchase-invoice';

class Index extends React.Component {

    componentDidMount() {
        this.props.getPInvoiceList();
    }

    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Supplier</Table.HeaderCell>
                    <Table.HeaderCell>Total Price</Table.HeaderCell>
                    <Table.HeaderCell>Created</Table.HeaderCell>
                </Table.Row>
            </React.Fragment>
        );
    }

    renderRows() {
        const items = Object.values(this.props.invoices);
        console.log('items',items);
        return (
            _.map(items , (i) => {
                if(!i) return ;
                return (
                    <Table.Row key={i.id}>
                        <Table.Cell>{i.id}</Table.Cell>
                        <Table.Cell>{i?.supplier?.firstName}</Table.Cell>
                        <Table.Cell>{i?.supplier?.lastName}</Table.Cell>
                        <Table.Cell>   <Moment
                            format={'YYYY/MM/DD hh:mm'}>{i.createdDate}</Moment></Table.Cell>

                    </Table.Row>
                );
            })
        );
    }

    render() {
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}}>
                <Segment  secondary  style={{position :'inherited'}} >
                    <Header>Purchase Invoice</Header>
                    <Table  celled stackable style={{width: '80%', margin: 'auto'}}>
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
    return {invoices: state.purchaseInvoice.items};
}


export default connect(mapStateToProps , {getPInvoiceList})(Index);