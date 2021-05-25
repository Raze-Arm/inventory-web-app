import React, {useState} from 'react';
import _ from 'lodash';
import {Field, FieldArray} from "redux-form";
import Header, {Button, Divider, FormButton, FormField, FormGroup, Input, Table} from "semantic-ui-react";

import SearchProduct from "../search/SearchProduct";

const TR_FIELDS = {
    product: {
        name: 'productName',
        render({input, meta, defaultValue}) {
            if(defaultValue) input.value = defaultValue;
            return (
                <label>{input.value}</label>
            );
        },
    },
    quantity: {
        name: 'quantity',
        render({input, meta, defaultValue}) {
            if(defaultValue) input.value = defaultValue;
            return (
                <label>{input.value}</label>
            );
        },

    },
    price: {
        name: 'price',
        render({input, meta, defaultValue}) {
            if(defaultValue) input.value = defaultValue;
            return (
                <label>{input.value}</label>
            );
        },

    },
    description: {
        name: 'description',
        render({input, meta, defaultValue}) {
            if(defaultValue) input.value = defaultValue;
            return (
                <label>{input.value}</label>
            );
        },

    }
}


const TransactionForm = (props) => {
    let fieldList = {};
    const [product, setProduct] = useState({});
    const [transaction, setTransaction] = useState({});
    const [fieldsError, setFieldsError] = useState({quantity: ''});

    const renderProductFields = () => {
        return (
            <FormGroup  >
                <SearchProduct  key={'product'} onSelect = {(pr) => {
                    setTransaction(pr);
                    setProduct(pr);
                }} />

                <FormField key={product.quantity} control={Input} error={!!fieldsError.quantity ? fieldsError.quantity : false}  label={'Quantity'} defaultValue={product.quantity || 0} className={'form-input__rtl'} onChange={(event, {value}) => {
                    if(value > product.quantity) {

                        setFieldsError({quantity: 'Out of stock'});
                        setTransaction({...transaction, quantity: 0});
                    }
                    else {
                        setTransaction({...transaction, quantity: value});
                        setFieldsError({quantity: ''})
                    }
                }} />
                <FormField   key={`available${product.quantity}`} control={Input} disabled width={"2"}   label={'Available'} defaultValue={product.quantity || 0} className={'form-input__rtl'} />

                <FormField  key={product.price} control={Input} label={'Price'} defaultValue={product.price || 0}  className={'form-input__rtl'} onChange={(event, {value}) => {
                    setTransaction({...transaction, price: value});

                }} />
                <FormField   key={`sale${product.price}`} control={Input} disabled  width={"2"}   label={'Sale Price'} defaultValue={product.price || 0} className={'form-input__rtl'} />

                <FormField key={product.description} control={Input}  label={'Description'} defaultValue={product.description || ''}  className={'form-input__rtl'} onChange={(event, {value}) => {
                    setTransaction({...transaction, description: value});

                }} />
                <FormButton type={'button'} style={{marginTop: '25px'}} color={'green'} floated={"left"}  onClick={() => {
                    if(!_.find(fieldList.getAll(), {'productId': product.id})){

                        const {id, quantity, price} = transaction;
                        if(quantity > 0) {
                            setProduct({...product, quantity: product.quantity - parseInt(quantity)})
                            fieldList.push({productId: id, productName: product.name, quantity, price});
                        }
                    }
                }}>Add</FormButton>
            </FormGroup>
        );
    }

    const renderTransactions = ({fields, meta: { error, submitFailed }}) => {
        fieldList = fields;
        return (
            <div style={{marginTop: '1rem'}}>
                {/*<Button style={{marginBottom: '0.6rem'}} floated={'left'} color={'green'} type={'button'} onClick={() => {*/}
                {/*    if(!_.find(fields.getAll(), {'id': product.id}))*/}
                {/*        fields.push(product);*/}
                {/*}} >*/}
                {/*    Add*/}
                {/*</Button>*/}

                <Table color={"grey"} celled  size={"large"} compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>QTY</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Desc</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {fields.map((tr, index) => {
                            const prod = fields.get(index);
                            return (
                                <Table.Row key={index}>

                                    <Table.Cell key={'index'}>{index + 1}</Table.Cell>
                                    {_.map(TR_FIELDS, ({name, render, validate}) => (
                                            <Table.Cell key={name}>
                                                <Field key={name} name={`${tr}.${name}`} component={render}
                                                       defaultValue={prod[name] || ''} validate={validate}/>
                                            </Table.Cell>
                                        )
                                    )}
                                    <Table.Cell><Button color='google plus' icon='trash' onClick={() => {
                                        const tr = fields.get(index);
                                        console.log(product, tr);
                                        if(tr.productId === product.id) {
                                            setProduct({...product, quantity: product.quantity + parseInt(tr.quantity)})
                                        }
                                        fields.remove(index);
                                    }}/></Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>

            </div>

        );
    }

    return (
        <React.Fragment>
            {renderProductFields()}
            <Divider section/>
            <FieldArray name={'transactions'} component={renderTransactions} />
        </React.Fragment>
    );
}




export default TransactionForm;

