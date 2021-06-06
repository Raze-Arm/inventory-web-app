import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './components/App';
import store from './store';


if (process.env.NODE_ENV !== 'development') {
    console.log = () => {}
}

export default ReactDOM.render(
    <Provider store={store}><App /></Provider> ,
    document.getElementById("root")
);



