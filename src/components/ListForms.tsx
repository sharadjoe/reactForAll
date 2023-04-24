import React, { useState } from "react";
import { getLocalForms } from "./common";

export default function ListForms(props: {
  openFormCB: () => void;
  selectFormCB: (id: number) => void;
}) {
  const [forms, setForms] = useState(() => getLocalForms());

  const deleteForm = (id: number) => {
    const newForms = forms.filter((form) => form.id !== id);
    setForms(newForms);
    localStorage.setItem("forms", JSON.stringify(newForms));
  };
  return (
    <div className="">
      {forms.map((form) => (
        <div className="py-2 text-white rounded-lg p-2 bg-blue-500 hover:bg-blue-700 w-3/4 flex flex-row items-center">
          <div>{form.title}</div>
          <div className="px-4">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bol px-4 py-2 rounded-lg"
              onClick={() => {
                props.selectFormCB(form.id);
                props.openFormCB();
              }}
            >
              Open Form
            </button>
          </div>
          <div className="px-4">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bol px-4 py-2 rounded-lg"
              onClick={() => {
                deleteForm(form.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
