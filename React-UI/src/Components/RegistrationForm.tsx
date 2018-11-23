import React from 'react';
import { Form, Field } from 'react-advanced-form';
import Input from './Input'

export default class RegistrationForm extends React.Component {
  validateEmail = ({ value, fieldProps, fields, form }: { value: any, fieldProps: any, fields: any, form: any }) => {
    return fetch('https://backend/', { body: value })
      .then(res => res.json())
      .then((res) => {
        return {
          /* Determine if the e-mail is valid based on response */
          valid: (res.statusCode === 'SUCCESS'),
          errorCode: res.errorCode
        };
      });
  }

  registerUser = ({ serialized, fields, form }: { serialized: any, fields: any, form: any }) => {
    return fetch('https://backend.dev/user', {
      method: 'POST',
      body: JSON.stringify(serialized)
    });
  }

  render() {
    return (
      <Form action={this.registerUser}>
        <fieldset
          className="form-group">
          <label>
            Email:
        </label>
          <Input
            name="userEmail"
            type="email"
            required />
        </fieldset>

        <fieldset
          className="form-group">
          <label>
            Password:
        </label>
          <Input
            name="userPassword"
            type="password"
            required />
        </fieldset>

        <fieldset
          className="form-group">
          <label>
            Confirm Password:
        </label>
          <Input
            name="confirmPassword"
            type="password"
            required
            skip />
        </fieldset>

        <fieldset
          className="form-group">
          <label>
            First Name:
        </label>
          <Input
            name="firstName"
            required={({ get }: { get: any }) => {
              // resolves any time "value" prop of "lastName" changes
              return !!get(['lastName', 'value']);
            }} />
        </fieldset>

        <fieldset
          className="form-group">
          <label>
            Last Name:
        </label>
          <Input
            name="lastName"
            required={({ get }: { get: any }) => {
              // resolves any time "value" prop of "firstName" changes
              return !!get(['firstName', 'value']);
            }} />
        </fieldset>
        
        <button>Register</button>
      </Form>
    );
  }
}