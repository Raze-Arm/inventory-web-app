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
                <FormField control={Input} {...input} error={hasError ? meta.error : null} label={'نام'} />
            );
        },
        validate: [
            validator.required,
            validator.minLength(3),
            validator.maxLength(30),
        ]
    },
    lastName: {
        name: 'lastName',
        render({input, meta, ...props}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={Input} {...input} error={hasError ? meta.error : null} label={'نام خانوادگی'} />
            );
        },
        validate: [
            validator.required,
            validator.minLength(3),
            validator.maxLength(30),
        ]
    },
    address: {
        name: 'address',
        render({input, meta, ...props}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={TextArea} {...input} error={hasError ? meta.error : null} label={'آدرس'} />
            );
        },
        validate: [
            validator.minLength(3),
            validator.maxLength(30),
        ]
    },
}

const SupplierForm  = (props) => {
    return (
        <Container>
            <Form className={'ui form error'} onSubmit={props.handleSubmit}>
                {_.map(FIELDS, ({name ,render ,validate}) => {
                    return (
                        <Field key={name} name={name} component={render} validate={validate}/>
                    );
                })}
                <Button primary  type={'submit'} style={{marginTop: '1rem'}}>{props.type || 'ذخیره'}</Button>
            </Form>
        </Container>
    );
}



const form = reduxForm({
    form: 'supplierForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
})(SupplierForm);


export default form;