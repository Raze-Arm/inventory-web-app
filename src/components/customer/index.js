import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Button, Container, Header, Input, Segment, Table} from "semantic-ui-react";
import Moment from "react-moment";

import { getCustomerPage} from "../../actions/customer";
import history from "../../history";
import AppPagination from "../AppPagination";

import moment from "jalali-moment";
import {convertToPersianNumber} from "../../utility/numberConverter";

class Index extends React.Component {
    state = { search: ''};



    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row>
                    {/*<Table.HeaderCell>شناسه</Table.HeaderCell>*/}
                    <Table.HeaderCell>نام</Table.HeaderCell>
                    <Table.HeaderCell>نام خانوادگی</Table.HeaderCell>
                    <Table.HeaderCell>آدرس</Table.HeaderCell>
                    <Table.HeaderCell>تاریخ</Table.HeaderCell>
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
                        {/*<Table.Cell>{c.id}</Table.Cell>*/}
                        <Table.Cell>{c.firstName}</Table.Cell>
                        <Table.Cell>{c.lastName}</Table.Cell>
                        <Table.Cell>{c.address}</Table.Cell>
                        <Table.Cell >  {c.createdDate ?
                            convertToPersianNumber(moment(c.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm - YYYY/MM/DD'))
                            : ''}</Table.Cell>
                        <Table.Cell collapsing   >
                            <Button color={"green"} inverted onClick={() => history.push(`/customer/show/${c.id}`)}  >نمایش</Button>
                            <Button color={"blue"} inverted onClick={() => history.push(`/customer/update/${c.id}`)}  >ویرایش</Button>
                            <Button color={"red"} inverted onClick={() => history.push(`/customer/delete/${c.id}`)}>حذف</Button>
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
    debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 500,{ leading: false });
    render() {
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}} >
                <Segment  secondary basic  style={{ margin: '0', padding: '0'}} >
                    <Header >مشتری</Header>

                    <React.Fragment>
                        <Input icon='search' placeholder='جستجو...' onChange={this.onSearch}  />
                        <AppPagination fetchPage={({page, size}) => this.props.getCustomerPage({page, size})}
                                       itemList={Object.values(this.props.customers)} totalElements={this.props.totalElements}
                                       search={this.state.search}
                                       renderHeaders={this.renderHeaders()}
                                       renderRows={this.renderRows} pageCount={this.props.pageCount}/>
                    </React.Fragment>

                </Segment>
                <Button style={{marginTop: '1rem'}} color={'facebook'} floated={"right"} onClick={this.onCreate}>افزودن</Button>
            </Container>
        );
    }


}


const mapStateToProps = (state) => {
    const {items, totalPages, totalElements} = state.customer;
    return {customers: items, pageCount: totalPages, totalElements};
}


export default connect(mapStateToProps, {getCustomerPage})(Index);
