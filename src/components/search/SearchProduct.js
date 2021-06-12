import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import _ from 'lodash';

import {getProductPage, getProduct} from '../../actions/product';
import SearchInput from "../inputs/SearchInput";
import SearchBasic from "../inputs/SearchBasic";
import {BACKEND_API} from "../../apis/address";


const SearchProduct = ({products,product,getProductPage,getProduct,input,hasError,defaultSearchQuery,onSelect}) => {
    const [defaultValue,setDefaultValue] = useState(defaultSearchQuery);

    useEffect(() => {
        if(product) {
            setDefaultValue(`${product.name}`);
            onSelect(product);
        }
    }, [product]);
    return (

        <SearchBasic key={products} input={input} onSelect={onSelect} label={'محصول'}  hasError={hasError} options={_.map(products, (value, key) => ({
            ...value,
            title: value.name,
            image: value.imageAvailable ? BACKEND_API + `/v1/download/small/product/${value.id}` : null,
            description: value.description !== 'null' && 'undefined' ? value.description : ''
        }))} getSearchedSources={(search) => getProductPage({page: 0, size: 5, search})}/>
    );
}


const mapStateToProps = (state, props) => {
    const products = state.product.items;
    let product = null;
    return {products,product};
}

export default connect(mapStateToProps, {getProductPage, getProduct})(SearchProduct);
