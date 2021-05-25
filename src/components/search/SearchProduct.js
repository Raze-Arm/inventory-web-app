import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import _ from 'lodash';

import {getProductPage, getProduct} from '../../actions/product';
import SearchInput from "../inputs/SearchInput";


const SearchProduct = ({products,product,getProductPage,getProduct,input,hasError,defaultSearchQuery,onSelect}) => {
    const [defaultValue,setDefaultValue] = useState(defaultSearchQuery);

    useEffect(() => {
        if(product) {
            setDefaultValue(`${product.name}`);
            onSelect(product);
        }
    }, [product]);
    return (
        <SearchInput key={"products"} hasError={hasError} input={input}
                     placeholder={"Product Name"}
                     label={"Product"} options={_.map(products, (value,key) => (value))}
                     onSelect={onSelect}
                     onSearchChange={(search) => getProductPage({page: 0,size: 5,search})}
                     defaultSearchQuery={defaultValue|| ''}
        />
    );
}


const mapStateToProps = (state, props) => {
    const products = state.product.items;
    let product = null;
    return {products,product};
}

export default connect(mapStateToProps, {getProductPage, getProduct})(SearchProduct);
