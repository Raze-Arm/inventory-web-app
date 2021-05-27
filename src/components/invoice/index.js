import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import Moment from "react-moment";
import {Container, Segment, Table, Menu, Header, Button} from "semantic-ui-react";

import {getInvoicePage} from "../../actions/invoice";
import PurchaseInvoicePage from  '../purchase-invoice';
import SaleInvoicePage from '../sale-invoice';
import history from "../../history";

class Index extends React.Component {
    state = {activeItem: 'All'};

    componentDidMount() {
        this.props.getInvoicePage({page: 0,size: 50});
    }


    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>type</Table.HeaderCell>
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
                return (
                    <Table.Row key={i.id}>
                        <Table.Cell>{i.id}</Table.Cell>
                        <Table.Cell>{i.name}</Table.Cell>
                        <Table.Cell>{i.type}</Table.Cell>
                        <Table.Cell>   <Moment
                            format={'YYYY/MM/DD hh:mm'}>{i.createdDate}</Moment></Table.Cell>
                        <Table.Cell>
                            <Button color={"green"} onClick={() => history.push(`/${i.type}-invoice/show/${i.id}`)}  >Show</Button>
                            <Button color={"red"} onClick={() => history.push(`/${i.type}-invoice/delete/${i.id}`)}>Delete</Button>
                        </Table.Cell>
                    </Table.Row>
                );
            })
        );
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    renderInvoiceNavigation = () => {
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

    renderAllInvoices = () => {
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
        const {activeItem} = this.state;
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}}>
                < Header >Invoice</Header>
                {this.renderInvoiceNavigation()}
                <Segment  secondary  basic style={{ margin: '0', padding: '0'}} >


                    {activeItem === 'All' && this.renderAllInvoices()}
                    {activeItem === 'Purchase' && <PurchaseInvoicePage />}
                    {activeItem === 'Sale' && <SaleInvoicePage />}
                </Segment>
            </Container>
        );
    }



}


const mapStateToProps = (state) => {
    return {invoices: state.invoice.items};
}


export default connect(mapStateToProps, {getInvoicePage})(Index);