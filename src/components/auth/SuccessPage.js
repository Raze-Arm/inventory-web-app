import React from "react";
import {Header, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";



const SuccessPage = () => {

    return (
            <React.Fragment>
                <Icon name={'check circle outline'} color={"green"}  size={"massive"} style={{display: 'block', margin:'auto'}} />
                <Header textAlign={"center"} style={{margin: 0, marginTop: '8px', padding: 0}}>با موفقیت انجام شد</Header>
                <div  style={{fontSize: 'small' , textAlign: 'center', marginTop: '6px'}}>لطفا برای تغییر رمز عبور خود ایمیل خود را بررسی کنید.</div>

                <div style={{marginTop: '8px', textAlign: "center"}}>
                    <Link  to={'/login'}><b>بازگشت به صفحه ورود</b></Link>
                </div>

            </React.Fragment>
    );
}

export default SuccessPage;