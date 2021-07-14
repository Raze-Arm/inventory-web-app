import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Button, Card, Container, Grid, Header, Input, Segment, Table} from "semantic-ui-react";

import { getSInvoicePage} from "../../actions/sale-invoice";
import history from "../../history";
import AppPagination from "../AppPagination";
import moment from "jalali-moment";
import {convertToPersianNumber, numberWithCommas} from "../../utility/numberConverter";


class Index extends React.Component {
    state = {search: ''}

    renderSmall = (items) => {
        return (
            <React.Fragment key={'mobile'}     >
                {_.map(items ,(s, i) => {
                    const totalPrice =_.reduce(s?.transactions, (result, value) => result + parseFloat(value.price), 0.0);
                    return (
                        <Card fluid raised key={i}>
                            <Grid celled    padded >
                                <Grid.Row key={s?.customer?.firstName}>
                                    <Grid.Column as={'b'} width={8}>مشتری</Grid.Column><Grid.Column width={8}>{s?.customer?.firstName} {s?.customer?.lastName}</Grid.Column>
                                </Grid.Row>
                                <Grid.Row key={`p.${i}`}>
                                    <Grid.Column as={'b'} width={8}>قیمت کل</Grid.Column><Grid.Column width={8}>{convertToPersianNumber(numberWithCommas(parseFloat(totalPrice))) || 0}</Grid.Column>
                                </Grid.Row>

                                <Grid.Row key={s.createdDate}>
                                    <Grid.Column as={'b'} width={8}>تاریخ</Grid.Column>
                                    <Grid.Column width={8}>{s.createdDate ?
                                        convertToPersianNumber(moment(s.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))
                                        : ''}</Grid.Column>
                                </Grid.Row>
                                <Grid.Row key={'actions'} >
                                    <Grid.Column>
                                        <Button color={"green"} inverted onClick={() => history.push(`/sale-invoice/show/${s.id}`)}  >نمایش</Button>
                                        <Button color={"red"} inverted onClick={() => history.push(`/sale-invoice/delete/${s.id}`)}>حذف</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card>
                    )
                })}
            </React.Fragment>
        );
    }




    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    {/*<Table.HeaderCell>شناسه</Table.HeaderCell>*/}
                    <Table.HeaderCell>مشتری</Table.HeaderCell>
                    <Table.HeaderCell>قیمت کل</Table.HeaderCell>
                    <Table.HeaderCell>تاریخ</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </React.Fragment>
        );
    }

    renderRows = (items) => {
        return (
            _.map(items , (i) => {
                if(!i) return ;
                const totalPrice =_.reduce(i?.transactions, (result, value) => result + parseFloat(value.price), 0.0);
                return (
                    <Table.Row key={i.id}>
                        {/*<Table.Cell>{i.id}</Table.Cell>*/}
                        <Table.Cell>{i?.customer?.firstName} {i?.customer?.lastName}</Table.Cell>
                        <Table.Cell>{convertToPersianNumber(numberWithCommas(parseFloat(totalPrice))) || 0}</Table.Cell>
                        <Table.Cell>{convertToPersianNumber(moment(i.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))}</Table.Cell>
                        <Table.Cell>
                            <Button color={"green"} inverted onClick={() => history.push(`/sale-invoice/show/${i.id}`)}  >نمایش</Button>
                            <Button color={"red"} inverted onClick={() => history.push(`/sale-invoice/delete/${i.id}`)}>حذف</Button>
                        </Table.Cell>
                    </Table.Row>
                );
            })
        );
    }
    onCreate = () => {
        history.push('/sale-invoice/save');
    }
    onSearch = (e ,{value}) => {
        this.debouncedSearch((search) => this.setState({...this.state, search}), value );
    }
    debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 500,{ leading: false });


    renderWithoutStyle (){
        return (
            <React.Fragment>
                <Input icon='search' placeholder='جستجو...' onChange={this.onSearch}  />
                <AppPagination fetchPage={({page, size}) => this.props.getSInvoicePage({page, size})}
                               itemList={Object.values(this.props.invoices)} totalElements={this.props.totalElements}
                               search={this.state.search}
                               renderSmallDevices={this.renderSmall}
                               renderHeaders={this.renderHeaders()}
                               renderRows={this.renderRows} pageCount={this.props.pageCount}/>
                <Button style={{marginTop: '1rem'}} color={'facebook'} floated={'right'} onClick={this.onCreate}>افزودن</Button>
            </React.Fragment>
        );
    }

    render() {
        const  path = history.location.pathname;
        if(path === '/invoice') return  this.renderWithoutStyle();
        else
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}}>
                < Header >صورتحساب</Header>
                <Segment  secondary  basic style={{ margin: '0'}} >
                    <Input icon='search' placeholder='جستجو...' onChange={this.onSearch}  />
                    <AppPagination fetchPage={({page, size}) => this.props.getSInvoicePage({page, size})}
                                   itemList={Object.values(this.props.invoices)} totalElements={this.props.totalElements}
                                   search={this.state.search}
                                   renderSmallDevices={this.renderSmall}
                                   renderHeaders={this.renderHeaders()}
                                   renderRows={this.renderRows} pageCount={this.props.pageCount}/>
                    <Button style={{marginTop: '1rem'}} color={'facebook'} floated={'right'} onClick={this.onCreate}>افزودن</Button>
                </Segment>
            </Container>
        );
    }

}

const mapStateToProps = (state, props) => {
    const {items, totalPages, totalElements} = state.saleInvoice;
    return {invoices: items, pageCount: totalPages, totalElements, ...props};
}

export default connect(mapStateToProps, { getSInvoicePage})(Index);