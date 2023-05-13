import { useEffect, useState } from "react";
import { formField, getLocalFormsById, localFormReplaceById } from "./common";
import { render } from "@testing-library/react";

export default function PreviewForm(props: { formId: number }) {
  const [form, setForm] = useState(() => {
    return getLocalFormsById(props.formId);
  });
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const formById = getLocalFormsById(props.formId);
    setForm(formById);
    setIndex(0);
  }, [props.formId]);

  const handleChange = (event: { target: HTMLInputElement }) => {
    setForm((data) => {
      if (data) {
        const newForm = { ...data };
        newForm.formFields[index].value = event.target.value;
        return newForm;
      }
      return data;
    });

    localFormReplaceById(props.formId, form);
  };

  const next = () => {
    setIndex((prev) => prev + 1);
  };
  const back = () => {
    setIndex((prev) => prev - 1);
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
                setForm((data) => {
                  if (data) {
                    const newForm = { ...data };
                    newForm.formFields[index].value = e.target.value;
                    return newForm;
                  }
                  return data;
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
                    setForm((data) => {
                      if (data) {
                        const newForm = { ...data };
                        newForm.formFields[index].value = field.value;
                        return newForm;
                      }
                      return data;
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
      {form ? (
        <>
          <div className="flex flex-col justify-center">
            <div>
              <h1>{form.title}</h1>
            </div>

            {form.formFields.map((field, fieldIndex) => (
              <>{fieldIndex === index && renderField(field)}</>
            ))}
          </div>

          <div className="flex flex-row gap-4">
            {index !== 0 && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg"
                onClick={() => {
                  back();
                }}
              >
                Back
              </button>
            )}

            {index !== (form?.formFields?.length || 0) - 1 && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg"
                onClick={() => {
                  next();
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
