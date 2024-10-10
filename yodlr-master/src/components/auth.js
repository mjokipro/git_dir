import { useState } from "react"

import { InputText } from "./inputs";

import { Yodlr } from "../helpers/apiYodlr";

import '../static/css/auth.css';

function AuthRegister() {

  const INITIAL_VALUES_FIELDS = {
    email: "",
    firstName: "",
    lastName: "",
    state: "pending"
  }

  const INITIAL_VALUES_MESSAGES = {
    email: "",
    firstName: "",
    lastName: "",
    state: "",
    result: { message: "", status: "" }
  }

  const [formFields, setFormFields] = useState(INITIAL_VALUES_FIELDS);
  const [fieldMessages, setFieldMessages] = useState(INITIAL_VALUES_MESSAGES);

  function handleSubmit(event) {
    event.preventDefault();

    // future - validate fields

    async function registerUser(data) {
      try {
        const result = await Yodlr.apiRegister(data);

        // reset the messages and set the form message is set to successful, and 
        //  status -- the class to change the look of the message -- is cleared.
        const statusMessage = {
          message: `${formFields.email} (id = ${result.id}) successfully created.`,
          status: ""
        };

        setFieldMessages(() => (
          { ...INITIAL_VALUES_MESSAGES, result: statusMessage }
        ));
        setFormFields(INITIAL_VALUES_FIELDS);

      } catch (error) {
        // reset the messages and set the form message is set to successful, and 
        //  status -- the class to change the look of the message -- is AuthRegister-MsgError (red text)
        const statusMessage = {
          message: "",
          status: " AuthRegister-MsgError"
        };

        if (error) {
          statusMessage.message = `A '${error.status} - ${error.statusText}' error occurred. ${formFields.email} was not created.`;
        } else {
          statusMessage.message = `An unexpected error occurred. ${formFields.email} was not created.`;
        }

        setFieldMessages(() => (
          { ...INITIAL_VALUES_MESSAGES, result: statusMessage }
        ));

        // form fields are NOT cleared so the error(s) can get corrected.

      }
    }

    registerUser(formFields);

  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormFields(formFields => (
      { ...formFields, [name]: value }
    ));
  }

  return (
    <form className="register">
      <h1 className="Form-header">Welcome to Yodlr!</h1>
      <p>Please provide the following information about yourself.</p>
      <p className={fieldMessages.result.status}>{fieldMessages.result.message}</p>
      <InputText fieldName="email" textLabel="Email:" textError={fieldMessages.email}
        fieldValue={formFields.email} fxOnChange={handleChange} />
      <InputText fieldName="firstName" textLabel="First Name:" textError={fieldMessages.firstName}
        fieldValue={formFields.firstName} fxOnChange={handleChange} />
      <InputText fieldName="lastName" textLabel="Last Name:" textError={fieldMessages.lastName}
        fieldValue={formFields.lastName} fxOnChange={handleChange} />
      {/* <InputText fieldName="state" textLabel="state:" textError={fieldMessages.state}
        fieldValue={formFields.state} fxOnChange={handleChange} /> */}
      <button type="submit" onClick={handleSubmit}>Add {`${formFields.firstName} ${formFields.lastName}`}</button>
    </form>
  );
}

export { AuthRegister };
