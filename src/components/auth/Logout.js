import React from "react";
import {connect} from "react-redux";
import {Button} from "semantic-ui-react";


import {logout} from "../../actions/auth";
import Modal from "../Modal";
import history from "../../history";

const Logout =  ({logout, username}) => {

    const onLogout = () => {
        logout();
        history.push('/login');
    }
    const onCancel = () => {
        history.push('/');
    }

    const renderActions = () => {
        return (
            <React.Fragment >
                <Button color={"red"} onClick={() => onCancel()} >لغو</Button>
                <Button color={"green"} onClick={() => onLogout()} >خروج</Button>
            </React.Fragment>
        );
    }


    return (

        <Modal
            title={"خروج "}
            content={ `آیا مطمئن هستید ، می خواهید از این سایت خارج شوید:` + username}
            actions={renderActions()}
            onDismiss={() => onCancel()}
        > </Modal>
    );

}


const mapStateToProps = (state) => {
    const {username} = state.auth;
    return {username};
}


export default connect(mapStateToProps, {logout})(Logout);