import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render((
  <Router>
    <Route exact path="/" render={(props) => <App {...props}/>} />
    <Route path="/:slug" component={App} />
  </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
