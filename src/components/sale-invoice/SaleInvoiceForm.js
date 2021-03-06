import React from 'react';
import _ from 'lodash';
import SearchCustomer from "../search/SearchCustomer";
import {Field, Form, reduxForm} from "redux-form";
import {Button, Container, Divider} from "semantic-ui-react";
import TransactionForm from './TransactionForm';
import *  as validator from '../../utility/formValidators';



const FIELDS = {
    customerId: {
        name: 'customer.id',
        render({input, meta, ...rest}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <SearchCustomer key={'customer'} input={input} hasError={hasError} {...rest} />
            );
        },
        validate: [
            validator.required,
        ]
    }
}

const SaleInvoiceForm = (props) => {
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
                <Button primary  type={'submit'} style={{marginTop: '1rem'}}>ذخیره</Button>
            </Form>
        </Container>
    );
}

const form = reduxForm({
    form: 'saleInvoiceForm',
})(SaleInvoiceForm);


export default form;