import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import Moment from "react-moment";
import {Container, Header, Menu, Segment, Table} from "semantic-ui-react";

import {getTransactionPage} from "../../actions/transaction";


class Index extends React.Component {
    state = {activeItem: 'All', type: ''};

    componentDidMount() {
        this.props.getTransactionPage({page: 0, size: 50});
    }

    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>createdDate</Table.HeaderCell>
                </Table.Row>
            </React.Fragment>
        );
    }


    renderRows() {
        const {activeItem} = this.state;
        const items = Object.values(this.props.transactions).filter((tr) => {
            if(activeItem === 'Purchase') {
                if(tr.type === 'purchase') return true;
                else return false;
            }
            if(activeItem === 'Sale') {
                if(tr.type === 'sale') return true;
                else return false;
            }
            return true;

        });
        return (
            _.map(items , (tr) => {
                if(!tr) return ;
                return (
                    <Table.Row key={tr.id}>
                        <Table.Cell>{tr.id}</Table.Cell>
                        <Table.Cell>{tr.productName}</Table.Cell>
                        <Table.Cell>{tr.price}</Table.Cell>
                        <Table.Cell>{tr.quantity}</Table.Cell>
                        <Table.Cell>{tr.type}</Table.Cell>
                        <Table.Cell>   <Moment
                            format={'YYYY/MM/DD hh:mm'}>{tr.createdDate}</Moment></Table.Cell>

                    </Table.Row>
                );
            })
        );
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    renderTransactionNavigation = () => {
        return (
            <Menu stackable  color={"yellow"} attached={"bottom"}>
                <Menu.Item header name='All'
                           active={this.state.activeItem === 'All'}
                           onClick={this.handleItemClick}   />
                <Menu.Item
                    name='Purchase'
                    active={this.state.activeItem === 'Purchase'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Sale'
                    active={this.state.activeItem === 'Sale'}
                    onClick={this.handleItemClick}
                />
            </Menu>
        );
    }

    renderAllTransactions = () => {
        return (
            <Table   celled stackable style={{width: '100%', margin: '0', padding: '0'}}>
                <Table.Header>
                    {this.renderHeaders()}
                </Table.Header>
                <Table.Body>
                    {this.renderRows()}
                </Table.Body>
            </Table>
        );
    }

    render() {

        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}}>
                < Header >Tranasction</Header>

                {this.renderTransactionNavigation()}
                <Segment  secondary  basic style={{ margin: '0', padding: '0'}} >

                    {this.renderAllTransactions()}

                </Segment>
            </Container>
        );
    }

}


const mapStateToProps = (state) => {
    return {transactions: state.transaction.items};
}

export default connect(mapStateToProps, {getTransactionPage})(Index);