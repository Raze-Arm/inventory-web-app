import React from 'react';
import _ from 'lodash';
import { Breadcrumb} from "semantic-ui-react";
import history from "../history";


const convertToFarsi = (str) => {
    let farsiStr = str;
    switch (str) {
        case 'customer': farsiStr = 'مشتری';
            break;
        case  'supplier': farsiStr = 'فروشنده';
            break;
        case  'product': farsiStr = 'محصول';
            break;
        case  'user': farsiStr = 'کاربر';
            break;
        case  'sale-invoice': farsiStr = 'صورتحساب فروش';
            break;
        case  'sale-transaction': farsiStr = 'تراکنش فروش';
            break;
        case  'purchase-invoice': farsiStr = 'صورتحساب خرید';
            break;
        case  'purchase-transaction': farsiStr = 'تراکنش خرید';
            break;
        case  'invoice': farsiStr = 'صورتحساب';
            break;
        case  'transaction': farsiStr = 'تراکنش';
            break;
        case  'show': farsiStr = 'نمایش';
            break;
        case  'delete': farsiStr = 'حذف';
            break;
        case  'update': farsiStr = 'ویرایش';
            break;
        case  'save': farsiStr = 'ذخیره';
            break;
        case  'profile': farsiStr = 'مشخصات';
            break;
        case  'activity': farsiStr = 'فعالیت';
            break;
        case  'history': farsiStr = 'تاریخچه';
            break;
    }
    if(farsiStr === str) return  ''
    return farsiStr;
}


const AppBreadcrumb  = () => {
    const {pathname} = history.location;
    const paths = _.words(pathname, /[^/]+/g);
    const notRoutablePaths = ['show', 'delete' , 'update'];
    return (
        <React.Fragment  >
            <Breadcrumb style={{direction: 'rtl', marginRight: '50px', marginBottom: '20px', display: 'block'}}>
                {pathname !== '/' ? <Breadcrumb.Section  onClick={() => history.push('/')} link>خانه</Breadcrumb.Section> : null}
                {_.map(paths, (p,i) => {
                    if(!p) return ;
                    const active =  !notRoutablePaths.includes(p) && !_.isNumber(p);
                    const isLast = (i === paths.length-1);
                    const section = convertToFarsi(p);
                    if(!section) return ;
                    return (
                        <React.Fragment key={i}>
                             <Breadcrumb.Divider />
                            {/*{!isLast ? <Breadcrumb.Divider /> : null}*/}
                            {active && !isLast ? <Breadcrumb.Section onClick={() => history.push(`/${p}`)} link
                                                                     active={isLast}>{section}</Breadcrumb.Section> :
                                <Breadcrumb.Section  active={isLast}>{section}</Breadcrumb.Section>}

                        </React.Fragment>
                    );
                } )}
            </Breadcrumb>
        </React.Fragment>
    );
}


export default AppBreadcrumb;