import React from "react";
import {connect} from "react-redux";
import Moment from 'react-moment';
import {Container, Header, Segment, List, Divider} from "semantic-ui-react";

import {getProduct} from '../../actions/product';
import Loading from "../Loading";

import moment from "jalali-moment";
import {convertToPersianNumber} from "../../utility/numberConverter";


class ProductShow extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getProduct(id);
    }



    render() {
        const product = this.props.product;
        if(!product) return <Loading />
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
                            {product.createdDate ? convertToPersianNumber(moment(product.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD')) : <br />}
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




