import React from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
// import "./App.css";

const formFields = [
  { id: 1, label: "First Name" },
  { id: 2, label: "Last Name" },
  { id: 3, label: "Email" },
  { id: 4, label: "Date" }
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
                type={field.label === "Date" ? "date" : "text"}
                placeholder={
                  field.label === "Data" ? "dd/mm/yyyy" : field.label
                }
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                id={field.label}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </AppContainer>
  );
}

export default App;
