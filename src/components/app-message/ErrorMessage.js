import React , {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {Message, Transition} from "semantic-ui-react";
import {showErrorMessage} from "../../actions/app-message";



const ErrorMessage = ({title, content, showErrorMessage}) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if(title && content) {
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 2000);
        }
    } , [title, content]);

    return (
        <Transition visible={visible} animation={"fade down"} duration={1000} onHide={() => showErrorMessage({})} >
            <Message  style={{position: 'fixed', zIndex: '1005', width: '100%', top: '0' , margin: '0', }} color={"red"} negative>
                <Message.Header style={{textAlign: 'center'}}>{title || 'ناموفق'}</Message.Header>
                <p style={{textAlign: 'center'}} >
                    {content || ''}
                </p>
            </Message>
        </Transition>
    );
}

const mapStateToProps = (state) => {
    const {title, content} = state.message.error;
    return {title, content};
}


export default connect(mapStateToProps, {showErrorMessage})(ErrorMessage);