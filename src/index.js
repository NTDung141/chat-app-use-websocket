import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DataProvider from "./redux/store"

// import { createStore } from "redux";
// import myReducer from "./reducers/index";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import { applyMiddleware } from "redux";

// const store = createStore(
// myReducer,
// applyMiddleware(thunk)
// );

ReactDOM.render(
  // <Provider>
  <DataProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DataProvider>
  // </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
