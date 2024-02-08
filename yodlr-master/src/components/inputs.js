import '../static/css/inputs.css';

/** Input text box for required fields.Label above the input box and an error message 
 *  placeholder below the input box. props tbd
 */
function InputText({ fieldName, textLabel, textError, fieldValue, fxOnChange }) {
  return (
    <div >
      <label className="InputText-Text" htmlFor={fieldName}>{textLabel}</label>
      <input className="InputText-Text" type="text" name={fieldName}
        value={fieldValue} onChange={fxOnChange} required>
      </input>
      <span className="InputText-Error">{textError}</span><br />

    </div>
  );
}

export { InputText };
