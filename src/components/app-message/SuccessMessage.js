import React , {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {Message, Transition} from "semantic-ui-react";
import {showSuccessMessage} from "../../actions/app-message";


const SuccessMessage = ({title, content, showSuccessMessage}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(title && content) {
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 2000)
        }
    } , [title, content]);
    return (
        <Transition visible={visible} animation={"fade down"} duration={1000} onHide={() => showSuccessMessage({})} >
            <Message style={{position: 'fixed', zIndex: '1005', width: '100%', top: '0' , margin: '0'  }} color={"green"} positive>
                <Message.Header style={{textAlign: 'center'}} >{title || 'موفق'}</Message.Header>
                <p style={{textAlign: 'center'}}>
                    {content || ''}
                </p>
            </Message>
        </Transition>
    );
}

const mapStateToProps = (state) => {
    const {title, content} = state.message.success;
    return {title, content};
}


export default connect(mapStateToProps, {showSuccessMessage})(SuccessMessage);