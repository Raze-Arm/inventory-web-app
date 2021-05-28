import React from "react";
import {connect} from 'react-redux';
import {Button, Dimmer, Loader} from "semantic-ui-react";

import Modal from "../Modal";
import {getSInvoice, deleteSInvoice} from "../../actions/sale-invoice";


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
                <Button color={"red"} onClick={() => this.onCancel()} >Cancel</Button>
                <Button color={"green"} onClick={() => this.onDelete()} >Delete</Button>
            </React.Fragment>
        );
    }

    render() {
        const invoice = this.props.invoice;
        if(!invoice) return <Dimmer><Loader /></Dimmer>;

        return  (
            <Modal
                title={"Delete Sale Invoice"}
                content={`Are You Sure , You Want To Delete Sale Invoice : ${invoice.id}`}
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