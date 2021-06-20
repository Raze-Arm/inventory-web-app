import React, {useState} from 'react';
import _ from 'lodash';
import {Field, FieldArray} from "redux-form";
import {Button, Divider, FormButton, FormField, FormGroup, Grid, Header, Image, Input, Table} from "semantic-ui-react";

import SearchProduct from "../search/SearchProduct";
import {BACKEND_API} from "../../apis/address";
import {convertToPersianNumber, numberFormatter, numberParser} from "../../utility/numberConverter";
import NumberFormat from "react-number-format";


const TR_FIELDS = {
    product: {
        name: 'productName',
        render({input, meta, defaultValue,prod}) {
            if(defaultValue) input.value = defaultValue;
            return (
                <Header as={'h4'} image>
                    {prod.imageAvailable  ? <Image src={BACKEND_API + `/v1/download/small/product/${prod.productId}`}  rounded size='mini' /> : ''}
                    <Header.Content>{input.value}</Header.Content>
                </Header>
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
               <label>{convertToPersianNumber(input.value)}</label>
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

    const renderProductFields = () => {
        return (
            <Grid  stackable>
                <Grid.Column width={4}>
                    <SearchProduct  key={'product'} onSelect = {(pr) => {
                        setTransaction(pr);
                        setProduct(pr);
                    }} />
                </Grid.Column>

                <Grid.Column width={3}>
                    <FormField key={product.quantity} control={Input}   label={'تعداد'} defaultValue={0} className={'form-input__rtl'} onChange={(event, {value}) => {
                        setTransaction({...transaction, quantity: value});
                    }} />
                </Grid.Column>

                <Grid.Column width={3}>

                    <div className={'ui form field'}>
                        <label>قیمت</label>
                        <NumberFormat decimalScale={0}  maxLength={30} key={product.price}  thousandSeparator={true} defaultValue={product.price || 0}     className={'form-input__rtl'} onChange={(event) => {
                            setTransaction({...transaction, price: event.target.value});
                        }} />
                    </div>
                </Grid.Column>

                <Grid.Column width={4}>
                    <FormField key={product.description} control={Input}  label={'توضیحات'} defaultValue={product.description || ''}  className={'form-input__rtl'} onChange={(event, {value}) => {
                        setTransaction({...transaction, description: value});
                    }} />
                </Grid.Column>
                <Grid.Column width={2}>
                    <FormButton type={'button'} style={{marginTop: '25px'}} color={'green'}   onClick={() => {
                        if(!_.find(fieldList.getAll(), {'productId': product.id})){
                            const {id, quantity, price, description} = transaction;
                            if(quantity > 0) {
                                fieldList.push({productId: id, productName: product.name, imageAvailable: product.imageAvailable, quantity, price,description});
                            }
                        }
                    }}>افزودن</FormButton>
                </Grid.Column>
            </Grid>
        );
    }

    const renderTransactions = ({fields, meta: { error, submitFailed }}) => {
        fieldList = fields;
        return (
            <div style={{marginTop: '1rem'}}>

                <Table color={"grey"} celled  size={"large"} compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>محصول</Table.HeaderCell>
                            <Table.HeaderCell>تعداد</Table.HeaderCell>
                            <Table.HeaderCell>قیمت</Table.HeaderCell>
                            <Table.HeaderCell>توضیح</Table.HeaderCell>
                            <Table.HeaderCell/>
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
                                                       defaultValue={prod[name] || ''} prod={prod} validate={validate}/>
                                            </Table.Cell>
                                        )
                                    )}
                                    <Table.Cell><Button color='google plus' icon='trash' onClick={() => {
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



