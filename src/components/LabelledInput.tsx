import React from "react";

export default function LabelledInput(props: {
  id: number;
  label: string;
  fieldType: string;
  value: string;
  removeFieldCB: (id: number) => void;
  onChangeCB: (value: string, id: number) => void;
}) {
  return (
    <div className="py-2">
      <label htmlFor={props.label}>{props.label}</label>
      <div className="flex">
        <button
          className="whitespace-nowrap bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded-lg"
          onClick={(_) => props.removeFieldCB(props.id)}
        >
          Remove Field
        </button>
      </div>
    </div>
  );
}
