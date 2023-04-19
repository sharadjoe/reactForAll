import React, { useState } from "react";
import LabelledInput from "./LabelledInput";

const formFields: any[] = [];

export default function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);

  const [newField, setNewField] = useState("");

  const addField = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: newField,
        fieldType: "text",
        value: newField
      }
    ]);

    setNewField("");
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  const onChangeCB = (value: string, id: number) => {
    setState(
      state.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            value
          };
        }
        return field;
      })
    );
  };

  const clearForm = () => {
    setState([]);
  };

  return (
    <div>
      {state.map((field) => (
        <LabelledInput
          key={field.id}
          id={field.id}
          label={field.label}
          fieldType={field.fieldType}
          removeFieldCB={removeField}
          onChangeCB={onChangeCB}
        />
      ))}
      <div className="flex gap-2 py-4">
        <input
          type="text"
          value={newField}
          className="border-2 border-gray-200 rounded-lg p-2 my-1 flex-1"
          onChange={(e) => {
            setNewField(e.target.value);
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg"
          onClick={addField}
        >
          Add Field
        </button>
      </div>
      <div className="flex gap-2 py-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg"
          onClick={clearForm}
        >
          Clear Form
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg">
          Submit
        </button>
      </div>
    </div>
  );
}
