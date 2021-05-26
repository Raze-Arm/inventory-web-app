import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Container, Header, Segment, Table} from "semantic-ui-react";
import Moment from "react-moment";

import {getProductList} from '../../actions/product';

class Index extends React.Component {

    componentDidMount() {
        this.props.getProductList();
    }

    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Sale Price</Table.HeaderCell>
                    <Table.HeaderCell>Created</Table.HeaderCell>
                </Table.Row>
            </React.Fragment>
        );
    }
    renderRows() {
        const items = Object.values(this.props.products);
        return (
            _.map(items , (p) => {
                if(!p) return ;
                return (
                    <Table.Row key={p.id}>
                        <Table.Cell>{p.id}</Table.Cell>
                        <Table.Cell>{p.name}</Table.Cell>
                        <Table.Cell>{p.quantity || 0}</Table.Cell>
                        <Table.Cell>{p.price || ''}</Table.Cell>
                        <Table.Cell>{p.salePrice || ''}</Table.Cell>
                        <Table.Cell> {p.createdDate ?  <Moment
                            format={'YYYY/MM/DD hh:mm'}>{p.createdDate}</Moment> : ''}</Table.Cell>

                    </Table.Row>
                );
            })
        );
    }
    render() {
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}} >
                <Segment  secondary  style={{position :'inherited'}} >
                    <Header>Product</Header>
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
    return {products: state.product.items};
}


export default connect(mapStateToProps, {getProductList})(Index);