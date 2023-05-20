import React, { useEffect, useState } from "react";
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((data) => {
      if (data) {
        const newForm = { ...data };
        newForm.formFields[index].value = event.target.value;
        return newForm;
      }
      return data;
    });

    localFormReplaceById(props.formId, form); // Fix: pass `newForm` instead of `form`
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
          <div>
            <label>{field.label}</label>
            {field.options.map((option, optionIndex) => (
              <div className="py-4 flex flex-col" key={optionIndex}>
                <input
                  id={option}
                  name="notification-method"
                  type="radio"
                  checked={option === field.value}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={(e) => {
                    setForm((data) => {
                      if (data) {
                        const newForm = { ...data };
                        newForm.formFields[index].value = option;
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
          </div>
        );
    }
  };

  return (
    <>
      {form ? (
        <div className="flex flex-col justify-center items-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{form.title}</h1>
            {form.formFields.length > 0 && (
              <>
                <div className="py-4">
                  <label className="mb-2 text-lg font-semibold">
                    {form.formFields[index].label}
                  </label>
                  <input
                    className="border-2 border-gray-200 rounded-lg p-2 w-64"
                    type={form.formFields[index].fieldType}
                    value={form.formFields[index].value || ""}
                    onChange={handleChange}
                  />
                </div>
                {form.formFields.map((field, fieldIndex) => (
                  <React.Fragment key={fieldIndex}>
                    {fieldIndex === index && renderField(field)}
                  </React.Fragment>
                ))}
                <div className="flex mt-4">
                  {index !== 0 && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg mr-2"
                      onClick={back}
                    >
                      Back
                    </button>
                  )}
                  {index !== form.formFields.length - 1 && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg"
                      onClick={next}
                    >
                      Next
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </>
  );
}
