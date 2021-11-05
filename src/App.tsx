import React from "react";
import "./css/App.css";
import RegistrationForm from "./Components/RegistrationForm";
import { SorterEvent } from "../Shared/Interfaces/SorterEventAPI.Interface";

export default class App extends React.Component {
  registerUser = ({
    serialized,
    fields,
    form,
  }: {
    serialized: any;
    fields: any;
    form: any;
  }) => {
    const body: SorterEvent = {
      name: fields.eventName.value,
      members: JSON.parse(fields.participants.value),
      date: fields.eventDate.value,
      giftPrice: fields.price.value,
      currency: fields.currency.value,
    };

    return fetch(`/api/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    })
      .then(() => alert("Sent with success"))
      .catch((e) => alert("Error"));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Christmas Sorter</h1>
        </header>
        <RegistrationForm action={this.registerUser} />
      </div>
    );
  }
}
