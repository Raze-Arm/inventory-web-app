import React from "react";
import {connect} from 'react-redux';
import {Button} from "semantic-ui-react";

import Modal from "../Modal";
import {getCustomer, deleteCustomer} from "../../actions/customer";
import Loading from "../Loading";



class CustomerDelete extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getCustomer(id);
    }

    onDelete = () => {
        const id = this.props.match.params.id;
        this.props.deleteCustomer(id);
    }

    onCancel = () => {
        this.props.history.push('/customer');
    }

    renderActions = () => {
        return (
            <React.Fragment >
                <Button color={"red"} onClick={() => this.onCancel()} >Cancel</Button>
                <Button color={"green"} onClick={() => this.onDelete()} >Delete</Button>
            </React.Fragment>
        );
    }

    render() {
        const customer = this.props.customer;
        if(!customer)  return <Loading />;


        return  (
            <Modal
                title={"Delete Customer"}
                content={`Are You Sure , You Want To Delete Customer : ${customer.firstName} ${customer.lastName || ''}`}
                actions={this.renderActions()}
                onDismiss={() => this.onCancel()}
            > </Modal>
        );
    }
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {customer: state.customer.items[id]};
}


export default connect(mapStateToProps, {getCustomer, deleteCustomer})(CustomerDelete);