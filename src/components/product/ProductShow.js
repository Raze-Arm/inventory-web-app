import React from "react";
import {connect} from "react-redux";
import Moment from 'react-moment';
import {Container, Dimmer, Header, Loader, Segment, List, Divider} from "semantic-ui-react";

import {getProduct} from '../../actions/product';




class ProductShow extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getProduct(id);
    }



    render() {
        const product = this.props.product;
        if(!product) return <Dimmer><Loader/></Dimmer>
        return (
            <Container>
                <Segment color={"grey"}>
                    <Header>Product</Header>
                    <Divider />
                    <List divided relaxed>
                        <List.Item>
                            <List.Header>Name</List.Header>
                            {product.name}
                        </List.Item>
                        <List.Item>
                            <List.Header>Price</List.Header>
                            {product.price || <br />}
                        </List.Item>
                        <List.Item>
                            <List.Header>Sale Price</List.Header>
                            {product.salePrice || <br />}
                        </List.Item>
                        <List.Item>
                            <List.Header>Quantity</List.Header>
                            {product.quantity || 0}
                        </List.Item>
                        <List.Item>
                            <List.Header>Description</List.Header>
                            {product.description || <br />}
                        </List.Item>
                        <List.Item>
                            <List.Header>Created Date</List.Header>
                            {product.createdDate ? <Moment format={'YYYY/MM/DD hh:mm'}>{product.createdDate}</Moment> : <br />}
                        </List.Item>
                    </List>
                </Segment>
            </Container>
        );
    }
}



const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {product: state.product.items[id]};
}

export default connect(mapStateToProps, {getProduct})(ProductShow);



