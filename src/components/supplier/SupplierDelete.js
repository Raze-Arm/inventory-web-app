import React from "react";
import {connect} from 'react-redux';
import {Button, Dimmer, Loader} from "semantic-ui-react";

import Modal from "../Modal";
import {getSupplier, deleteSupplier} from "../../actions/supplier";


class SupplierDelete extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getSupplier(id);
    }

    onDelete = () => {
        const id = this.props.match.params.id;
        this.props.deleteSupplier(id);
    }
    onCancel = () => {
        this.props.history.push('/supplier');
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
        const supplier = this.props.supplier;
        if(!supplier) return <Dimmer><Loader /></Dimmer>;

        return  (
            <Modal
                title={"Delete Supplier"}
                content={`Are You Sure , You Want To Delete Supplier : ${supplier.firstName} ${supplier.lastName || ''}`}
                actions={this.renderActions()}
                onDismiss={() => this.onCancel()}
            > </Modal>
        );
    }
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {supplier: state.supplier.items[id]};
}

export default connect(mapStateToProps, {getSupplier, deleteSupplier})(SupplierDelete);