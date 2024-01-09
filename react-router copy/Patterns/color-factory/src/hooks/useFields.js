import { useState } from "react";

function useFields(initialState) {
  const [state, setState] = useState(initialState);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const resetFormData = () => {
    setState(initialState);
  };

  return [state, handleChange, resetFormData];
}

export default useFields;
