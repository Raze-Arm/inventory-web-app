import React from "react";
import {connect} from "react-redux";
import {Container, Divider, Header, List, Segment} from "semantic-ui-react";

import {getCustomer} from "../../actions/customer";
import Loading from "../Loading";
import moment from "jalali-moment";
import {convertToPersianNumber} from "../../utility/numberConverter";

class CustomerShow extends  React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getCustomer(id);
    }


    render() {
        const customer = this.props.customer;
        if(!customer) return <Loading />
        return (
            <Container>
                <Segment color={"grey"}>
                    <Header>مشتری</Header>
                    <Divider />
                    <List divided relaxed>
                        <List.Item>
                            <List.Header>نام</List.Header>
                            {customer.firstName}
                        </List.Item>
                        <List.Item>
                            <List.Header>نام خانوادگی</List.Header>
                            {customer.lastName || <br />}
                        </List.Item>
                        <List.Item>
                            <List.Header>آدرس</List.Header>
                            {customer.address || <br />}
                        </List.Item>
                        <List.Item>
                            <List.Header>تاریخ</List.Header>
                            {customer.createdDate ?
                                // <Moment format={'YYYY/MM/DD hh:mm'}>{customer.createdDate}</Moment>
                                convertToPersianNumber(moment(customer.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))
                                : <br />}
                        </List.Item>
                    </List>
                </Segment>
            </Container>
        );
    }

}


const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {customer: state.customer.items[id]};
}

export default connect(mapStateToProps, {getCustomer})(CustomerShow);