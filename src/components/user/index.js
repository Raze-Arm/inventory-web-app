import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Button, Container, Header, Input, Segment, Table} from "semantic-ui-react";

import {getUserPage} from "../../actions/user";
import history from "../../history";
import AppPagination from '../AppPagination';
import moment from "jalali-moment";
import {convertToPersianNumber} from "../../utility/numberConverter";


class Index extends React.Component {
    state = {search: ''}

    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row textAlign={"center"}>
                    <Table.HeaderCell>شناسه</Table.HeaderCell>
                    <Table.HeaderCell>نام</Table.HeaderCell>
                    <Table.HeaderCell>نام خانوادگی</Table.HeaderCell>
                    <Table.HeaderCell>نام کاربری</Table.HeaderCell>
                    <Table.HeaderCell>نقش</Table.HeaderCell>
                    <Table.HeaderCell>تاریخ</Table.HeaderCell>
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
                        <Table.Cell>{p.firstName}</Table.Cell>
                        <Table.Cell>{p.lastName}</Table.Cell>
                        <Table.Cell>{p.username}</Table.Cell>
                        <Table.Cell>{p.role}</Table.Cell>
                        <Table.Cell> {p.createdDate ?
                            convertToPersianNumber(moment(p.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))
                            : ''}</Table.Cell>
                        <Table.Cell collapsing   >
                            <Button color={"green"} inverted onClick={() => history.push(`/user/show/${p.id}`)}  >نمایش</Button>
                            <Button color={"blue"} inverted onClick={() => history.push(`/user/update/${p.id}`)}  >ویرایش</Button>
                            <Button color={"red"}  inverted onClick={() => history.push(`/user/delete/${p.id}`)}>حذف</Button>
                        </Table.Cell>
                    </Table.Row>
                );
            })
        );
    }

    onCreate = () => {
        history.push('/user/save');
    }
    onSearch = (e ,{value}) => {
        this.debouncedSearch((search) => this.setState({...this.state, search}), value );
    }
    debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 1000,{ leading: false });
    render() {
        return (
            <Container style={{width: '80%', margin: 'auto', marginTop: '1rem'}} >
                <Segment  secondary   basic style={{ marginRight: '20px', padding: '0'}} >
                    <Header>کاربر</Header>
                    <React.Fragment>
                        <Input icon='search' style={{marginBottom: '10px'}}  placeholder='جستجو...' onChange={this.onSearch}  />
                        <AppPagination fetchPage={({page, size}) => this.props.getUserPage({page, size})}
                                       itemList={Object.values(this.props.users)} totalElements={this.props.totalElements}
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

const mapStateToProps  = (state) => {
    const {items, totalPages, totalElements} = state.user;
    return {users: items, pageCount: totalPages, totalElements};
}

export default connect(mapStateToProps, {getUserPage})(Index);