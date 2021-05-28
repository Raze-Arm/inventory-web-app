import React from 'react';
import _ from 'lodash';
import SearchSupplier from "./SearchSupplier";
import {Field, Form, reduxForm} from "redux-form";
import {Button, Container, Divider} from "semantic-ui-react";
import TransactionForm from "./TransactionForm";
import * as validator from '../../utility/formValidators';

const FIELDS = {
    supplierId: {
        name: 'supplier.id',
        render({input, meta,...rest}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <SearchSupplier key={'supplier'} input={input} hasError={hasError} {...rest} />
            );
        },
        validate: [
            validator.required,
        ]

    }
}

const PurchaseInvoiceForm = (props) => {
    return (
        <Container>
            <Form className={'ui form error'} onSubmit={props.handleSubmit}>
                {_.map(FIELDS, ({name ,render ,validate}) => {
                    return (
                        <Field key={name} name={name} component={render} validate={validate}/>
                    );
                })}
                <Divider section />
                <TransactionForm />
                <Button primary  type={'submit'} style={{marginTop: '1rem'}}>Save</Button>
            </Form>
        </Container>
    );
}


const form = reduxForm({
    form: 'purchaseInvoiceForm',
})(PurchaseInvoiceForm);

export default form;