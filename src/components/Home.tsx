import React from "react";

import logo from "../logo.svg";
import ListForms from "./ListForms";

export default function Home(props: {
  openFormCB: () => void;
  selectFormCB: (id: number) => void;
}) {
  return (
    <div className="flex flex flex-col justify-center">
      <div className="flex flex-col w-full py-4">
        <ListForms
          openFormCB={props.openFormCB}
          selectFormCB={props.selectFormCB}
        />
      </div>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bol px-4 py-2 rounded-lg"
        onClick={props.openFormCB}
      >
        Create New Form
      </button>
    </div>
  );
}
