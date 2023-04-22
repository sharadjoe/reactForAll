import React from "react";

import logo from "../logo.svg";

export default function Home(props: { openFormCB: () => void }) {
  return (
    <div className="flex flex flex-col justify-center">
      <img className="h-48" src={logo} />
      <div className="items-center flex justify-center h-48">
        <p className="">Welcome to homepage </p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bol px-4 py-2 rounded-lg"
        onClick={props.openFormCB}
      >
        Open Form
      </button>
    </div>
  );
}
