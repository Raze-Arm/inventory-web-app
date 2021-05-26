import React from "react";
import {connect} from "react-redux";
import ProductForm  from './ProductForm';

import {saveProduct} from "../../actions/product";


const ProductSave = ({saveProduct}) => {

    const onSubmit = formValues => {
        console.log(formValues);
        saveProduct(formValues);
    }

    return (
            <ProductForm onSubmit={onSubmit} />
    );
}

export default connect(null, {saveProduct})(ProductSave);