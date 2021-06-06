import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Button, Container, Header, Input, Segment, Table} from "semantic-ui-react";
import Moment from "react-moment";

import { getSupplierPage} from "../../actions/supplier";
import history from "../../history";
import AppPagination from "../AppPagination";



class Index extends React.Component {
    state = {search: ''}


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

    renderRows = (items) => {
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
                            <Button color={"green"} inverted onClick={() => history.push(`/supplier/show/${s.id}`)}  >Show</Button>
                            <Button color={"blue"} inverted onClick={() => history.push(`/supplier/update/${s.id}`)}  >Update</Button>
                            <Button color={"red"}  inverted onClick={() => history.push(`/supplier/delete/${s.id}`)}>Delete</Button>
                        </Table.Cell>
                    </Table.Row>
                );
            })
        );
    }
    onCreate = () => {
        history.push('/supplier/save');
    }

    onSearch = (e ,{value}) => {
        this.debouncedSearch((search) => this.setState({...this.state, search}), value );
    }
    debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 1000,{ leading: false });
    render() {
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}} >
                <Segment  secondary  basic style={{ margin: '0', padding: '0'}}  >
                    <Header>Supplier</Header>
                    <React.Fragment>
                        <Input icon='search' placeholder='Search...' onChange={this.onSearch}  />
                        <AppPagination fetchPage={({page, size}) => this.props.getSupplierPage({page, size})}
                                       itemList={Object.values(this.props.suppliers)} totalElements={this.props.totalElements}
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
    const {items, totalPages, totalElements} = state.supplier;
    return {suppliers: items, pageCount: totalPages, totalElements};
}

export default connect(mapStateToProps, {getSupplierPage})(Index);