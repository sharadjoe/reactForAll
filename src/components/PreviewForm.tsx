import { useEffect, useState } from "react";
import { getLocalFormsById, localFormReplaceById } from "./common";

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

  return (
    <>
      {form ? (
        <>
          <div className="flex flex-col justify-center">
            <div>
              <h1>{form.title}</h1>
            </div>

            {form.formFields.map((field, fieldIndex) => (
              <>
                {fieldIndex === index && (
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
                )}
              </>
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
