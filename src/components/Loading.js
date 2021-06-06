import React , {useEffect} from "react";
import {connect} from 'react-redux';
import loading from '../images/loading.svg';
import {Dimmer, Image} from "semantic-ui-react";


import {showErrorMessage, stopLoadingScreen} from '../actions/app-message';
import history from "../history";

const Loading = ({showErrorMessage, stopLoadingScreen}) => {
    // const [active, setActive] = useState(false);
    const handleClose = () => {
        // setActive(false);
        // stopLoadingScreen();
    };


    useEffect(() => {
       const ref=  setTimeout(() => {
            showErrorMessage({title: 'Error', content: 'Please try again later'});
            history.goBack();
        }, 5000);
        return () => {
            clearTimeout(ref);
            stopLoadingScreen();

        };
    } , []);



    return (
        <Dimmer style={{opacity: '0.7'}} active onClickOutside={handleClose} page>
            <React.Fragment>
                <Image src={loading}  width='50px' style={{marginBottom: '2px'}} />
                <div>Loading</div>
            </React.Fragment>
        </Dimmer>
    );
}


export default connect(null, {showErrorMessage, stopLoadingScreen})(Loading);