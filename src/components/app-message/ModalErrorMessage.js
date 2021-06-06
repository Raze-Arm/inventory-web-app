import React , {useState, useEffect} from "react";
import {connect} from 'react-redux';
import {Button, Message, Accordion, Icon, Header} from "semantic-ui-react";

import {showModalErrorMessage} from '../../actions/app-message';
import ErrorModal from "./ErrorModal";



const ModalErrorMessage = ({title, content, details}) => {
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(false);
    useEffect(() => {
        if(title) setVisible(true);
    }, [title]);

    const onCancel = () => {
        setVisible(false);
        showModalErrorMessage({title: null, content: null , details: null});
        // this.props.history.push('/customer');
    }
    const renderActions = () => {
        return (
            <React.Fragment >
                <Button  onClick={() => onCancel()} >close</Button>
            </React.Fragment>
        );
    }

    const renderContentAndDetails = ()  => {
        return (
            <Message error style={{border: '0 solid white'}}>
                <Header size={"small"} style={{marginBottom: '5px'}}>{content}</Header>
                <Accordion  vertical={'true'}  fluid>
                    <Accordion.Title
                        active={active}
                        index={0}
                        onClick={() => setActive(!active)}
                        style={{border: '0 solid white'}}
                    >
                        <b style={{color: 'red'}}>Details</b>
                        <Icon color={"red"} name={`triangle ${active ? 'down' : 'left'}`}  />
                    </Accordion.Title>
                    <Accordion.Content  style={{border: '0 solid white'}}  active={active}>
                        <Message  style={{backgroundColor: '#f7e6e6' , maxHeight: '120px', overflowY: 'scroll'}}>{details?.toString() || ''}
                        </Message>
                    </Accordion.Content>
                </Accordion>
            </Message>
        );
    }

    const renderTitle = () => {
        return (
            <Message color={"red"}>
                {title}
            </Message>
        );
    }


    return (
        <ErrorModal
            style={{padding: '0'}}
            title={renderTitle()}
            content={renderContentAndDetails()}
            actions={renderActions()}
            onDismiss={() => onCancel()}
            visible={visible}
        > </ErrorModal>
    );

}

const mapStateToProps = (state) => {
    const {title, content, details} = state.message.modalError;
    return {title, content, details};
}


export default connect(mapStateToProps, {})(ModalErrorMessage);
