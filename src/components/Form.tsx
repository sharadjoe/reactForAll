import React, { useState, useEffect, useRef } from "react";
import LabelledInput from "./LabelledInput";
import { title } from "process";

import { formData, formField, getLocalForms, saveLocalForms } from "./common";

const initialFields: formField[] = [
  { id: 1, label: "First Name", fieldType: "text", value: "" },
  { id: 2, label: "Last Name", fieldType: "text", value: "" },
  { id: 3, label: "Date of Birth", fieldType: "date", value: "" },
  { id: 4, label: "Email", fieldType: "email", value: "" }
];

const initialState: (selectedForm: number | null) => formData = (
  selectedForm
) => {
  const localForms = getLocalForms();

  if (selectedForm) {
    const selectedFormWithId = localForms.find(
      (form) => form.id === selectedForm
    );
    if (selectedFormWithId) {
      return selectedFormWithId;
    }
  }

  const newForm = {
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: initialFields
  };

  saveLocalForms([...localForms, newForm]);

  return newForm;
};

export default function Form(props: {
  closeFormCB: () => void;
  selectedForm: number | null;
}) {
  const [state, setState] = useState(() => initialState(props.selectedForm));

  const [newField, setNewField] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = "From Editor";
    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const saveFormData = (data: formData) => {
    const localForms = getLocalForms();
    const updatedLocalForms = localForms.map((form) => {
      if (form.id === data.id) {
        return data;
      }
      return form;
    });
    saveLocalForms(updatedLocalForms);
  };

  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField,
          fieldType: "text",
          value: ""
        }
      ]
    });

    setNewField("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id)
    });
  };

  const onChangeCB = (value: string, id: number) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            value
          };
        }
        return field;
      })
    });
  };

  const clearForm = () => {};

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          value={state.title}
          className="border-2 border-gray-200 rounded-lg p-2 my-1 flex-1"
          onChange={(e) => {
            setState({ ...state, title: e.target.value });
          }}
          ref={titleRef}
        />
      </div>

      {state.formFields.map((field) => (
        <LabelledInput
          value={field.value}
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg"
          onClick={(_) => {
            saveFormData(state);
            props.closeFormCB();
          }}
        >
          Save
        </button>
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg">
          Submit
        </button> */}
      </div>
    </div>
  );
}
