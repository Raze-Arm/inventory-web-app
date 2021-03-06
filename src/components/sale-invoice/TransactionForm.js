import React, {useState} from 'react';
import _ from 'lodash';
import {Field, FieldArray} from "redux-form";
import {Button, Divider, FormButton, FormField, FormGroup, Grid, Header, Image, Input, Table} from "semantic-ui-react";
import NumberFormat from 'react-number-format';

import SearchProduct from "../search/SearchProduct";
import {BACKEND_API} from "../../apis/address";
import {numberFormatter} from "../../utility/numberConverter";

const TR_FIELDS = {
    product: {
        name: 'productName',
        render({input, meta, defaultValue, prod}) {
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
                <label>{numberFormatter(input.value)}</label>
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
    const [trProduct, setTrProduct] = useState({});
    const [fieldsError, setFieldsError] = useState({quantity: ''});

    const renderProductFields = () => {
        return (
            <Grid  stackable  >
                <Grid.Row reversed={"mobile vertically"}>
                    <Grid.Column width={4}>
                        <SearchProduct  key={'product'} onSelect = {(pr) => {
                            setTrProduct(pr);
                            setProduct(pr);
                        }} />
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <FormField  key={product.quantity}   control={Input} error={!!fieldsError.quantity ? fieldsError.quantity : false}  label={'??????????'} defaultValue={product.quantity || 0} className={'form-input__rtl'} onChange={(event, {value}) => {
                            if(value > product.quantity) {

                                setFieldsError({quantity: '??????????????'});
                                setTrProduct({...trProduct, quantity: 0});
                            }
                            else {
                                setTrProduct({...trProduct, quantity: value});
                                setFieldsError({quantity: ''})
                            }
                        }} />
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <div className={'ui form field'}>
                            <label>??????????</label>
                            <NumberFormat   decimalScale={0} key={`available${product.quantity}`}  style={{border: '1px solid grey'}}    disabled    label={'??????????'} defaultValue={product.quantity || 0} className={'form-input__rtl'} />
                        </div>
                    </Grid.Column>



                    <Grid.Column width={5}>
                        <FormField key={product.description} control={Input}   label={'??????????????'} defaultValue={product.description || ''}  className={'form-input__rtl'} onChange={(event, {value}) => {
                            setTrProduct({...trProduct, description: value});
                        }} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={4}>
                        <div className={'ui form field'}>
                            <label>????????</label>
                            <NumberFormat decimalScale={0}  key={product.price}  thousandSeparator={true} defaultValue={product.price || 0}     className={'form-input__rtl'} onChange={(event) => {
                                setTrProduct({...trProduct, price: event.target.value});
                            }} />
                        </div>

                    </Grid.Column>
                    <Grid.Column width={4}>
                        <div className={'ui form field'}>
                            <label>???????? ????????</label>
                            <NumberFormat decimalScale={0}  style={{border: '1px solid grey'}} maxLength={30} key={product.price}  thousandSeparator={true} disabled defaultValue={product.salePrice || 0}     className={'form-input__rtl'} onChange={(event) => {
                                setTrProduct({...trProduct, price: event.target.value});
                            }} />
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={1}>
                        <FormButton  type={'button'}  color={'green'}   onClick={() => {
                            if(!_.find(fieldList.getAll(), {'productId': product.id})){

                                const {id, quantity, price, description} = trProduct;
                                if(quantity > 0) {
                                    setProduct({...product, quantity: product.quantity - parseInt(quantity)})
                                    fieldList.push({productId: id, productName: product.name, imageAvailable: product.imageAvailable, quantity, price, description});
                                }
                            }
                        }}>????????????</FormButton>
                    </Grid.Column>
                </Grid.Row>
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
                            <Table.HeaderCell>??????????</Table.HeaderCell>
                            <Table.HeaderCell>??????????</Table.HeaderCell>
                            <Table.HeaderCell>????????</Table.HeaderCell>
                            <Table.HeaderCell>??????????????</Table.HeaderCell>
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
                                                       defaultValue={prod[name] || ''} prod={prod} validate={validate}/>
                                            </Table.Cell>
                                        )
                                    )}
                                    <Table.Cell><Button color='google plus' icon='trash' onClick={() => {
                                        const tr = fields.get(index);
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

