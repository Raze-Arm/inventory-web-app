import React from "react";
import _ from "lodash";
import {Field, Form, reduxForm} from "redux-form";
import {Button, Container, FormField, Input, TextArea} from "semantic-ui-react";

import * as validator from '../../utility/formValidators';


const FIELDS = {
    name: {
        name: 'name',
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
    price: {
        name: 'price',
        render({input, meta, ...props}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={Input} {...input} error={hasError ? meta.error : null} label={'قیمت'} />
            );
        },
        validate: [
            validator.required,
            validator.number,
            validator.minValue(0),
            validator.maxLength(30),
        ]
    },
    salePrice: {
        name: 'salePrice',
        render({input, meta, ...props}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={Input} {...input} error={hasError ? meta.error : null} label={'قیمت فروش'} />
            );
        },
        validate: [
            validator.required,
            validator.number,
            validator.minValue(0),
            validator.maxLength(30),
        ]
    },
    description: {
        name: 'description',
        render({input, meta, ...props}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={TextArea} {...input} error={hasError ? meta.error : null} label={'توضیحات'} />
            );
        },
    }
}


const ProductForm = (props) => {
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
    form: 'productForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
})(ProductForm);


export default form;