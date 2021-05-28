import React from 'react';
import {connect} from "react-redux";
import SaleInvoiceForm from './SaleInvoiceForm';
import {Container} from "semantic-ui-react";

import {saveSInvoice} from "../../actions/sale-invoice";


const SaleInvoiceSave = ({saveSInvoice}) => {
    const onSubmit = formValues =>{
        console.log(formValues);
        saveSInvoice(formValues);
    }

    return (
        <Container >
            <SaleInvoiceForm onSubmit = {onSubmit} />
        </Container>
    );
}


export default connect(null, {saveSInvoice})(SaleInvoiceSave);