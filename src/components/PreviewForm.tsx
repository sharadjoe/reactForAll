import { useEffect, useState } from "react";
import { formField, getLocalFormsById, localFormReplaceById } from "./common";

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

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
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
          <div className="flex flex-col py-4">
            <label className="text-lg font-medium">{field.label}</label>
            <input
              className="border-2 border-gray-200 rounded p-2 my-1 flex-1"
              type={field.fieldType}
              value={field.value || ""}
              onChange={handleChange}
            />
          </div>
        );

      case "dropdown":
        return (
          <div className="py-2">
            <label className="text-lg font-medium" htmlFor={field.label}>
              {field.label}
            </label>
            <select
              className="border-2 border-gray-200 rounded p-2 my-1 flex-1"
              onChange={handleChange}
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
          <div className="flex flex-col py-4">
            <label className="text-lg font-medium">{field.label}</label>
            {field.options.map((option, index) => (
              <div className="flex items-center py-2">
                <input
                  id={option}
                  name="notification-method"
                  type="radio"
                  checked={option === field.value}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={handleChange}
                />
                <label
                  className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                  htmlFor={option}
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
    <div className="flex flex-col items-center justify-center space-y-6">
      {form ? (
        <>
          <h1 className="text-2xl font-bold">{form.title}</h1>

          {form.formFields.map((field, fieldIndex) => (
            <div key={fieldIndex}>
              {fieldIndex === index && renderField(field)}
            </div>
          ))}

          <div className="flex space-x-4">
            {index !== 0 && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={back}
              >
                Back
              </button>
            )}

            {index !== (form?.formFields?.length || 0) - 1 && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={next}
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-xl">Loading...</p>
      )}
    </div>
  );
}
