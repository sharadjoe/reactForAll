import React from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
// import "./App.css";

const formFields = [
  { id: 1, label: "First Name", fieldType: "text" },
  { id: 2, label: "Last Name", fieldType: "text" },
  { id: 3, label: "Email", fieldType: "email" },
  { id: 4, label: "Date", fieldType: "date" }
];

function App() {
  return (
    <AppContainer>
      <div className="flex h-screen bg-gray-100 items-center justify-center w-full">
        <div className="p-4 mx-auto bg-white shadow-lg rounded-xl ">
          <Header title={"Hello World"} />

          {formFields.map((field) => (
            <React.Fragment key={field.id}>
              <label htmlFor={field.label}>{field.label}</label>
              <input
                type={field.fieldType}
                placeholder={
                  field.fieldType === "date" ? "dd/mm/yyyy" : field.label
                }
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                id={field.fieldType}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </AppContainer>
  );
}

export default App;
