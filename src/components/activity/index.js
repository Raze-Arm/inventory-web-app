import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import _ from 'lodash';
import {Container, Feed, Grid, Segment} from "semantic-ui-react";


import {getUserActivityPage, getActivityPage} from "../../actions/activity";



class Index extends React.Component {
    componentDidMount() {
        const {authorities} = this.props;
        if(authorities.includes('ROLE_ADMIN')){
            this.props.getActivityPage({page: 0, size: 20});
            console.log('getting activity page')
        }
        else
            this.props.getUserActivityPage({page: 0, size: 20});
    }


    renderPostMethod(activity, time) {
        const {id, parameter , entity , username} =activity;

          return  (
            <Feed.Event key={id}>
                <Feed.Content  >
                    <Feed.Summary style={{textAlign: 'left' ,direction: 'ltr'}} >
                        {this.props.username !== username ? <Link to={`/user/show/${parameter}`}>{username}</Link> : 'you' } added <Link to={`/${entity}/show/${parameter}`}>{entity}</Link>
                        <Feed.Date>{time}</Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        );
    }

    renderPutMethod(activity, time) {
        const {id, parameter , entity, username} =activity;
        return  (
            <Feed.Event key={id}>
                <Feed.Content  >
                    <Feed.Summary style={{textAlign: 'left', direction: 'ltr'}}>
                        {this.props.username !== username ?
                            <Link to={`/user/show/${parameter}`}>{username}</Link> : 'you'} updated <Link
                        to={`/${entity}/show/${parameter}`}>{entity}</Link>
                        <Feed.Date>{time}</Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        );

    }

    renderDeleteMethod(activity, time) {
        const {id, parameter , entity, username} =activity;
        return  (
            <Feed.Event key={id}>
                <Feed.Content  >
                    <Feed.Summary style={{textAlign: 'left' ,direction: 'ltr'}} >
                        {this.props.username !== username ? <Link to={`/user/show/${parameter}`}>{username}</Link> : 'you' } deleted {entity}
                    <Feed.Date>{time}</Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        );
    }



    render() {
        const {activities} = this.props;
        if(_.size(activities) === 0) return <React.Fragment/>;
        return (
            <Container>
                    <Grid textAlign={'center'}>
                        <Grid.Column style={{maxWidth: '500px', marginTop: '10%'}}>
                            <Segment color={"grey"} textAlign={"left"}>
                                <Feed>
                                    {_.map(activities, (ac, index) => {
                                        const {createdDate} = ac;
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
                                            case 'POST': return this.renderPostMethod(ac,time);
                                            case 'PUT': return this.renderPutMethod(ac,time);
                                            case 'DELETE': return this.renderDeleteMethod(ac,time);
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
}

const mapStateToProps = (state) => {
    const {items, totalPages, totalElements} = state.activity;
    const {username ,authorities} = state.auth;
    return {activities: items, totalPages, totalElements, username, authorities};
}

export default connect(mapStateToProps, {getUserActivityPage, getActivityPage})(Index);


