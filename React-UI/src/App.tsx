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
          "name": fields.eventName.value,
          "members": JSON.parse(fields.participants.value),
          "date": fields.eventDate.value,
          "giftPrice": fields.price.value,
          "currency": fields.currency.value
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


