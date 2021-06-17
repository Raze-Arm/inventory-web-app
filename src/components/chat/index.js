import React, {useState, useReducer} from 'react';
import ChatBox from "./ChatBox";
import {Button, Header, Icon, Image, Segment, Transition} from "semantic-ui-react";

import './index.css';
import moment from "moment-timezone";
import {BACKEND_API} from "../../apis/address";

export const initialState = {
    msgList: {},
    user: null
}

export function msgReducer(state, action) {
    const {message} = action;
    const mo = moment(new Date().getTime()) ;
    const d = mo.tz('Asia/Tehran').format('HH:mm');

    switch (action.type) {

        case 'USER_MSG': {
            const userMsgList =  state.msgList[message.from] ;
            return {...state, msgList: {...state.msgList, [message.from]: [...userMsgList || [] , {from: message.from , date: d, msg: message.text}] } }
        }
        case 'OWN_MSG': {
            const userMsgList =  state.msgList[message.to] ;
            return {...state, msgList: {...state.msgList, [message.to]: [...userMsgList || [] , {from: message.from , date: d, msg: message.text}] } }
        }
        case 'SET_USER': {
            return  {...state , user: action.user}
        }
        case 'SET_STATE' : {
            return {...action.state};
        }
        default : return state;
    }
}



const Index = () => {
    const [state, dispatch] = useReducer(msgReducer, initialState);
    const [visible, setVisible] = useState(true);
    const { user} = state;
    console.log('user##', user)
    let chatBox, chat, chatBtn, topSegment;




    const onAnimationEnd =  () => {

            chat.classList?.add('show');
            topSegment.classList.add('show')
    }

    const onChatBtnClick = () => {
        topSegment = document.getElementById('top_segment');
        chatBox  = document.getElementById('chat_box');
        chat = document.getElementById('chat');
        chatBtn = document.getElementById('chat_btn');
         if(chatBox)chatBox.addEventListener("animationend", onAnimationEnd, false);

        if(!chatBox.classList.contains('expandout')) {
            chatBtn.classList.add('hide')
            chatBox.classList.add('expandout')
        }
        else chatBox.classList.remove('expandout')
    }

    const closeChatBox = () => {
        topSegment = document.getElementById('top_segment');
        chatBox  = document.getElementById('chat_box');
        chat = document.getElementById('chat');
        chatBtn = document.getElementById('chat_btn');

        chatBtn.classList.remove('hide');
        chat.classList.remove('show');
        topSegment.classList.remove('show');
        chatBox.classList.remove('expandout');
        if (chatBox.removeEventListener) {                   // For all major browsers, except IE 8 and earlier
            chatBox.removeEventListener("mousemove", onAnimationEnd);
        } else if (chatBox.detachEvent) {                    // For IE 8 and earlier versions
            chatBox.detachEvent("onmousemove", onAnimationEnd);
        }
        dispatch({type: 'SET_USER', user: null})
    }


    const renderUserHeader = () => {
        const {id, firstName, lastName , photoAvailable} = user;
        return (
            <div style={{verticalAlign: 'center'}} >
                {photoAvailable ? <Image  size={"mini"}  floated={"right"} style={{padding: '0' , margin: '0'}} src={`${BACKEND_API}/v1/download/small/user/${id}`} circular /> : ''}
                <Header size={"medium"}  floated={"right"} style={{paddingTop: '0',paddingRight: '0', textAlign: 'center', margin: '0', display: 'inline-block',}}>{firstName + " " + lastName}</Header>
                {/*<Icon id={'close_btn'} name={'close'}  style={{display: 'inline-block', marginTop: '10px', marginLeft: '10px', marginBottom: '18px'}} onClick={() => dispatch({type: 'SET_USER', user: null})} />*/}
                <Icon name={'arrow right'}  id={'back_btn'}  onClick={() => {dispatch({type: 'SET_USER', user: null})}}  corner={"top left"} link style={{float: 'left'}} />
            </div>
        );
    }

    const renderDefaultHeader = () => {
        return (
            <React.Fragment >
                کاربرات آنلاین
                <Icon name={'close'} onClick={closeChatBox}  corner={"top left"} link style={{float: 'left'}} />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <ChatIcon onClick={() => onChatBtnClick()} />
            <div id={'chat_box'} >
                <Segment id={'top_segment'}    attached={"bottom"}   >
                        {user ? renderUserHeader() : renderDefaultHeader()}
                </Segment>
                <div id={'chat'} >
                    <ChatBox state={state} dispatch={dispatch} />
                </div>
            </div>
        </React.Fragment>
    );
}



const  ChatIcon =  ({onClick}) =>  {
    const [visible, setVisible] = useState(true);
    return (
        <Transition  animation={'jiggle'} duration={{show: 800}} visible={visible}   >
            <Icon id={'chat_btn'} style={{fontSize: '40px'}} link onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
                  onClick={ onClick} size={'big'} name={'chat'}/>
        </Transition>
    );
}

export default  Index;