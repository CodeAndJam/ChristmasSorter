import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import RegistrationForm from './Components/RegistrationForm';

export default class App extends React.Component {
  registerUser = ({ serialized, fields, form }: { serialized: any, fields: any, form: any }) => {
    return fetch('https://christmassorter.herokuapp.com/sendEmail', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(
        {
          "name": fields.eventName,
          "members": fields.participants,
          "date": fields.eventDate,
          "giftPrice": fields.price,
          "currency": fields.currency
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


