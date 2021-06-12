import React from "react";
import {connect} from "react-redux";
import {Container, Header, Segment, List, Divider, Image} from "semantic-ui-react";

import {getProduct} from '../../actions/product';
import Loading from "../Loading";

import moment from "jalali-moment";
import {convertToPersianNumber} from "../../utility/numberConverter";
import './ProductShow.css'
import {BACKEND_API} from "../../apis/address";

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
                    {product.imageAvailable ? <Image size={"medium"} rounded centered  src={BACKEND_API + `/v1/download/product/${product.id}`} /> : ''}
                    <Header textAlign={"center"}>محصول</Header>
                    <Divider />
                    <List id={'product-list'} divided relaxed  >
                        <List.Item >
                            <List.Header>نام</List.Header>
                            {product.name}
                        </List.Item>
                        <List.Item>
                            <List.Header>قیمت</List.Header>
                            {product.price || <br />}
                        </List.Item>
                        <List.Item>
                            <List.Header>قیمت فروش</List.Header>
                            {product.salePrice || <br />}
                        </List.Item>
                        <List.Item>
                            <List.Header>تعداد</List.Header>
                            {product.quantity || 0}
                        </List.Item>
                        <List.Item>
                            <List.Header>توضیحات</List.Header>
                            {product.description !== 'null' && 'undefined' ? product.description :  <br />}
                        </List.Item>
                        <List.Item>
                            <List.Header>تاریخ</List.Header>
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




