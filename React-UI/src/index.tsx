import React from 'react';
import ReactDOM from 'react-dom';
import { FormProvider } from 'react-advanced-form';
import rules from './Components/validation-rules';
import messages from './Components/validation-messages';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const renderApp = () => (
  <FormProvider rules={rules} messages={messages}>
    <App />
  </FormProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
