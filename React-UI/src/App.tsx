import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import RegistrationForm from './Components/RegistrationForm';

export default class App extends React.Component {
  registerUser = ({ serialized, fields, form }: { serialized: any, fields: any, form: any }) => {
    return fetch('https://christmassorter.herokuapp.com/sendEmail', {
      method: 'POST',
      body: JSON.stringify(
        {
          "name": "Test Event",
          "members": [
            {
              "name": "José cabeda",
              "email": "jecabeda@gmail.com"
            },
            {
              "name": "Luís Lopes",
              "email": "ll61295@gmail.com"
            }
          ],
          "date": "2018-12-12",
          "templateBody": "Template body to receive"
        })
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <RegistrationForm action={this.registerUser} />
      </div>
    );
  }
}


