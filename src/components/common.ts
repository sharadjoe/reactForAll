


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


type RadioField = {
  kind:"radio"
  id:number
  label:string
  options:string[]
  value:string  
}


type textAreaField = {
  kind:"textarea"
  id:number
  label:string
  value:string
}

export type multiSelectField = {
  kind:"multiselect"
  id:number
  label:string
  options:{
    label:string
    value:string

  }[]
  value:string[]
}

export type formField  = TextField | DropDownField | RadioField | textAreaField | multiSelectField

export const getLocalForms: () => formData[] = () => {
  const savedFormJSON = localStorage.getItem("savedForms");
  return savedFormJSON ? JSON.parse(savedFormJSON) : [];
};


export const getLocalFormsById = (formId: number) => {
  const savedFormJSON = localStorage.getItem("savedForms");
  const parsedSavedFormJSON: formData[] = savedFormJSON ? JSON.parse(savedFormJSON) : [];
  return parsedSavedFormJSON.find((form: formData) => form.id === formId);
};


export const saveLocalForms = (localForm: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForm));
};



export const localFormReplaceById = ( formId: number, newForm:any) => {
  const savedFormJSON = localStorage.getItem("savedForms")
  const localForm =  savedFormJSON ? JSON.parse(savedFormJSON) : [];
  const index = localForm.findIndex((form: formData) => form.id === formId);
  localForm[index] = newForm;

  saveLocalForms(localForm)
}


