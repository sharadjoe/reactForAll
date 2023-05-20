import React, { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";

export default function LabelledInput(props: {
  value: string;
  id: number;
  label: string;
  fieldType: string;
  removeFieldCB: (id: number) => void;
  onChangeCB: (value: string, id: number, kind: string) => void; // Update the function signature here
  isEditing: boolean;
  onToggleEdit: () => void;
  onSaveLabel: (label: string, id: number) => void;
}) {
  const [newLabel, setNewLabel] = useState(props.label);

  useEffect(() => {
    setNewLabel(props.label);
  }, [props.label]);

  const { isEditing, onToggleEdit, onSaveLabel } = props;

  const handleSaveLabel = () => {
    onSaveLabel(newLabel, props.id);
  };

  return (
    <div className="py-2 border-b border-gray-200">
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="border-2 border-gray-200 rounded-lg p-2 flex-1 mr-2"
          />
          <button
            onClick={handleSaveLabel}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={onToggleEdit}
            className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div
          onClick={onToggleEdit}
          className="flex items-center cursor-pointer"
        >
          <p className="mr-2">{props.label}</p>
          <BsFillPencilFill className="text-blue-500" />
        </div>
      )}
      <div className="flex flex-wrap">
        <button
          className="whitespace-nowrap bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-1 rounded-lg mt-2"
          onClick={(_) => props.removeFieldCB(props.id)}
        >
          Remove Field
        </button>
      </div>
    </div>
  );
}
