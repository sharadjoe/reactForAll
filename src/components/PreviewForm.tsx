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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <div className="flex flex-col justify-center items-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{form.title}</h1>
          </div>

          {form.formFields.length > 0 ? (
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
          ) : (
            <div>
              <p>No questions found in the form.</p>
            </div>
          )}

          {form.formFields.length > 0 && (
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
          )}
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </>
  );
}
