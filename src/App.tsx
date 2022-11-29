import React from "react";
import "./css/App.css";
import RegistrationForm from "./Components/RegistrationForm";

export default function App() {
 
  return (
    <div className="App">
      <header className="App-header">
        <h1>Christmas Sorter</h1>
      </header>
      <RegistrationForm />
    </div>
  );
}
