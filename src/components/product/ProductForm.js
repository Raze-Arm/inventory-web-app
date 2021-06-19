import React from "react";
import _ from "lodash";
import {useParams} from 'react-router-dom';
import {Field, Form, reduxForm} from "redux-form";
import {Button, Container, FormField, Grid, Input, TextArea} from "semantic-ui-react";

import * as validator from '../../utility/formValidators';
import ProductImageInput from "../inputs/ProductImageInput";
import {numberFormatter, numberParser, numberWithCommas} from "../../utility/numberConverter";
import NumberFormat from "react-number-format";


const FIELDS = {
    name: {
        name: 'name',
        render({input, meta, ...props}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField  control={Input} {...input} error={hasError ? meta.error : null} label={'نام'} />
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
                <div className={`ui form field ${hasError ? 'error' : ''}  `}>
                    <label>قیمت</label>
                    <NumberFormat decimalScale={0} {...input}  maxLength={30}   thousandSeparator={true} defaultValue={0}   className={'form-input__rtl'}  />
                    {hasError ? <div className="ui pointing red basic label">{meta.error}</div> : ''}
                </div>
            );
        },
        validate: [
            validator.required,
            validator.number,
            validator.minValue(0),
            validator.maxLength(30),
        ],
        formatter: (num) => num ? numberWithCommas(num) : '',
        parse: (num) => num ? num.replace(/,/g , '') : ''


    },
    salePrice: {
        name: 'salePrice',
        render({input, meta, ...props}) {
            const hasError = !!(meta.error && meta.touched);
            console.log('has error', hasError)
            return (
                <div className={`ui form field ${hasError ? 'error' : ''}  `} >
                    <label>قیمت فروش</label>
                    <NumberFormat decimalScale={0} {...input} maxLength={30}   className={`form-input__rtl`}   thousandSeparator={true} defaultValue={0}       />
                    {hasError ? <div className="ui pointing red basic label">{meta.error}</div> : ''}
                </div>
            );
        },
        validate: [
            validator.required,
            validator.number,
            validator.minValue(0),
            validator.maxLength(30),
        ],
    },
    description: {
        name: 'description',
        render({input, meta, ...props}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={TextArea}  {...input}  error={hasError ? meta.error : null} label={'توضیحات'} />
            );
        },
    },
    image: {
        name: 'image',
        render({input, meta, imageAvailable, ...props}) {
            return (
                <ProductImageInput input={input} imageAvailable={imageAvailable} {...props}/>
            );
        }
    }
}


const ProductForm = (props) => {
    const {name, price, salePrice, description, image} = FIELDS;
    const {id} = useParams();
    return (
        <Container>
            <Form className={'ui form error'} onSubmit={props.handleSubmit} >

                <Grid stackable style={{marginBottom: '40px'}}>
                    <Grid.Column width={"6"}>
                        <Field key={name.name} name={name.name} component={name.render} validate={name.validate} />
                        <Field key={price.name} name={price.name} component={price.render} validate={price.validate}  format={numberFormatter} parse={numberParser}/>
                        <Field key={salePrice.name} name={salePrice.name} component={salePrice.render} validate={salePrice.validate} format={numberFormatter} parse={numberParser} />
                    </Grid.Column>
                    <Grid.Column width={"10"} >
                        <Field key={image.name} name={image.name} component={image.render}  validate={image.validate}  imageAvailable={props.initialValues?.imageAvailable} id={id}/>

                    </Grid.Column>
                </Grid>

                <Field  key={description.name} name={description.name} component={description.render}  validate={description.validate} />
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