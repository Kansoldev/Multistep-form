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

export interface Plans {
  name: string;
  icon: string;
  desc?: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

export interface Addons {
  name: string;
  desc: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

export interface CurrentPlan {
  name: string;
  price: number;
}

export interface PersonalInfoProps {
  inputs: Inputs;
  formErrors: FormErrors;
  handleInputChange: (e) => void;
  handleNextStep: () => void;
}

export interface SelectPlanProps {
  plans: Plans[];
  currentPlan: CurrentPlan;
  radioChecked: boolean;
  handlePlanUpdate: (plan: Plans) => void;
  handleToggleRadioChecked: () => void;
  handlePrevStep: () => void;
  handleNextStep: () => void;
}

export interface SelectAddonsProps {
  addons: Addons[];
  radioChecked: boolean;
  selectedAddons: { name: string; price: number }[];
  handleUserAddons: (addon: Addons) => void;
  handlePrevStep: () => void;
  handleNextStep: () => void;
}
