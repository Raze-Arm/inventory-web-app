import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Button, Container, Header, Input, Segment, Table} from "semantic-ui-react";
import Moment from "react-moment";

import {getProductPage} from '../../actions/product';
import history from "../../history";
import AppPagination from "../AppPagination";

class Index extends React.Component {
    state = {search: ''}


    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row textAlign={"center"}>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Sale Price</Table.HeaderCell>
                    <Table.HeaderCell>Created</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </React.Fragment>
        );
    }
    renderRows = (items) => {
        return (
            _.map(items , (p) => {
                if(!p) return ;
                return (
                    <Table.Row key={p.id} textAlign={"center"}>
                        <Table.Cell>{p.id}</Table.Cell>
                        <Table.Cell>{p.name}</Table.Cell>
                        <Table.Cell>{p.quantity || 0}</Table.Cell>
                        <Table.Cell>{p.price || ''}</Table.Cell>
                        <Table.Cell>{p.salePrice || ''}</Table.Cell>
                        <Table.Cell> {p.createdDate ?  <Moment
                            format={'YYYY/MM/DD hh:mm'}>{p.createdDate}</Moment> : ''}</Table.Cell>
                        <Table.Cell collapsing   >
                                <Button color={"green"} inverted onClick={() => history.push(`/product/show/${p.id}`)}  >Show</Button>
                                <Button color={"blue"} inverted onClick={() => history.push(`/product/update/${p.id}`)}  >Update</Button>
                                <Button color={"red"}  inverted onClick={() => history.push(`/product/delete/${p.id}`)}>Delete</Button>
                        </Table.Cell>
                    </Table.Row>
                );
            })
        );
    }
    onCreate = () => {
        history.push('/product/save');
    }
    onSearch = (e ,{value}) => {
        this.debouncedSearch((search) => this.setState({...this.state, search}), value );
    }
    debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 1000,{ leading: false });
    render() {
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}} >
                <Segment  secondary  basic style={{ margin: '0', padding: '0'}} >
                    <Header>Product</Header>
                    <React.Fragment>
                        <Input icon='search' placeholder='Search...' onChange={this.onSearch}  />
                        <AppPagination fetchPage={({page, size}) => this.props.getProductPage({page, size})}
                                       itemList={Object.values(this.props.products)} totalElements={this.props.totalElements}
                                       search={this.state.search}
                                       renderHeaders={this.renderHeaders()}
                                       renderRows={this.renderRows} pageCount={this.props.pageCount}/>
                    </React.Fragment>
                </Segment>
                <Button style={{marginTop: '1rem'}} color={'facebook'} floated={"right"} onClick={this.onCreate}>Create</Button>
            </Container>
        );
    }


}

const mapStateToProps = (state) => {
    const {items, totalPages, totalElements} = state.product;
    return {products: items , pageCount: totalPages, totalElements};
}


export default connect(mapStateToProps, {getProductPage})(Index);