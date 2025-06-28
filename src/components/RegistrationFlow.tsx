import { useState, useEffect, ChangeEvent } from "react";
import SideBar from "./SideBar";
import PersonalInfo from "./PersonalInfo";
import SelectPlan from "./SelectPlan";
import SelectAddons from "./SelectAddons";
import { findArrayIndex, capitalizeFirstLetter } from "../utils";
import { Inputs, FormErrors, Plans, Addons } from "../types";

// Use this variable to add up the prices of selected addons
let selectedAddonPrices = 0;

const plans: Plans[] = [
  {
    name: "arcade",
    icon: "/icon-arcade.svg",
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
  {
    name: "advanced",
    icon: "/icon-advanced.svg",
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  {
    name: "pro",
    icon: "/icon-pro.svg",
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
];

const addons: Addons[] = [
  {
    name: "online service",
    desc: "Access to multiplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    name: "larger storage",
    desc: "Extra 1TB of cloud save",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    name: "customizable profile",
    desc: "Custom theme on your profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];

const RegistrationFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [radioChecked, setRadioChecked] = useState(false);
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: "",
    email: "",
    phone: "",
  });
  const [currentPlan, setCurrentPlan] = useState({
    name: "arcade",
    price: 9,
  });
  const [selectedAddons, setSelectedAddons] = useState<
    { name: string; price: number }[]
  >([]);
  const [formCompleted, setFormCompleted] = useState(false);

  useEffect(() => {
    // Get the index of selected plan from the array of objects
    const planIndex = plans.findIndex((plan) => plan.name === currentPlan.name);

    setCurrentPlan(() => {
      return {
        name: currentPlan.name,
        price: radioChecked
          ? plans[planIndex].yearlyPrice
          : plans[planIndex].monthlyPrice,
      };
    });

    const updatedSelectedAddons = selectedAddons
      .map((selectedAddon) =>
        addons.findIndex((addon) => addon.name === selectedAddon.name)
      )
      .map((addonIndex) => {
        return {
          name: addons[addonIndex].name,
          price: radioChecked
            ? addons[addonIndex].yearlyPrice
            : addons[addonIndex].monthlyPrice,
        };
      });

    setSelectedAddons(updatedSelectedAddons);
  }, [radioChecked]);

  function handlePrevStep() {
    setCurrentStep((prevStep) => prevStep - 1);
  }

  function handleNextStep(step: number) {
    if (step === 2) {
      if (validatePersonalInfo()) {
        setCurrentStep(step);
      }
    } else {
      setCurrentStep(step);
    }
  }

  function handleToggleRadioChecked() {
    setRadioChecked(!radioChecked);
  }

  // Handlers for Personal Info
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputs((prevInputs) => {
      return { ...prevInputs, [event.target.name]: event.target.value };
    });
  }

  function validatePersonalInfo() {
    const newErrors = { name: "", email: "", phone: "" };
    let isValid = true;

    if (inputs.name === "") {
      newErrors.name = "This field is required";
      isValid = false;
    } else if (inputs.name.length < 5) {
      newErrors.name = "Name must be at least 5 characters long";
      isValid = false;
    }

    if (inputs.email === "") {
      newErrors.email = "This field is required";
      isValid = false;
    }

    if (inputs.phone === "") {
      newErrors.phone = "This field is required";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  }

  // Handlers for SelectPlan
  function handlePlanUpdate(plan: Plans) {
    setCurrentPlan({
      name: plan.name,
      price: radioChecked ? plan.yearlyPrice : plan.monthlyPrice,
    });
  }

  // Handlers for SelectAddons
  function handleUserAddons(userSelectedAddon: Addons) {
    let newSelectedAddons = []; // To store users selected addons

    // Check if the users selected addon exists in selectedAddons array
    const addonIndex = findArrayIndex(selectedAddons, userSelectedAddon);

    if (addonIndex === -1) {
      // Add it inside the selectedAddons array
      newSelectedAddons = [
        ...selectedAddons,
        {
          name: userSelectedAddon.name,
          price: radioChecked
            ? userSelectedAddon.yearlyPrice
            : userSelectedAddon.monthlyPrice,
        },
      ];
    } else {
      // it exists in the array, so remove it
      newSelectedAddons = selectedAddons.filter(
        (addon) => addon.name !== userSelectedAddon.name
      );
    }

    setSelectedAddons(newSelectedAddons);
  }

  return (
    <>
      <SideBar currentStep={currentStep} />

      <form className="flex-1 md:ml-8">
        {currentStep === 1 && (
          <PersonalInfo
            inputs={inputs}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
            handleNextStep={() => handleNextStep(2)}
          />
        )}

        {currentStep === 2 && (
          <SelectPlan
            plans={plans}
            currentPlan={currentPlan}
            radioChecked={radioChecked}
            handlePlanUpdate={handlePlanUpdate}
            handleToggleRadioChecked={handleToggleRadioChecked}
            handlePrevStep={handlePrevStep}
            handleNextStep={() => handleNextStep(3)}
          />
        )}

        {currentStep === 3 && (
          <SelectAddons
            addons={addons}
            radioChecked={radioChecked}
            selectedAddons={selectedAddons}
            handleUserAddons={handleUserAddons}
            handlePrevStep={handlePrevStep}
            handleNextStep={() => handleNextStep(4)}
          />
        )}

        {currentStep === 4 && (
          <>
            <div
              className={`bg-white md:bg-transparent rounded-xl -mt-10 mx-5 md:mt-10 md:mx-0 shadow-xl md:shadow-none p-7 md:p-0 md:relative h-[90%] ${
                formCompleted ? "hidden" : ""
              }`}
            >
              <h2 className="font-bold text-3xl text-[#02295a]">
                Finishing up
              </h2>

              <p className="mt-2 md:mb-7 text-[#9699ab]">
                Double-check everything looks OK before confirming
              </p>

              <div className="p-4 bg-[#fafbff]">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    {`${capitalizeFirstLetter(currentPlan.name)} (${
                      radioChecked ? "Yearly" : "Monthly"
                    })`}
                    <br />
                    <a
                      href={"#"}
                      className="text-[#9699ab] underline font-medium text-sm"
                      onClick={() => setCurrentStep(2)}
                    >
                      Change
                    </a>
                  </span>

                  <span className="font-bold text-[#02295a]">
                    $
                    {radioChecked
                      ? `${currentPlan.price}/yr`
                      : `${currentPlan.price}/mo`}
                  </span>
                </div>

                {selectedAddons.length > 0 && <hr className="my-5" />}

                {selectedAddons.map((addons) => {
                  selectedAddonPrices += addons.price;

                  return (
                    <div
                      key={addons.name}
                      className="flex justify-between mt-3"
                    >
                      <span className="text-[#9699ab]">
                        {capitalizeFirstLetter(addons.name)}
                      </span>

                      <span className="text-[#02295a] font-medium">
                        +$
                        {radioChecked
                          ? `${addons.price}/yr`
                          : `${addons.price}/mo`}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="result flex justify-between mt-3 px-4 pt-3">
                <span className="text-[#9699ab]">Total</span>
                <span className="text-[#473dff] text-xl font-bold">
                  ${currentPlan.price + selectedAddonPrices}
                  {radioChecked ? "/yr" : "/mo"}
                </span>
              </div>

              <div className="flex justify-between bg-white p-4 md:p-0 absolute right-0 bottom-0 left-0 mt-5">
                <button
                  type="button"
                  className="text-[#02295a] rounded-lg ml-2"
                  onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
                >
                  Go Back
                </button>

                <button
                  type="button"
                  className="px-6 py-3 block bg-[#473dff] text-white rounded-lg"
                  onClick={() => setFormCompleted(true)}
                >
                  Confirm
                </button>
              </div>
            </div>

            {formCompleted && (
              <div className="bg-white md:bg-transparent rounded-xl shadow-xl md:shadow-none px-4 py-16 md:p-0 text-center flex flex-col justify-center h-full">
                <img
                  src="/icon-thank-you.svg"
                  width={80}
                  className="block mx-auto"
                />

                <h2 className="font-bold text-3xl mt-8 text-[#02295a]">
                  Thank you!
                </h2>

                <p className="mt-3 text-[#9699ab]">
                  Thanks for confirming your subscription!, We hope you have fun
                  using our platform. if you ever need support, please feel free
                  to email us at support@loremgaming.com
                </p>
              </div>
            )}
          </>
        )}
      </form>
    </>
  );
};

export default RegistrationFlow;
