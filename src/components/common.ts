


export interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

type textFieldTypes = "text" | "email" | "date"


type TextField = {
  kind:"text"
  id:number
  label:string
  fieldType:textFieldTypes
  value:string
}

type DropDownField = {
  kind:"dropdown"
  id:number
  label:string
  options:string[]
  value:string
}

export interface formField {
  id: number;
  label: string;
  fieldType: string;
  value: string;
}



export const getLocalForms: () => formData[] = () => {
  const savedFormJSON = localStorage.getItem("savedForms");
  return savedFormJSON ? JSON.parse(savedFormJSON) : [];
};


export const saveLocalForms = (localForm: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForm));
};