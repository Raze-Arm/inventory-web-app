import React from "react";
import {connect} from 'react-redux';
import {Button} from "semantic-ui-react";

import Modal from "../Modal";
import {getPInvoice, deletePInvoice} from "../../actions/purchase-invoice";
import Loading from "../Loading";

class PurchaseInvoiceDelete extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getPInvoice(id);
    }

    onDelete = () => {
        const id = this.props.match.params.id;
        this.props.deletePInvoice(id);
    }

    onCancel = () => {
        this.props.history.push('/purchase-invoice');
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
        const invoice = this.props.invoice;
        if(!invoice) return <Loading />;

        return  (
            <Modal
                redHeader={true}
                title={"حذف صورتحساب خرید"}
                content={`آیا مطمئن هستید ، می خواهید صورتحساب خرید را حذف کنید:${invoice.id}`}
                actions={this.renderActions()}
                onDismiss={() => this.onCancel()}
            > </Modal>
        );
    }

}


const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {invoice: state.purchaseInvoice.items[id]};
}

export default connect(mapStateToProps, {getPInvoice, deletePInvoice})(PurchaseInvoiceDelete);