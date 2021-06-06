import React from "react";
import ReactDOM from 'react-dom';
import './ErrorModal.css';

const ErrorModal = ({title, content,actions, onDismiss , visible = true, ...props}) => {
    return ReactDOM.createPortal(
        <div onClick={onDismiss} {...props} className={`ui dimmer error-modal   ${visible ? 'active visible' : ''}  full-height`}>
            <div onClick={(e) => e.stopPropagation()}  className={`ui standard modal error-modal ${visible ? 'active visible' : ''}`}>
                <div className='header'>{title}</div>
                <div className='content'>{content}</div>
                <div className='actions'>{actions}</div>
            </div>
        </div>
        ,
        document.getElementById('error-modal')
    );
}

export default ErrorModal;