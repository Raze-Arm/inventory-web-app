import React from "react";
import {connect} from 'react-redux';
import {Button} from "semantic-ui-react";

import Modal from "../Modal";
import {getSInvoice, deleteSInvoice} from "../../actions/sale-invoice";
import Loading from "../Loading";


class SaleInvoiceDelete extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getSInvoice(id);
    }


    onDelete = () => {
        const id = this.props.match.params.id;
        this.props.deleteSInvoice(id);
    }

    onCancel = () => {
        this.props.history.push('/sale-invoice');
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
                title={"صورتحساب فروش را حذف کنید"}
                content={`آیا مطمئن هستید ، می خواهید صورتحساب فروش را حذف کنید:${invoice.id}`}
                actions={this.renderActions()}
                onDismiss={() => this.onCancel()}
            > </Modal>
        );
    }

}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {invoice: state.saleInvoice.items[id]};
}

export default connect(mapStateToProps, {getSInvoice, deleteSInvoice})(SaleInvoiceDelete);