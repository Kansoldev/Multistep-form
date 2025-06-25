export interface Inputs {
  name: string;
  email: string;
  phone: string;
}

export interface FormErrors {
  name: string;
  email: string;
  phone: string;
}

export interface PersonalInfoProps {
  inputs: Inputs;
  formErrors: FormErrors;
  handleInputChange: (e) => void;
  handleValidation: (step: number) => void;
}
