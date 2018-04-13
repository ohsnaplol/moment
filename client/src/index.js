import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// testing react alert, setting up Provider/optional config
const options = {
    positon: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
}
ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options} >
        <App />
    </AlertProvider>, document.getElementById('root'));
registerServiceWorker();


