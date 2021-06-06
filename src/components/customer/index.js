import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Button, Container, Header, Input, Segment, Table} from "semantic-ui-react";
import Moment from "react-moment";

import { getCustomerPage} from "../../actions/customer";
import history from "../../history";
import AppPagination from "../AppPagination";


class Index extends React.Component {
    state = { search: ''};



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

    renderRows = (items) =>  {
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
                        <Table.Cell collapsing   >
                            <Button color={"green"} inverted onClick={() => history.push(`/customer/show/${c.id}`)}  >Show</Button>
                            <Button color={"blue"} inverted onClick={() => history.push(`/customer/update/${c.id}`)}  >Update</Button>
                            <Button color={"red"} inverted onClick={() => history.push(`/customer/delete/${c.id}`)}>Delete</Button>
                        </Table.Cell>
                    </Table.Row>
                );
            })
        );
    }
    onCreate = () => {
        history.push('/customer/save');
    }

    onSearch = (e ,{value}) => {
        this.debouncedSearch((search) => this.setState({...this.state, search}), value );
    }
    debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 1000,{ leading: false });
    render() {
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}} >
                <Segment  secondary basic  style={{ margin: '0', padding: '0'}} >
                    <Header >Customer</Header>

                    <React.Fragment>
                        <Input icon='search' placeholder='Search...' onChange={this.onSearch}  />
                        <AppPagination fetchPage={({page, size}) => this.props.getCustomerPage({page, size})}
                                       itemList={Object.values(this.props.customers)} totalElements={this.props.totalElements}
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
    const {items, totalPages, totalElements} = state.customer;
    return {customers: items, pageCount: totalPages, totalElements};
}


export default connect(mapStateToProps, {getCustomerPage})(Index);
