import React from "react";
import ReactDOM from 'react-dom';
import './modal.css';

const Modal = ({title, content,actions, onDismiss , visible = true, redHeader, ...props}) => {
    return ReactDOM.createPortal(
        <div onClick={onDismiss} {...props} className={`ui dimmer modals ${visible ? 'active visible' : ''}  full-height ${redHeader ? 'red-header' : ''}`}>
            <div onClick={(e) => e.stopPropagation()} className={`ui standard modal ${visible ? 'active visible' : ''}`}>
                <div className='header'>{title}</div>
                <div className='content'>{content}</div>
                <div className='actions'>{actions}</div>
            </div>
        </div>
        ,
        document.getElementById('modal')
    );
}

export default Modal;