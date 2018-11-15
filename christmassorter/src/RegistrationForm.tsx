import React from 'react';
import { Form, Input  } from 'react-advanced-form';

export default class RegistrationForm extends React.Component {
  render() {
    return (
      <Form>
        <Input
          name="userEmail"
          type="email"
          required />
        <Input
          name="userPassword"
          type="password"
          required />
        <Input
          name="confirmPassword"
          type="password"
          required />
        <Input
          name="firstName" />
        <Input
          name="lastName" />
        
        <button>Register</button>
      </Form>
    );
  }
}