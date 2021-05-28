import React from "react";
import {connect} from "react-redux";
import PurchaseInvoiceForm from "./PurchaseInvoiceForm";
import {Container} from "semantic-ui-react";

import {savePInvoice} from '../../actions/purchase-invoice';

const PurchaseInvoiceSave = ({savePInvoice}) => {

    const onSubmit = formValues =>{
        console.log(formValues);
        savePInvoice(formValues);
    }

    return (
        <Container >

            <PurchaseInvoiceForm onSubmit={onSubmit} />
        </Container>
    );
}

export default connect(null, {savePInvoice})(PurchaseInvoiceSave);