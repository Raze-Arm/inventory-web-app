import React from "react";
import {connect} from 'react-redux';
import {Button} from "semantic-ui-react";

import Modal from "../Modal";
import {getProduct, deleteProduct} from '../../actions/product';
import Loading from "../Loading";



class ProductDelete extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getProduct(id);
    }


    onDelete = () => {
        const id = this.props.match.params.id;
        this.props.deleteProduct(id);
    }

    onCancel = () => {
        this.props.history.push('/product');
    }

    renderActions = () => {
        return (
            <React.Fragment >
                <Button  onClick={() => this.onCancel()} >لغو</Button>
                <Button color={"red"} onClick={() => this.onDelete()} >حذف</Button>
            </React.Fragment>
        );
    }

    render() {
        const product = this.props.product;
        if(!product) return <Loading />

        return  (
            <Modal
                redHeader={true}
                title={"حذف محصول"}
                content={`آیا مطمئن هستید ، می خواهید محصول را حذف کنید: ${product.name}`}
                actions={this.renderActions()}
                onDismiss={() => this.onCancel()}
            > </Modal>
        );
    }

}


const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {product: state.product.items[id]};
}


export default connect(mapStateToProps, {getProduct, deleteProduct})(ProductDelete);