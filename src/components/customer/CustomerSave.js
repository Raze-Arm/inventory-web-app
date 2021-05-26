import React from "react";
import {connect} from "react-redux";
import CustomerForm  from './CustomerForm';

import {saveCustomer} from "../../actions/customer";


const CustomerSave = ({saveCustomer}) => {

    const onSubmit = formValues => {
        console.log(formValues);
        saveCustomer(formValues);
    }
    return (
        <CustomerForm onSubmit={onSubmit} />
    );
}


export default connect(null, {saveCustomer})(CustomerSave);