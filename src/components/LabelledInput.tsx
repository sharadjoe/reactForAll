import React from "react";

export default function LabelledInput(props: {
  id: number;
  label: string;
  fieldType: string;
  removeFieldCB: (id: number) => void;
  onChangeCB: (value: string, id: number) => void;
}) {
  return (
    <>
      <label htmlFor={props.label}>{props.label}</label>
      <div className="flex">
        <input
          type={props.fieldType}
          placeholder={props.fieldType === "date" ? "dd/mm/yyyy" : props.label}
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          id={props.label}
          onChange={(e) => props.onChangeCB(e.target.value, props.id)}
        />

        <button
          className="whitespace-nowrap bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded-lg"
          onClick={(_) => props.removeFieldCB(props.id)}
        >
          Remove Field
        </button>
      </div>
    </>
  );
}
