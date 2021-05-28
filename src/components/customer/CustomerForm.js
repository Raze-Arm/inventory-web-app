import React from "react";
import _ from "lodash";
import {Field, Form, reduxForm} from "redux-form";
import {Button, Container, FormField, Input, TextArea} from "semantic-ui-react";

import * as validator from '../../utility/formValidators';


const FIELDS = {
    firstName: {
        name: 'firstName',
        render({input, meta, ...props}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={Input} {...input} error={hasError ? meta.error : null} label={'First Name'} />
            );
        },
        validate: [
            validator.required,
            validator.minLength(3),
            validator.maxLength(15),
        ]
    },
    lastName: {
        name: 'lastName',
        render({input, meta, ...props}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={Input} {...input} error={hasError ? meta.error : null} label={'Last Name'} />
            );
        },
        validate: [
            validator.required,
            validator.minLength(3),
            validator.maxLength(15),
        ]
    },
    address: {
        name: 'address',
        render({input, meta, ...props}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={TextArea} {...input} error={hasError ? meta.error : null} label={'Address'} />
            );
        },
        validate: [
            validator.minLength(3),
            validator.maxLength(15),
        ]
    },
}


const CustomerForm = (props) => {
    return (
        <Container>
            <Form className={'ui form error'} onSubmit={props.handleSubmit}>
                {_.map(FIELDS, ({name ,render ,validate}) => {
                    return (
                        <Field key={name} name={name} component={render} validate={validate}/>
                    );
                })}
                <Button primary  type={'submit'} style={{marginTop: '1rem'}}>{props.type || 'Save'}</Button>
            </Form>
        </Container>
    );
}


const form = reduxForm({
    form: 'customerForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
})(CustomerForm);

export default form;