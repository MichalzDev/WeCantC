import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index'
import App from './components/App';
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: rgba(232, 232, 232, 0.6);
  }
`;

ReactDOM.render(
<Provider store={store}>
    <GlobalStyle />
    <App />
</Provider>,
document.getElementById("root")
);
