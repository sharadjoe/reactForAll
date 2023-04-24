import React, { useState } from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
import Home from "./components/Home";
import Form from "./components/Form";
// import "./App.css";

function App() {
  const [state, setState] = useState("HOME");

  const [selectedForm, setSelectedForm] = useState<number | null>(null);

  const closeForm = () => {
    setState("HOME");
  };

  const openForm = () => {
    setState("FORM");
  };

  const selectForm = (id: number) => {
    setSelectedForm(id);
  };

  return (
    <AppContainer>
      <div className="flex h-screen bg-gray-100 items-center justify-center w-full">
        <div className="p-4 mx-auto bg-white shadow-lg rounded-xl w-full">
          <Header title={"List Home"} />
          {state === "HOME" ? (
            <Home openFormCB={openForm} selectFormCB={selectForm} />
          ) : (
            <Form closeFormCB={closeForm} selectedForm={selectedForm} />
          )}
        </div>
      </div>
    </AppContainer>
  );
}

export default App;
