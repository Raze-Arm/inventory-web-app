import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Button, Container, Header, Image, Input, Segment, Table} from "semantic-ui-react";

import {getProductPage} from '../../actions/product';
import history from "../../history";
import AppPagination from "../AppPagination";

import moment from "jalali-moment";
import {convertToPersianNumber, numberWithCommas} from "../../utility/numberConverter";
import {BACKEND_API} from "../../apis/address";
class Index extends React.Component {
    state = {search: ''}


    renderHeaders() {
        return (
            <React.Fragment>
                <Table.Row >
                    {/*<Table.HeaderCell>شناسه</Table.HeaderCell>*/}
                    <Table.HeaderCell>نام</Table.HeaderCell>
                    <Table.HeaderCell>تعداد</Table.HeaderCell>
                    <Table.HeaderCell>قیمت</Table.HeaderCell>
                    <Table.HeaderCell>قیمت فروش</Table.HeaderCell>
                    <Table.HeaderCell>تاریخ</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </React.Fragment>
        );
    }
    renderRows = (items) => {
        return (
            _.map(items , (p, i) => {
                if(!p) return ;

                return (
                    <Table.Row key={p.id} >
                        {/*<Table.Cell>{p.id}</Table.Cell>*/}
                        <Table.Cell>
                            <Header as={'h4'} image>
                                {p.imageAvailable  ? <Image src={BACKEND_API + `/v1/download/product/${p.id}`}  rounded size='mini' /> : ''}
                                <Header.Content>{p.name}</Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{p.quantity.toLocaleString('fa') || 0}</Table.Cell>
                        <Table.Cell>{convertToPersianNumber(numberWithCommas(parseFloat(p.price))) || ''}</Table.Cell>
                        <Table.Cell>{convertToPersianNumber(numberWithCommas(parseFloat(p.salePrice))) || ''}</Table.Cell>
                        <Table.Cell> {p.createdDate ?
                            convertToPersianNumber(moment(p.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))
                            : ''}
                        </Table.Cell>
                        <Table.Cell collapsing   >
                                <Button color={"green"} inverted onClick={() => history.push(`/product/show/${p.id}`)}  >نمایش</Button>
                                <Button color={"blue"} inverted onClick={() => history.push(`/product/update/${p.id}`)}  >ویرایش</Button>
                                <Button color={"red"}  inverted onClick={() => history.push(`/product/delete/${p.id}`)}>حذف</Button>
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
                    <Header>محصول</Header>
                    <React.Fragment>
                        <Input icon='search' placeholder='جستجو...' onChange={this.onSearch}  />
                        <AppPagination fetchPage={({page, size}) => this.props.getProductPage({page, size})}
                                       itemList={Object.values(this.props.products)} totalElements={this.props.totalElements}
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
    const {items, totalPages, totalElements} = state.product;
    return {products: items , pageCount: totalPages, totalElements};
}


export default connect(mapStateToProps, {getProductPage})(Index);