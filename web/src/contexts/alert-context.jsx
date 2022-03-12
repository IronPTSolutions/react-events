import React from "react";

export const AlertContext = React.createContext();

let timeoutId;

export function AlertContextProvider({ children }) {
  const [text, setText] = React.useState("");

  function showAlert(text) {
    setText(text);

    timeoutId = setTimeout(() => {
      setText("");
    }, 5000);
  }

  const value = {
    showAlert,
  };

  return (
    <AlertContext.Provider value={value}>
      {text && <div className="alert alert-info">{text}</div>}
      {children}
    </AlertContext.Provider>
  );
}
