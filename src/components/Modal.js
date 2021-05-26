import React from "react";
import ReactDOM from 'react-dom';
import './modal.css';

const Modal = ({title, content,actions, onDismiss}) => {
    return ReactDOM.createPortal(
        <div onClick={onDismiss} className='ui dimmer modals visible active full-height'>
            <div onClick={(e) => e.stopPropagation()} className='ui standard modal visible active'>
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