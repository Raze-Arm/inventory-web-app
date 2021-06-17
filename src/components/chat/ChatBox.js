import React, {useEffect, useState, useRef, useReducer} from "react";
import {connect} from "react-redux";
import  _ from 'lodash';
import { Comment, Divider, Form, Grid, Header, Icon, Image, Segment} from "semantic-ui-react";

import placeholder from '../../images/placeholder.png';
import './ChatBox.css'
import {convertToPersianNumber} from "../../utility/numberConverter";
import {Client,} from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import {BACKEND_API, WEBSOCKET_API} from "../../apis/address";







const ChatBox  = ({token, username, state, dispatch}) => {
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

        if(token) {

            const client = new Client({
                brokerURL: `${WEBSOCKET_API}/secured/chat/websocket`, connectHeaders: {login: username, Authorization: token} ,
                // brokerURL: `wss://localhost:8080/secured/chat/websocket`, connectHeaders: {login: username, Authorization: token} ,
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
                    console.log('received users', userList);
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
        }
    }, []);

    const sendMsg = () => {
        if(!msg || msg.trim() === '') return ;
        dispatch({type: 'OWN_MSG', message: {from: username, to: user.username , text: msg}})
        clientRef.current.publish({destination: '/app/secured/user', body: JSON.stringify({from: username, to: user.username, text: msg})});

        setMsg('');
    }
    //
    useEffect(() => {
        const co = document.getElementById('comment');
        if (co)co.scrollTop = co.scrollHeight - co.clientHeight;
    } , [msgList, user]) ;


    const renderChat = () => {
        return (
            <React.Fragment>

                <Comment.Group >

                    <Comment  id={'comment'}>
                        {_.map(msgList[user.username], ({from, date, msg}, i) => {
                            return (
                                <Comment.Content className={`${from !== username ? 'grey' : 'green'}`} key={i}>
                                    <Comment.Author>{msg}
                                        <span style={{wordWrap: 'normal'}}>{convertToPersianNumber(date)}</span>
                                    </Comment.Author>
                                </Comment.Content>
                            );
                        })}

                    </Comment>
                    <Grid style={{margin : 0, padding: 0, height: '45px'}}>
                        <Grid.Column width={11} style={{padding: 0 , backgroundColor: 'white'}}>
                            <Form.TextArea id={'input_message'} type={'text'} value={msg}   onChange={(e) => setMsg(e.target.value)} onKeyDown={handleKeyDown} />
                        </Grid.Column>
                        <Grid.Column width={5} style={{padding: 0}}>
                            <div id={'custom_btn'} onClick={() => sendMsg()} >ارسال</div>
                        </Grid.Column>
                    </Grid>

                </Comment.Group>
            </React.Fragment>
        );
    }

    const renderUserItem = (id, name ,description ,photoAvailable) => {
        return (
            <div style={{height: '50px'}}>
                <Image floated={"right"} circular src={photoAvailable ? `${BACKEND_API}/v1/download/small/user/${id}` : placeholder}  size={"mini"}  />
                <div  >
                    <Header size={"small"} floated={"right"} >
                        {name}
                        <Header.Subheader >{description}</Header.Subheader>
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
                            {renderUserItem(u.id,u.firstName + " " + u.lastName,'Online', u.photoAvailable  )}
                        </Segment>
                    );
                })}
            </Segment.Group> }
        </React.Fragment>
    );

}

const mapStateToProps = (state) => {
    const {username ,token} =  state.auth;
    return {token, username};
}


export default connect(mapStateToProps, {})(ChatBox);