import React ,{useEffect} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import _ from 'lodash';
import {Container, Feed, Grid, Segment} from "semantic-ui-react";

import {getActivityPageByUsername} from '../../actions/activity';


const UserActivity = ({username, activities, getActivityPageByUsername}) => {


    useEffect(() => {
        getActivityPageByUsername({username, page: 0, size: 20});
    }, []);


    const renderPostMethod = (activity, time) => {
        const {id, parameter , entity , username} =activity;

        return  (
            <Feed.Event key={id}>
                <Feed.Content  >
                    <Feed.Summary style={{textAlign: 'left' ,direction: 'ltr'}} >
                        {username} added <Link to={`/${entity}/show/${parameter}`}>{entity}</Link>
                        <Feed.Date>{time}</Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        );
    }

    const renderPutMethod = (activity, time) => {
        const {id, parameter , entity, username} =activity;
        if(entity === 'profile') return  (
            <Feed.Event key={id}>
                <Feed.Content  >
                    <Feed.Summary style={{textAlign: 'left', direction: 'ltr'}}>
                        {username !== username ?
                            <Link to={`/user/show/${parameter}`}>{username}</Link> : 'you'} edited {entity} details
                        <Feed.Date>{time}</Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        );
        return  (
            <Feed.Event key={id}>
                <Feed.Content  >
                    <Feed.Summary style={{textAlign: 'left', direction: 'ltr'}}>
                        {username}updated <Link to={`/${entity}/show/${parameter}`}>{entity}</Link>
                        <Feed.Date>{time}</Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        );
    }

    const renderDeleteMethod = (activity , time) => {
        const {id , entity, username} =activity;
        return  (
            <Feed.Event key={id}>
                <Feed.Content  >
                    <Feed.Summary style={{textAlign: 'left' ,direction: 'ltr'}} >
                        {username} deleted {entity}
                        <Feed.Date>{time}</Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        );
    }

    if(_.size(activities) === 0) return <React.Fragment/> ;

    return (
        <Container>
            <Grid textAlign={'center'}>
                <Grid.Column style={{maxWidth: '500px', marginTop: '10%'}}>
                    <Segment color={"grey"} textAlign={"left"}>
                        <Feed>
                            {_.map(activities, (ac, index) => {
                                const {createdDate,} = ac;
                                const d = new Date();
                                const milisec =  d.getMilliseconds() -Date.parse(createdDate) ;
                                const min = (milisec / 1000) / 60;
                                const hour = Math.floor(min / 60);
                                const day =  Math.floor(hour / 24);
                                const month = Math.floor(day / 30);
                                const year = Math.floor(month / 12) ;
                                const time = `about ` + (year > 0 ? `${year} year` : month > 0 ? `${month} month` : day > 0 ? `${day} day` : hour > 1 ? `${hour} hour` : ' an hour') + ' ago';
                                const {method} = ac ;
                                switch (method) {
                                    case 'POST': return renderPostMethod(ac,time);
                                    case 'PUT': return renderPutMethod(ac,time);
                                    case 'DELETE': return renderDeleteMethod(ac,time);
                                    default: {
                                        return ;
                                    }
                                }
                            })}
                        </Feed>
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    );



}

const mapStateToProps = (state, props) => {
    const {items} = state.activity;
    return {activities: _.filter(items, (ac) => ac.username === props.username )};
}
export default connect(mapStateToProps, {getActivityPageByUsername})(UserActivity);
