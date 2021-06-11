import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Button, Container, Header, Input, Segment, Table} from "semantic-ui-react";
import Moment from "react-moment";

import { getSupplierPage} from "../../actions/supplier";
import history from "../../history";
import AppPagination from "../AppPagination";
import moment from "jalali-moment";
import {convertToPersianNumber} from "../../utility/numberConverter";


class Index extends React.Component {
    state = {search: ''}


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

    renderRows = (items) => {
        return (
            _.map(items , (s) => {
                if(!s) return ;
                return (
                    <Table.Row key={s.id}>
                        {/*<Table.Cell>{s.id}</Table.Cell>*/}
                        <Table.Cell>{s.firstName}</Table.Cell>
                        <Table.Cell>{s.lastName}</Table.Cell>
                        <Table.Cell>{s.address}</Table.Cell>
                        <Table.Cell> {s.createdDate ?
                            convertToPersianNumber(moment(s.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))
                            : ''}</Table.Cell>
                        <Table.Cell collapsing   >
                            <Button color={"green"} inverted onClick={() => history.push(`/supplier/show/${s.id}`)}  >نمایش</Button>
                            <Button color={"blue"} inverted onClick={() => history.push(`/supplier/update/${s.id}`)}  >ویرایش</Button>
                            <Button color={"red"}  inverted onClick={() => history.push(`/supplier/delete/${s.id}`)}>حذف</Button>
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
                    <Header>فروشنده</Header>
                    <React.Fragment>
                        <Input icon='search' placeholder='جستجو...' onChange={this.onSearch}  />
                        <AppPagination fetchPage={({page, size}) => this.props.getSupplierPage({page, size})}
                                       itemList={Object.values(this.props.suppliers)} totalElements={this.props.totalElements}
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
    const {items, totalPages, totalElements} = state.supplier;
    return {suppliers: items, pageCount: totalPages, totalElements};
}

export default connect(mapStateToProps, {getSupplierPage})(Index);