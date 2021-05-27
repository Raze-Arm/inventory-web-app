import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Button, Container, Header, Segment, Table} from "semantic-ui-react";
import Moment from "react-moment";

import {getSupplierList} from "../../actions/supplier";
import history from "../../history";



class Index extends React.Component {

    componentDidMount() {
        this.props.getSupplierList();
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
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </React.Fragment>
        );
    }

    renderRows() {
        const items = Object.values(this.props.suppliers);
        return (
            _.map(items , (s) => {
                if(!s) return ;
                return (
                    <Table.Row key={s.id}>
                        <Table.Cell>{s.id}</Table.Cell>
                        <Table.Cell>{s.firstName}</Table.Cell>
                        <Table.Cell>{s.lastName}</Table.Cell>
                        <Table.Cell>{s.address}</Table.Cell>
                        <Table.Cell> {s.createdDate ?  <Moment
                            format={'YYYY/MM/DD hh:mm'}>{s.createdDate}</Moment> : ''}</Table.Cell>
                        <Table.Cell collapsing   >
                            <Button color={"green"} onClick={() => history.push(`/supplier/show/${s.id}`)}  >Show</Button>
                            <Button color={"facebook"} onClick={() => history.push(`/supplier/update/${s.id}`)}  >Update</Button>
                            <Button color={"red"} onClick={() => history.push(`/supplier/delete/${s.id}`)}>Delete</Button>
                        </Table.Cell>
                    </Table.Row>
                );
            })
        );
    }

    render() {
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}} >
                <Segment  secondary  basic style={{ margin: '0', padding: '0'}}  >
                    <Header>Supplier</Header>
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
    return {suppliers: state.supplier.items};
}

export default connect(mapStateToProps, {getSupplierList})(Index);