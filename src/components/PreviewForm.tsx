import { useEffect, useReducer, useState } from "react";
import { formField, getLocalFormsById, localFormReplaceById } from "./common";

interface FormState {
  form: ReturnType<typeof getLocalFormsById> | null;
  index: number;
}

interface Action {
  type: string;
  payload?: any;
}

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_FORM":
      return {
        ...state,
        form: action.payload
      };
    case "SET_INDEX":
      return {
        ...state,
        index: action.payload
      };
    case "UPDATE_FIELD_VALUE":
      if (state.form) {
        const newForm = { ...state.form };
        newForm.formFields[state.index].value = action.payload;
        return {
          ...state,
          form: newForm
        };
      }
      return state;
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

export default function PreviewForm(props: { formId: number }) {
  const [state, dispatch] = useReducer(formReducer, {
    form: getLocalFormsById(props.formId),
    index: 0
  });

  useEffect(() => {
    const formById = getLocalFormsById(props.formId);
    dispatch({ type: "SET_FORM", payload: formById });
    dispatch({ type: "SET_INDEX", payload: 0 });
  }, [props.formId]);

  useEffect(() => {
    if (state.form) {
      localFormReplaceById(props.formId, state.form);
    }
  }, [state.form, props.formId]);

  const handleChange = (event: { target: HTMLInputElement }) => {
    dispatch({ type: "UPDATE_FIELD_VALUE", payload: event.target.value });
  };

  const next = () => {
    dispatch({ type: "SET_INDEX", payload: state.index + 1 });
  };

  const back = () => {
    dispatch({ type: "SET_INDEX", payload: state.index - 1 });
  };

  const renderField = (field: formField) => {
    switch (field.kind) {
      case "text":
        return (
          <div className="py-4 flex flex-col">
            <label>{field.label}</label>
            <input
              className="border-2 border-gray-200 rounded-lg p-2 my-1 flex-1"
              type={field.fieldType}
              value={field.value || ""}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        );

      case "dropdown":
        return (
          <div className="py-2">
            <label htmlFor={field.label}>{field.label}</label>

            <select
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_FIELD_VALUE",
                  payload: e.target.value
                });
              }}
              value={field.value}
            >
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
                    dispatch({
                      type: "UPDATE_FIELD_VALUE",
                      payload: field.value
                    });
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
    }
  };

  return (
    <>
      {state.form ? (
        <>
          <div className="flex flex-col justify-center">
            <div>
              <h1>{state.form.title}</h1>
            </div>

            {state.form.formFields.map((field, fieldIndex) => (
              <>{fieldIndex === state.index && renderField(field)}</>
            ))}
          </div>

          <div className="flex flex-row gap-4">
            {state.index !== 0 && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg"
                onClick={() => {
                  dispatch({ type: "SET_INDEX", payload: state.index - 1 });
                }}
              >
                Back
              </button>
            )}

            {state.index !== (state.form?.formFields?.length || 0) - 1 && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg"
                onClick={() => {
                  dispatch({ type: "SET_INDEX", payload: state.index + 1 });
                }}
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
