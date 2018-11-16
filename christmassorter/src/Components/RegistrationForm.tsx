import React from 'react';
import { Form, Input, Field } from 'react-advanced-form';

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

  registerUser = ({ serialized, fields, form }:{serialized:any, fields:any, form:any}) => {
    return fetch('https://backend.dev/user', {
      method: 'POST',
      body: JSON.stringify(serialized)
    });
  }

  render() {
    return (
      <Form action={this.registerUser}>
        <Field.Group name="primaryInfo">
          <Input
            name="userEmail"
            type="email"
            required />
        </Field.Group>

        <Input
          name="userPassword"
          type="password"
          required />
        <Input
          name="confirmPassword"
          type="password"
          required
          skip />

        <Field.Group name="primaryInfo">
          <Input
            name="firstName"
            required={({ get }: { get: any }) => {
              // resolves any time "value" prop of "lastName" changes
              return !!get(['lastName', 'value']);
            }} />

          <Input
            name="lastName"
            required={({ get }: { get: any }) => {
              // resolves any time "value" prop of "firstName" changes
              return !!get(['firstName', 'value']);
            }} />
        </Field.Group>

        <button>Register</button>
      </Form>
    );
  }
}