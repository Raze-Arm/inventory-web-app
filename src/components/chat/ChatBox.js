import React, {useEffect, useState, useRef, useReducer} from "react";
import {connect} from "react-redux";
import  _ from 'lodash';
import {Comment, Form, Grid, Header, Icon, Label, Segment} from "semantic-ui-react";

import './ChatBox.css'
import {convertToPersianNumber} from "../../utility/numberConverter";
import {Client,} from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import {BACKEND_API, WEBSOCKET_API} from "../../apis/address";
import {AppImage} from "../AppImage";







const ChatBox  = ({ username, state, dispatch}) => {
    const [userList, setUserList] = useState({});
    const [msg, setMsg ] = useState('');
    const clientRef = useRef();

    const {msgList, user} = state;



    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            sendMsg()
        }
    }

    const updateMsgList = (message) => {
        dispatch({type: 'USER_MSG', message: message})
    }


    useEffect(() => {
        if(_.size(msgList) > 0)localStorage.setItem("chat", JSON.stringify(state));
    } , [msgList]);
    useEffect(() => {
        const chat = localStorage.getItem("chat");
        if(chat) {
            dispatch({type: 'SET_STATE', state: JSON.parse(chat)})
        }

            const client = new Client({
                brokerURL: `${WEBSOCKET_API}/secured/chat/websocket`, connectHeaders: {login: username} ,
                reconnectDelay: 15000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,

            },  ); // cause of withWebSockjs append on server side
            clientRef.current = client;
            client.onConnect = function (fra) {
                client.subscribe('/secured/user/queue/messages'    , (m) => {
                    const message = JSON.parse(m.body);
                    console.log('received message', message);
                    updateMsgList(message)
                })
                client.subscribe('/queue/users'    , (m) => {
                    const userList = _.filter(JSON.parse(m.body) , (u) => u.username !== username)
                    // console.log('received users', userList);
                    setUserList(_.mapKeys(userList, "id"));
                })
            }

            if(typeof  WebSocket !== 'function') {
                client.webSocketFactory = function () {
                    return new SockJS(`${WEBSOCKET_API.replace('ws://', 'http://')}/secured/chat/websocket`)
                }
            }

            client.onStompError = function (frame) {
                console.log('Details', frame.body, frame.command);
            }

            client.activate();
            return  () => client.deactivate();
    }, []);

    const sendMsg = () => {
        if(!msg || msg.trim() === '') return ;
        const date = new Date().getTime();
        dispatch({type: 'OWN_MSG', message: {from: username, to: user.username , text: msg, date: date}})
        clientRef.current.publish({destination: '/app/secured/user', body: JSON.stringify({from: username, to: user.username, text: msg ,date: date})});

        setMsg('');
    }
    const onChangeMessage = (e) => {
        const msg = e.target.value;
        setMsg(msg);
        if(msg.length > 0)clientRef.current.publish({destination: '/app/secured/user', body: JSON.stringify({from: username, to: user.username, typing: true})});
        else clientRef.current.publish({destination: '/app/secured/user', body: JSON.stringify({from: username, to: user.username, typing: false})})
    }
    //
    useEffect(() => {
        const co = document.getElementById('comment');
        if (co)co.scrollTop = co.scrollHeight - co.clientHeight;
    } , [msgList, user]) ;


    const renderChat = () => {
        const userMsgList =msgList[user.username];
        const messages = userMsgList?.items;
        return (
            <React.Fragment>

                <Comment.Group >

                    <Comment  id={'comment'}>
                        {_.map(messages , ({from, date, msg,error}, i) => {
                            return (
                                <Comment.Content className={`${from !== username ? 'grey' : 'green'}`} key={i}>
                                    <Comment.Author>{msg}
                                        <span style={{wordWrap: 'normal'}}>{convertToPersianNumber(date)}</span>
                                        {error ?  <div style={{marginTop: '2px'}}><Icon name={'exclamation circle'} color={"red"} /></div> : '' }
                                    </Comment.Author>
                                </Comment.Content>
                            );
                        })}
                    </Comment>
                    <Grid style={{margin : 0, padding: 0, height: '45px'}}>
                        <Grid.Column width={11} style={{padding: 0 , backgroundColor: 'white'}}>
                            <Form.TextArea maxLength="80" id={'input_message'} type={'text'} value={msg}   onChange={onChangeMessage} onKeyDown={handleKeyDown} />
                        </Grid.Column>
                        <Grid.Column width={5} style={{padding: 0}}>
                            <div id={'custom_btn'} onClick={() => sendMsg()} >ارسال</div>
                        </Grid.Column>
                    </Grid>

                </Comment.Group>
            </React.Fragment>
        );
    }

    const renderUserItem = (id, name ,description ) => {
        return (
            <div style={{height: '50px'}}>
                <AppImage floated={"right"} style={{height: 40, width: 40 , borderRadius: '50px'}} src={`${BACKEND_API}/v1/download/small/user/${id}` }     />
                <div  >
                    <Header size={"small"} floated={"right"} style={{wordWrap: 'break-word', overflow: 'hidden', whiteSpace: 'nowrap' , textOverflow: 'ellipsis' , width: '13em', height: '55px'}} >
                        {name}
                        <Header.Subheader   style={{textOverflow: 'ellipsis'}}>{description}</Header.Subheader>
                    </Header>
                </div>
            </div>
        );
    }
    return (
        <React.Fragment>

            {user ? <Segment.Group >{renderChat(user)}</Segment.Group> : <Segment.Group  id={'user_list'}>
                {_.map(userList, (u, i) => {
                    return (
                        <Segment key={i} onClick={() => dispatch({type: 'SET_USER', user: u})}>
                            {renderUserItem(u.id,u.firstName + " " + u.lastName, _.findLast(msgList[u.username]?.items)?.msg,  )}
                        </Segment>
                    );
                })}
            </Segment.Group> }
        </React.Fragment>
    );

}

const mapStateToProps = (state) => {
    const {username} =  state.auth;
    return { username};
}


export default connect(mapStateToProps, {})(ChatBox);