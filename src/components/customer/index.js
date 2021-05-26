import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Container, Header, Segment, Table} from "semantic-ui-react";
import Moment from "react-moment";

import {getCustomerList} from "../../actions/customer";


class Index extends React.Component {

    componentDidMount() {
        this.props.getCustomerList();
    }


    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>Created</Table.HeaderCell>
                </Table.Row>
            </React.Fragment>
        );
    }

    renderRows() {
        const items = Object.values(this.props.customers);
        return (
            _.map(items , (c) => {
                if(!c) return ;
                return (
                    <Table.Row key={c.id}>
                        <Table.Cell>{c.id}</Table.Cell>
                        <Table.Cell>{c.firstName}</Table.Cell>
                        <Table.Cell>{c.lastName}</Table.Cell>
                        <Table.Cell>{c.address}</Table.Cell>
                        <Table.Cell> {c.createdDate ?  <Moment
                            format={'YYYY/MM/DD hh:mm'}>{c.createdDate}</Moment> : ''}</Table.Cell>
                    </Table.Row>
                );
            })
        );
    }

    render() {
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}} >
                <Segment  secondary  style={{position :'inherited'}} >
                    <Header>Customer</Header>
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
    return {customers: state.customer.items};
}


export default connect(mapStateToProps, {getCustomerList})(Index);
