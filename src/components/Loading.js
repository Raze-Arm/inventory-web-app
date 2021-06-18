import React , {useEffect} from "react";
import {connect} from 'react-redux';
import loading from '../images/loading.svg';
import {Dimmer, Image} from "semantic-ui-react";


import {showErrorMessage, stopLoadingScreen} from '../actions/app-message';
import history from "../history";

const Loading = ({showErrorMessage, stopLoadingScreen}) => {
    const handleClose = () => {
        // setActive(false);
        // stopLoadingScreen();
    };

    console.log('history#', history)


    useEffect(() => {
       const ref=  setTimeout(() => {
            showErrorMessage({title: 'ناموفق', content: 'لطفا بعداً دوباره امتحان کنید'});
           if(history.location.pathname === '/login') history.push('/');
           else history.goBack();

        }, 5000);
        return () => {
            clearTimeout(ref);
            stopLoadingScreen();

        };
    } , []);



    return (
        <Dimmer style={{opacity: '0.7'}} active onClickOutside={handleClose} page>
            <div  >
                <Image src={loading}  width='50px' style={{marginBottom: '2px', margin: 'auto'}} />
                <div >در حال بارگیری</div>
            </div>
        </Dimmer>
    );
}


export default connect(null, {showErrorMessage, stopLoadingScreen})(Loading);