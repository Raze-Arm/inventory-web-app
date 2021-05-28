import React from "react";
import {connect} from 'react-redux';
import _ from 'lodash';

import {getProduct, updateProduct} from '../../actions/product';
import ProductForm from './ProductForm'
import {Dimmer, Loader} from "semantic-ui-react";



class ProductUpdate extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getProduct(id);
    }

    onUpdate = formValues => {
        const id = this.props.match.params.id;
        console.log('form values', {id, ...formValues});
        this.props.updateProduct({id, ...formValues});
    }

    render() {
        const product = this.props.product;
        if(!product) return <Dimmer><Loader/></Dimmer>;
        return (
                <ProductForm initialValues = {_.omit(product, 'id')} onSubmit = {this.onUpdate} type={'Update'} />
        );
    }
}


const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {product: state.product.items[id]};
}


export default connect(mapStateToProps, {getProduct, updateProduct})(ProductUpdate);