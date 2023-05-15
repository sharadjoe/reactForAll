import { useState, useEffect, useRef, useReducer } from "react";
import LabelledInput from "./LabelledInput";

import { formData, formField, getLocalForms, saveLocalForms } from "./common";
import { navigate } from "raviger";
import Select, { GroupBase } from "react-select";
import MultiSelect from "./MultiSelect";
import DropDownEditModal from "./DropDownEditModal";

const initialFields: formField[] = [
  { kind: "text", id: 1, label: "First Name", fieldType: "text", value: "" },
  { kind: "text", id: 2, label: "Last Name", fieldType: "text", value: "" },
  {
    kind: "dropdown",
    id: 3,
    label: "Priority",
    options: ["High", "Medium", "Low"],
    value: ""
  },

  { kind: "text", id: 4, label: "Email", fieldType: "email", value: "" },
  {
    kind: "radio",
    id: 5,
    label: "Gender",
    options: ["Male", "Female"],
    value: "Male"
  },
  { kind: "textarea", id: 6, label: "Description", value: "" },
  {
    kind: "multiselect",
    id: 7,
    label: "People",
    value: [],
    options: [
      { label: "John", value: "John" },
      { label: "Jane", value: "Jane" },
      { label: "Joe", value: "Joe" }
    ]
  }
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

type ChangeText = {
  type: "change_text";
  value: string;
  fieldType: string;
};

type ClearText = {
  type: "clear_text";
};

type NewFiledAction = ChangeText | ClearText;

const newFieldReducer = (
  state: {
    label: string;
    fieldType: string;
  },
  action: NewFiledAction
) => {
  console.log("fsadfdsafdsa", action);
  switch (action.type) {
    case "change_text":
      return {
        ...state,
        label: action.value
      };
    case "clear_text":
      return {
        ...state,
        label: ""
      };
  }
};

export default function Form(props: { selectedForm: number | null }) {
  // const [state, setState] = useState(() => initialState(props.selectedForm));

  type FormActions =
    | {
        type: "add";
        payload: {
          newField: {
            label: string;
            fieldType: string;
          };
        };
      }
    | { type: "remove"; id: number };

  type FormStateActions =
    | { type: "SET_INITIAL_STATE"; payload: formData }
    | { type: "SET_STATE"; payload: formData }
    | { type: "SET_TITLE"; payload: string }
    | FormActions;

  const formStateReducer = (
    state: formData,
    action: FormStateActions
  ): formData => {
    switch (action.type) {
      case "SET_INITIAL_STATE":
        return action.payload;
      case "SET_STATE":
        return action.payload;
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "add":
        const newField = action.payload.newField;
        if (newField.fieldType === "multiselect") {
          return {
            ...state,
            formFields: [
              ...state.formFields,
              {
                kind: "multiselect",
                id: Number(new Date()),
                label: newField.label,
                value: [],
                options: []
              }
            ]
          };
        } else if (newField.fieldType === "text") {
          return {
            ...state,
            formFields: [
              ...state.formFields,
              {
                kind: "text",
                id: Number(new Date()),
                label: newField.label,
                fieldType: "text",
                value: ""
              }
            ]
          };
        }
        break;
      case "remove":
        return {
          ...state,
          formFields: state.formFields.filter((field) => field.id !== action.id)
        };

      default:
        return state;
    }

    return state;
  };

  const [state, dispatchState] = useReducer(
    formStateReducer,
    initialState(props.selectedForm)
  );

  // const [newField, setNewField] = useState({
  //   label: "",
  //   fieldType: "text"
  // });

  const [newField, dispatch] = useReducer(newFieldReducer, {
    label: "",
    fieldType: "text"
  });

  const [showDropDownModal, setShowDropDownModal] = useState<{
    display: boolean;
    options: {}[];
    id: number | null;
    stateId: number | null;
  }>({
    display: false,
    options: [],
    id: null,
    stateId: null
  });

  const titleRef = useRef<HTMLInputElement>(null);

  // type FormActions = AddField | RemoveField;

  useEffect(() => {
    state.id !== props.selectedForm && navigate(`/form/${state.id}`);
  }, [state.id, props.selectedForm]);

  useEffect(() => {
    console.log("Fsadfsdafs");
    dispatchState({
      type: "SET_INITIAL_STATE",
      payload: initialState(props.selectedForm ? props.selectedForm : state.id)
    });
  }, [showDropDownModal.display]);

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

  // const dispatchAction = (action: FormActions) => {
  //   setState(reducer(state, action));
  // };

  const onChangeCB = (value: any, id: number, kind: string) => {
    dispatchState({
      type: "SET_STATE",
      payload: {
        ...state,
        formFields: state.formFields.map((field) => {
          if (field.id === id) {
            return {
              ...field,
              value: value
            };
          }
          return field;
        })
      }
    });

    // setState({
    //   ...state,
    //   formFields: state.formFields.map((field) => {
    //     if (field.id === id) {
    //       return {
    //         ...field,
    //         value: value
    //       };
    //     }
    //     return field;
    //   })
    // });
  };

  const clearForm = () => {};

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchState({ type: "SET_TITLE", payload: e.target.value });
  };

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          value={state.title}
          className="border-2 border-gray-200 rounded-lg p-2 my-1 flex-1"
          onChange={onTitleChange}
          ref={titleRef}
        />
      </div>

      {state.formFields.map((field) => {
        switch (field.kind) {
          case "text":
            return (
              <LabelledInput
                value={field.value}
                key={field.id}
                id={field.id}
                label={field.label}
                fieldType={field.fieldType}
                removeFieldCB={() => {
                  dispatchState({
                    type: "remove",
                    id: field.id
                  });
                }}
              />
            );
          case "dropdown":
            return (
              <div className="py-4 flex flex-col">
                <label>{field.label}</label>
                <button className="bg-blue-300">Edit Fields</button>
                <select
                  onChange={(e) => {
                    onChangeCB(e.target.value, field.id, field.kind);
                  }}
                  value={field.value}
                >
                  <option value="">Select an Option</option>
                  {field.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );

          case "radio":
            return (
              <>
                <label>{field.label}</label>
                {field.options.map((option, index) => (
                  <div className="py-4 flex flex-col">
                    <input
                      id={option}
                      name="notification-method"
                      type="radio"
                      checked={option === field.value}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onClick={(e) => {
                        onChangeCB(option, field.id, field.kind);
                      }}
                    />
                    <label
                      htmlFor={option}
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </>
            );

          case "textarea":
            return (
              <>
                <label>{field.label}</label>
                <br />
                <textarea
                  className="resize rounded-md bg-gray-200"
                  onChange={(e) => {
                    onChangeCB(e.target.value, field.id, field.kind);
                  }}
                  value={field.value}
                >
                  {field.value}
                </textarea>
              </>
            );
          case "multiselect":
            return (
              <>
                <br />
                <div className="flex flex-row gap-4">
                  <div>
                    {" "}
                    <label>{field.label}</label>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setShowDropDownModal({
                          display: true,
                          options: field.options,
                          id: field.id,
                          stateId: state.id
                        });
                      }}
                    >
                      Edit Field
                    </button>
                  </div>
                </div>
                <MultiSelect options={field.options} />
              </>
            );
        }
      })}
      <div className="flex gap-2 py-4">
        <input
          type="text"
          value={newField.label}
          className="border-2 border-gray-200 rounded-lg p-2 my-1 flex-1"
          onChange={(e) => {
            dispatch({
              ...newField,
              value: e.target.value,
              type: "change_text"
            });
          }}
        />
        <select
          onChange={(e) => {
            dispatch({
              ...newField,
              fieldType: e.target.value,
              type: "change_text",
              value: ""
            });
          }}
        >
          {[
            { label: "Text", value: "text" },
            { label: "multiselect", value: "multiselect" }
          ].map((option) => (
            <option
              key={option.value}
              selected={newField.fieldType === option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg"
          onClick={(_) => {
            dispatchState({ type: "add", payload: { newField } });
          }}
        >
          Add Field
        </button>
      </div>
      <div className="flex gap-2 py-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg"
          onClick={() => {
            navigate("/");
          }}
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
            navigate("/");
          }}
        >
          Save
        </button>
      </div>
      {showDropDownModal.display && (
        <DropDownEditModal
          // options={showDropDownModal.options}
          stateId={showDropDownModal.stateId}
          id={showDropDownModal.id}
          callBackCB={() => {
            setShowDropDownModal({ ...showDropDownModal, display: false });
          }}
        />
      )}
    </div>
  );
}
