import React from "react";
import {connect} from 'react-redux';
import _ from 'lodash';
import {Dimmer, Loader} from "semantic-ui-react";

import CustomerForm from './CustomerForm';
import {getCustomer, updateCustomer} from "../../actions/customer";


class CustomerUpdate extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getCustomer(id);
    }



    onUpdate = formValues => {
        const id = this.props.match.params.id;
        console.log('form values', {id, ...formValues});
        this.props.updateCustomer({id, ...formValues});
    }

    render() {
        const customer = this.props.customer;
        if(!customer) return <Dimmer><Loader/></Dimmer>;
        return (
            <CustomerForm initialValues = {_.omit(customer, 'id')} onSubmit = {this.onUpdate} type={'Update'} />
        );
    }
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {customer: state.customer.items[id]};
}


export default connect(mapStateToProps, {getCustomer, updateCustomer})(CustomerUpdate);