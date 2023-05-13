import { useEffect, useState } from "react";
import { getLocalFormsById, localFormReplaceById } from "./common";

export default function DropDownEditModal({ id, stateId, callBackCB }) {
  const [form, setForm] = useState({});
  const [newOption, setNewOption] = useState({
    label: "",
    value: ""
  });

  useEffect(() => {
    setForm(getLocalFormsById(stateId));
  }, [id]);

  useEffect(() => {}, [form]);

  const onChange = (index, value) => {
    setForm((prev) => {
      return {
        ...prev,
        formFields: prev.formFields.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              options: item.options.map((option, i) => {
                if (i === index) {
                  return { ...option, label: value };
                }
                return option;
              })
            };
          }
          return item;
        })
      };
    });

    localFormReplaceById(stateId, form);
  };

  return (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <div>Edit Labels</div>
              <br />
              <div className="flex flex-col ">
                {form?.formFields
                  ?.find((item) => item.id === id)
                  .options.map((option, index) => (
                    <>
                      <input
                        type="text"
                        value={option.label}
                        onChange={(e) => {
                          onChange(index, e.target.value);
                        }}
                      />
                    </>
                  ))}
                <div className="flex flex-row">
                  <label>label</label>
                  <input
                    className="bg-gray-200"
                    value={newOption.label}
                    onChange={(e) => {
                      setNewOption((prev) => {
                        return {
                          ...prev,
                          label: e.target.value
                        };
                      });
                    }}
                  ></input>
                  <label>value</label>
                  <input
                    className="bg-gray-200"
                    value={newOption.value}
                    onChange={(e) => {
                      setNewOption((prev) => {
                        return {
                          ...prev,
                          value: e.target.value
                        };
                      });
                    }}
                  ></input>

                  <button
                    className="text-blue-600 whitespace-nowrap"
                    onClick={() => {
                      setForm((prev) => {
                        return {
                          ...prev,
                          formFields: prev.formFields.map((item) => {
                            if (item.id === id) {
                              return {
                                ...item,
                                options: [...item.options, newOption]
                              };
                            }
                            return item;
                          })
                        };
                      });
                      setNewOption({
                        label: "",
                        value: ""
                      });
                    }}
                  >
                    Add Field{" "}
                  </button>
                </div>
              </div>

              <button
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                onClick={() => {
                  localFormReplaceById(stateId, form);

                  callBackCB(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
