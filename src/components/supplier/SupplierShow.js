import React from "react";
import {connect} from "react-redux";
import Moment from 'react-moment';
import {Container, Dimmer, Divider, Header, List, Loader, Segment} from "semantic-ui-react";

import {getSupplier} from "../../actions/supplier";


class SupplierShow extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getSupplier(id);
    }


    render() {
        const supplier = this.props.supplier;
        if(!supplier) return <Dimmer><Loader/></Dimmer>
        return (
            <Container>
                <Segment color={"grey"}>
                    <Header>Supplier</Header>
                    <Divider />
                    <List divided relaxed>
                        <List.Item>
                            <List.Header>First Name</List.Header>
                            {supplier.firstName}
                        </List.Item>
                        <List.Item>
                            <List.Header>Last Name</List.Header>
                            {supplier.lastName || <br />}
                        </List.Item>
                        <List.Item>
                            <List.Header>Address</List.Header>
                            {supplier.address || <br />}
                        </List.Item>
                        <List.Item>
                            <List.Header>Created Date</List.Header>
                            {supplier.createdDate ? <Moment format={'YYYY/MM/DD hh:mm'}>{supplier.createdDate}</Moment> : <br />}
                        </List.Item>
                    </List>
                </Segment>
            </Container>
        );
    }

}


const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {supplier: state.supplier.items[id]};
}


export default connect(mapStateToProps, {getSupplier})(SupplierShow);