import React from "react";
import {connect} from "react-redux";
import Moment from 'react-moment';
import {
    Container,
    Divider,
    Header,
    List,
    Segment,
    Placeholder,
    Image,
    Grid,
    Form,
    Button,
    Menu
} from "semantic-ui-react";

import {getUser, getUserPhoto} from '../../actions/user';
import Loading from "../Loading";
import  './UserShow.css';
import UserActivity from "./UserActivity";
const PROFILE = 'PROFILE';
const HISTORY = 'HISTORY';
class UserShow extends React.Component {
    state = {activeItem: PROFILE}
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getUser(id);
        this.props.getUserPhoto(id);
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })



    renderProfile() {
        const {user} = this.props;
        if(!user) return <Loading />;
        return (
            <Segment className={'custom-segment'} color={"grey"} textAlign={"center"}>
                <Header>User</Header>
                {user.photo ? <Image rounded centered src={window.URL.createObjectURL(user.photo) } /> : null}
                <Divider />
                <List divided   relaxed>

                    <List.Item >
                        <List.Header>First Name</List.Header>
                        {user.firstName}
                    </List.Item>
                    <List.Item>
                        <List.Header>Last Name</List.Header>
                        {user.lastName || <br />}
                    </List.Item>
                    <List.Item>
                        <List.Header>Address</List.Header>
                        {user.username || <br />}
                    </List.Item>
                    <List.Item>
                        <List.Header>Created Date</List.Header>
                        {user.createdDate ? <Moment format={'YYYY/MM/DD hh:mm'}>{user.createdDate}</Moment> : <br />}
                    </List.Item>
                </List>
            </Segment>
        );
    }

    render() {const {activeItem} = this.state;
       return (

            <Container >
                <Grid textAlign={'center'} >
                    <Grid.Column style={{maxWidth: '650px'}}>
                        <Header>User</Header>
                        <Menu pointing secondary style={{borderBottom: '0'}}>
                            <Menu.Item
                                name={PROFILE}
                                active={activeItem === PROFILE}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name={HISTORY}
                                active={activeItem === HISTORY}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                        {activeItem === PROFILE ? this.renderProfile() : <UserActivity username={this.props.user.username} />}
                    </Grid.Column>

                </Grid>

            </Container>
       );
    }


}

const mapStateToProps = (state, props) => {
    const  id = props.match.params.id;
    return {user: state.user.items[id]};
}

export default connect(mapStateToProps, {getUser, getUserPhoto})(UserShow);