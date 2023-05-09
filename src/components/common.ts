


export interface formData {
  id: number;
  title: string;
  formFields: formField[];
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


