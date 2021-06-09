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


    const renderPostMethod = (activity,entityStr, time) => {
        const {id, parameter , entity } =activity;
        const user = activity.username;
        const by = 'توسط';
        const added = 'اضافه شد '
        const usr = username !== user ?
            <Link to={`/user/show/${user}`}>{user}</Link> : 'شما';
        return  (
            <Feed.Event key={id}>
                <Feed.Content  >
                    <Feed.Summary style={{textAlign: 'right' ,direction: 'rtl'}} >
                        <Link to={`/${entity}/show/${parameter}`}>{entityStr}</Link> {by} {usr} {added}
                        {/*{username} added <Link to={`/${entity}/show/${parameter}`}>{entity}</Link>*/}
                        <Feed.Date>{time}</Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        );
    }

    const renderPutMethod = (activity, entityStr, time) => {
        const {id, parameter , entity} =activity;
        const user = activity.username;
        const by = 'توسط';
        const edited = 'ویرایش شد '
        const profile = 'مشخصات';
        const usr = username !== user ?
            <Link to={`/user/show/${parameter}`}>{user}</Link> : 'شما';
        if(entity === 'profile') return  (
            <Feed.Event key={id}>
                <Feed.Content  >
                    <Feed.Summary style={{textAlign: 'right' ,direction: 'rtl'}}>
                        {profile} {by} {usr} {edited}
                        {/*{usr} edited {entity} details*/}
                        <Feed.Date>{time}</Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        );

        return  (
            <Feed.Event key={id}>
                <Feed.Content  >
                    <Feed.Summary style={{textAlign: 'right' ,direction: 'rtl'}}>
                        <Link to={`/${entity}/show/${parameter}`}>{entityStr}</Link> {by} {usr} {edited}
                        {/*{username}updated <Link to={`/${entity}/show/${parameter}`}>{entity}</Link>*/}
                        <Feed.Date>{time}</Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        );
    }

    const renderDeleteMethod = (activity,entityStr , time) => {
        const {id , entity} =activity;
        const user = activity.username;
        const by = 'توسط';
        const deleted = 'حذف شد ';
        const usr = username !== user ? user : 'شما';
        return  (
            <Feed.Event key={id}>
                <Feed.Content  >
                    <Feed.Summary style={{textAlign: 'right' ,direction: 'rtl'}} >
                        {entityStr} {by} {usr} {deleted}
                        {/*{username} deleted {entity}*/}
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
                    <Segment color={"grey"} textAlign={"right"}>
                        <Feed>
                            {_.map(activities, (ac, index) => {
                                const {createdDate, entity} = ac;
                                const d = new Date().getTime() + 4.30 * 60 * 60 * 1000;
                                const milisec =  d - Date.parse(createdDate) ;
                                const min = (milisec / 1000) / 60;
                                const hour = Math.floor(min / 60);
                                const day =  Math.floor(hour / 24);
                                const month = Math.floor(day / 30);
                                const year = Math.floor(month / 12) ;
                                const time = `حدود ` + (year > 0 ? `${year} سال` : (month > 0 ? `${month} ماه` : (day > 0 ? `${day} روز` : (hour > 1 ? `${hour} ساعت` : 'یک ساعت')))) + ' قبل';
                                const {method} = ac ;
                                let entityStr = entity;
                                switch (entity) {
                                    case 'customer': entityStr = 'مشتری';
                                        break;
                                    case  'supplier': entityStr = 'فروشنده';
                                        break;
                                    case  'product': entityStr = 'محصول';
                                        break;
                                    case  'user': entityStr = 'کاربر';
                                        break;
                                    case  'sale-invoice': entityStr = 'صورتحساب فروش';
                                        break;
                                    case  'sale-transaction': entityStr = 'تراکنش فروش';
                                        break;
                                    case  'purchase-invoice': entityStr = 'صورتحساب خرید';
                                        break;
                                    case  'purchase-transaction': entityStr = 'تراکنش خرید';
                                        break;
                                }
                                switch (method) {
                                    case 'POST': return renderPostMethod(ac,entityStr,time);
                                    case 'PUT': return renderPutMethod(ac,entityStr,time);
                                    case 'DELETE': return renderDeleteMethod(ac,entityStr,time);
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
