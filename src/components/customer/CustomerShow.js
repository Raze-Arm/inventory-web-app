import React from "react";
import {connect} from "react-redux";
import Moment from 'react-moment';
import {Container, Dimmer, Divider, Header, List, Loader, Segment} from "semantic-ui-react";

import {getCustomer} from "../../actions/customer";


class CustomerShow extends  React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getCustomer(id);
    }


    render() {
        const customer = this.props.customer;
        if(!customer) return <Dimmer><Loader/></Dimmer>
        return (
            <Container>
                <Segment color={"grey"}>
                    <Header>Customer</Header>
                    <Divider />
                    <List divided relaxed>
                        <List.Item>
                            <List.Header>First Name</List.Header>
                            {customer.firstName}
                        </List.Item>
                        <List.Item>
                            <List.Header>Last Name</List.Header>
                            {customer.lastName || <br />}
                        </List.Item>
                        <List.Item>
                            <List.Header>Address</List.Header>
                            {customer.address || <br />}
                        </List.Item>
                        <List.Item>
                            <List.Header>Created Date</List.Header>
                            {customer.createdDate ? <Moment format={'YYYY/MM/DD hh:mm'}>{customer.createdDate}</Moment> : <br />}
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