import React from 'react';
import _ from 'lodash';
import { Breadcrumb} from "semantic-ui-react";
import history from "../history";



const AppBreadcrumb  = () => {
    const {pathname} = history.location;
    const paths = _.words(pathname, /[^/]+/g);
    const notRoutablePaths = ['show', 'delete' , 'update'];
    return (
        <React.Fragment  >
            <Breadcrumb style={{direction: 'rtl', marginRight: '50px', marginBottom: '20px', display: 'block'}}>
                {pathname !== '/' ? <Breadcrumb.Section  onClick={() => history.push('/')} link>Home</Breadcrumb.Section> : null}
                {_.map(paths, (p,i) => {
                    if(!p) return ;
                    const active =  !notRoutablePaths.includes(p) && !_.isNumber(p);
                    const isLast = (i === paths.length-1);
                    return (
                        <React.Fragment key={i}>
                            <Breadcrumb.Divider />
                            {/*{!isLast ? <Breadcrumb.Divider /> : null}*/}
                            {active && !isLast ? <Breadcrumb.Section onClick={() => history.push(`/${p}`)} link
                                                                     active={isLast}>{p}</Breadcrumb.Section> :
                                <Breadcrumb.Section active={isLast}>{p}</Breadcrumb.Section>}

                        </React.Fragment>
                    );
                } )}
            </Breadcrumb>
        </React.Fragment>
    );
}


export default AppBreadcrumb;