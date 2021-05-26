import React from "react";
import {connect} from "react-redux";
import SupplierForm from './SupplierForm';

import {saveSupplier} from "../../actions/supplier";


const SupplierSave = ({saveSupplier}) => {

    const onSubmit =formValues => {
        console.log(formValues);
        saveSupplier(formValues);
    }

    return (
        <SupplierForm onSubmit={onSubmit} />
    );
}

export default connect(null, {saveSupplier})(SupplierSave);