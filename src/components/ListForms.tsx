import { useState } from "react";
import { getLocalForms } from "./common";
import { Link, navigate, useQueryParams } from "raviger";

export default function ListForms() {
  const [forms, setForms] = useState(() => getLocalForms());

  const [{ search }, setQuery] = useQueryParams();

  const [searchString, setSearchString] = useState("");

  const deleteForm = (id: number) => {
    const newForms = forms.filter((form) => form.id !== id);
    setForms(newForms);
    localStorage.setItem("savedForms", JSON.stringify(newForms));
  };

  return (
    <div className="bg-gray-50 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          setQuery({ search: searchString });
        }}
        className="flex flex-row space-x-2"
      >
        <label className="my-auto">Search</label>
        <input
          type="text"
          name="search"
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          className="w-full border-2 border-gray-200 rounded-lg p-2 my-1 flex-1"
        />
      </form>
      {forms
        .filter((form) =>
          form.title
            .toLocaleLowerCase()
            .includes(search?.toLocaleLowerCase() || "")
        )
        .map((form) => (
          <div className="py-4">
            <div className="py-2 text-white rounded-lg p-2 bg-blue-500 hover:bg-blue-700 w-3/4 flex flex-row items-center justify-between space-x-4">
              <div className="text-lg font-semibold">{form.title}</div>
              <div>
                <Link
                  href={`/form/${form.id}`}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-lg"
                >
                  Open Form
                </Link>
              </div>
              <div>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-lg"
                  onClick={() => {
                    navigate(`/preview/${form.id}`);
                  }}
                >
                  Preview
                </button>
              </div>
              <div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg"
                  onClick={() => {
                    deleteForm(form.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
