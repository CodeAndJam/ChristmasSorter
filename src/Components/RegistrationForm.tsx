import React from 'react';
import { Form } from 'react-advanced-form';
import Input from './Input';
import Listing from './Listing';

export default class RegistrationForm extends React.Component<any> {
  render() {
    return (
      <Form action={this.props.action}>
        <fieldset
          className="form-group">
          <label>
            Event Name:
        </label>
          <Input
            name="eventName"
            required
          />
        </fieldset>
        <fieldset
          className="form-group">
          <label>
            Event Date:
        </label>
          <Input
            name="eventDate"
            type="date"
            required
          />
        </fieldset>
        <fieldset className="form-group">
          <label>
            Max Price:
        </label>
          <Input
            name="price"
            type="number"
            placeholder="Keep it low for your poor friend..."
            required
          />
        </fieldset>
        <fieldset
          className="form-group">
          <label>
            Currency:
        </label>
          <Input
            name="currency"
            required
          />
        </fieldset>
        <fieldset
          className="form-group">
          <label>
            Participants:
        </label>
          <Listing />
        </fieldset>
        <button>Shuffle it!!!</button>
      </Form>
    );
  }
}