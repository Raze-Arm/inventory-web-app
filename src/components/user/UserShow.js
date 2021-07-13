import React ,{useState,useEffect} from "react";
import {connect} from "react-redux";
import _ from 'lodash';
import {
    Container,
    Divider,
    Header,
    List,
    Segment,
    Image,
    Grid,
    Menu
} from "semantic-ui-react";
import moment from "jalali-moment";
import {convertToPersianNumber} from "../../utility/numberConverter";
import {getUser, getUserByUsername} from '../../actions/user';
import Loading from "../Loading";
import  './UserShow.css';
import UserActivity from "./UserActivity";
import {BACKEND_API} from "../../apis/address";
const PROFILE = 'مشخصات';
const HISTORY = 'تاریخچه';



const UserShow = (props) => {
    const [activeItem ,setActiveItem] = useState(PROFILE);


    useEffect(() => {
        const id = props.match.params.id;
        if(id) {
            props.getUser(id);
        }else {
            const {search} = props.location;
            const match = search.match(/username=(.*)/);
            const username = match?.[1];
            props.getUserByUsername(username);
        }
    }, []);

    const handleItemClick = (e, { name }) => setActiveItem(name);



    const renderProfile = () =>  {
        const {user} = props;
        if(!user) return <Loading />;
        return (
            <Segment className={'custom-segment'} color={"grey"} textAlign={"center"}>
                <Header>کاربر</Header>
                {/*{user.photo ? <Image rounded centered src={window.URL.createObjectURL(user.photo) } /> : ''}*/}
                {user.imageAvailable ? <Image rounded centered src={BACKEND_API + `/v1/download/user/${user.username}` } /> : ''}
                <Divider />
                <List divided   relaxed>

                    <List.Item >
                        <List.Header>نام</List.Header>
                        {user.firstName}
                    </List.Item>
                    <List.Item>
                        <List.Header>نام خانوادگی</List.Header>
                        {user.lastName || <br />}
                    </List.Item>
                    <List.Item>
                        <List.Header>آدرس</List.Header>
                        {user.username || <br />}
                    </List.Item>
                    <List.Item>
                        <List.Header>تاریخ</List.Header>
                        {user.createdDate ?
                            convertToPersianNumber(moment(user.createdDate, 'YYYY/MM/DD hh:mm').locale('fa').format('hh:mm , YYYY/MM/DD'))
                            : <br />}
                    </List.Item>
                </List>
            </Segment>
        );
    }
       return (

            <Container >
                <Grid textAlign={'center'} >
                    <Grid.Column style={{maxWidth: '650px'}}>
                        <Header>User</Header>
                        <Menu pointing secondary style={{borderBottom: '0'}}>
                            <Menu.Item
                                name={PROFILE}
                                active={activeItem === PROFILE}
                                onClick={handleItemClick}
                            />
                            <Menu.Item
                                name={HISTORY}
                                active={activeItem === HISTORY}
                                onClick={handleItemClick}
                            />
                        </Menu>
                        {activeItem === PROFILE ? renderProfile() : <UserActivity username={props.user.username} />}
                    </Grid.Column>

                </Grid>

            </Container>
       );


}

const mapStateToProps = (state, props) => {
    const  id = props.match.params.id;
    const {search} = props.location;
    const {items} = state.user;
    const match = search.match(/username=(.*)/);
    const username = match?.[1];
    const user = id ? state.user.items[id] : _.find(items, (i) => i.username = username );
    return {user: user};
}

export default connect(mapStateToProps, {getUser, getUserByUsername})(UserShow);