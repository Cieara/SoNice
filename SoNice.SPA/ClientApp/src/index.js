//import 'bootstrap/dist/css/bootstrap.css';
//import React from 'react';
//import { createRoot } from 'react-dom/client';
//import { BrowserRouter } from 'react-router-dom';
//import App from './App';
//import * as serviceWorkerRegistration from './serviceWorkerRegistration';
//import reportWebVitals from './reportWebVitals';

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
//const rootElement = document.getElementById('root');
//const root = createRoot(rootElement);

//root.render(
//  <BrowserRouter basename={baseUrl}>
//    <App />
//  </BrowserRouter>);

//// If you want your app to work offline and load faster, you can change
//// unregister() to register() below. Note this comes with some pitfalls.
//// Learn more about service workers: https://cra.link/PWA
//serviceWorkerRegistration.unregister();

//// If you want to start measuring performance in your app, pass a function
//// to log results (for example: reportWebVitals(console.log))
//// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
import "./statics/css/index.css";
import "./statics/css/bootstrap-custom.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { HashRouter as Router } from "react-router-dom";
import SoNiceContext from "./SoNiceContext";

library.add(fas, far, fab);

ReactDOM.render(
    <React.StrictMode>
        <Router>
           <SoNiceContext.Provider value={{ valueA: 'Hello'}}>
            <App />
            </SoNiceContext.Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
