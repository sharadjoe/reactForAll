import React, { useState } from "react";

import { useQueryParams } from "raviger";

import logo from "../logo.svg";
import ListForms from "./ListForms";
import { navigate } from "raviger";

export default function Home() {
  return (
    <div className="flex flex flex-col justify-center">
      <div className="flex flex-col w-full py-4">
        <ListForms />
      </div>
      <a
        href={"/form"}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bol px-4 py-2 rounded-lg"
      >
        Create New Form
      </a>
    </div>
  );
}
