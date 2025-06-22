import { useState, useEffect, ChangeEvent } from "react";
import SideBar from "./SideBar";
import { findArrayIndex, capitalizeFirstLetter } from "../utils";

// Store specific error messages here
let nameErr = "";
let emailErr = "";
let phoneErr = "";

// Use this variable to add up the prices of selected addons
let selectedAddonPrices = 0;

const plans = [
  {
    name: "arcade",
    icon: "/icon-arcade.svg",
    monthPrice: 9,
    yearPrice: 90,
  },
  {
    name: "advanced",
    icon: "/icon-advanced.svg",
    monthPrice: 12,
    yearPrice: 120,
  },
  {
    name: "pro",
    icon: "/icon-pro.svg",
    monthPrice: 15,
    yearPrice: 150,
  },
];

const addons = [
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
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
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
          ? plans[planIndex].yearPrice
          : plans[planIndex].monthPrice,
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

  function updateFields(event: ChangeEvent<HTMLInputElement>) {
    setInputs((prevInputs) => {
      return { ...prevInputs, [event.target.name]: event.target.value };
    });
  }

  function handleValidation(num: number) {
    if (inputs.name === "") {
      nameErr = "This field is required";
    } else if (inputs.name.length < 5) {
      nameErr = "Name must be at least 5 characters long";
    } else {
      nameErr = "";
    }

    if (inputs.email === "") {
      emailErr = "This field is required";
    } else {
      emailErr = "";
    }

    if (inputs.phone === "") {
      phoneErr = "This field is required";
    } else {
      phoneErr = "";
    }

    setFormErrors((prevErrors) => {
      return {
        ...prevErrors,
        name: nameErr,
        email: emailErr,
        phone: phoneErr,
      };
    });

    if (nameErr === "" && emailErr === "" && phoneErr === "") {
      setCurrentStep(num);
    }
  }

  function handleUserAddons(userAddons: {
    name: string;
    monthlyPrice: number;
    yearlyPrice: number;
  }) {
    const addonIndex = findArrayIndex(selectedAddons, userAddons);

    if (addonIndex === -1) {
      // The addon is not in the array before, so push it inside the selectedAddon array
      const newSelectedAddons = [
        ...selectedAddons,
        {
          name: userAddons.name,
          price: radioChecked
            ? userAddons.yearlyPrice
            : userAddons.monthlyPrice,
        },
      ];

      setSelectedAddons(newSelectedAddons);
    } else {
      const newSelectedAddons = selectedAddons.filter(
        (addon) => addon.name !== userAddons.name
      );

      setSelectedAddons(newSelectedAddons);
    }
  }

  function handlePlanUpdate(plan: {
    name: string;
    icon: string;
    monthPrice: number;
    yearPrice: number;
  }) {
    setCurrentPlan({
      name: plan.name,
      price: radioChecked ? plan.yearPrice : plan.monthPrice,
    });
  }

  return (
    <>
      <SideBar currentStep={currentStep} />

      <form className="flex-1 md:ml-8">
        {currentStep === 1 && (
          <div className="bg-white md:bg-transparent rounded-xl -mt-10 mx-5 md:mt-10 md:mx-0 shadow-xl md:shadow-none p-8 md:p-0 md:relative md:h-[90%]">
            <h2 className="font-bold text-3xl text-[#02295a]">Personal Info</h2>

            <p className="my-3 md:mb-5 text-[#9699ab]">
              Please provide your name, email address and phone number
            </p>

            <div>
              <label htmlFor="name" className="text-[#02295a] font-semibold">
                Name
              </label>

              {formErrors.name && (
                <span className="inline-block float-right text-[#ed3548] font-semibold">
                  {formErrors.name}
                </span>
              )}

              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Stephen King"
                className={`block w-full p-4 py-2 mt-1 border border-solid ${
                  formErrors.name !== ""
                    ? "border-[#ed3548]"
                    : "border-[#adbeff]"
                } rounded-md`}
                value={inputs.name}
                onChange={(e) => updateFields(e)}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="email" className="text-[#02295a] font-semibold">
                Email Address
              </label>

              {formErrors.email && (
                <span className="inline-block float-right text-[#ed3548] font-semibold">
                  {formErrors.email}
                </span>
              )}

              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g. stephenking@lorem.com"
                className={`block w-full p-4 py-2 mt-1 border border-solid ${
                  formErrors.email !== ""
                    ? "border-[#ed3548]"
                    : "border-[#adbeff]"
                } rounded-md`}
                value={inputs.email}
                onChange={(e) => updateFields(e)}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="phone" className="text-[#02295a] font-semibold">
                Phone Number
              </label>

              {formErrors.phone && (
                <span className="inline-block float-right text-[#ed3548] font-semibold">
                  {formErrors.phone}
                </span>
              )}

              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="e.g. +1 234 567 890"
                className={`block w-full p-4 py-2 mt-1 border border-solid ${
                  formErrors.phone !== ""
                    ? "border-[#ed3548]"
                    : "border-[#adbeff]"
                } rounded-md`}
                value={inputs.phone}
                onChange={(e) => updateFields(e)}
              />
            </div>

            <div className="bg-white p-4 md:p-0 absolute bottom-0 left-0 right-0 mt-5">
              <button
                type="button"
                className="bg-[#02295a] text-white px-6 py-3 rounded-md float-right"
                onClick={() => handleValidation(2)}
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white md:bg-transparent rounded-xl -mt-10 mx-5 md:mt-10 md:mx-0 shadow-xl md:shadow-none p-6 pb-3 md:p-0 md:relative md:h-[90%]">
            <h2 className="font-bold text-3xl text-[#02295a]">
              Select your plan
            </h2>

            <p className="mt-3 md:mb-5 text-[#9699ab]">
              You have the option of monthly/yearly billing
            </p>

            <div className="flex flex-col md:flex-row gap-3 md:gap-6 text-white mt-4">
              {plans.map((plan) => (
                <label key={plan.name} htmlFor={plan.name}>
                  <input
                    type="radio"
                    name="options"
                    id={plan.name}
                    value={plan.name}
                    className="absolute opacity-0 w-0 h-0"
                    defaultChecked={plan.name === currentPlan.name}
                    onChange={() => handlePlanUpdate(plan)}
                  />

                  <div className="flex items-center border border-solid border-[#d6d9e6] md:inline-block rounded-md p-3 lg:w-[120px]">
                    <div className="w-10 h-10 rounded-full">
                      <img src={plan.icon} alt="" />
                    </div>

                    <div className="plan-details ml-3 md:ml-0">
                      <h4 className="text-[#02295a] font-bold md:mt-7">
                        {capitalizeFirstLetter(plan.name)}
                      </h4>

                      <p className="text-[#9699ab]">
                        {radioChecked
                          ? `$${plan.yearPrice}/yr`
                          : `$${plan.monthPrice}/mo`}
                      </p>

                      {radioChecked && (
                        <span className="mt-2 text-[#02295a] text-sm font-semibold">
                          2 months free
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="bg-[#f8f9fe] mt-3 md:mt-10 mb-3 flex justify-center items-center gap-6 py-3 rounded-md">
              <span
                className={`text-[#02295a] text-sm ${
                  !radioChecked ? "font-bold" : ""
                }`}
              >
                Monthly
              </span>

              <label className="switch">
                <input
                  type="checkbox"
                  data-checked={radioChecked}
                  onChange={() => setRadioChecked(!radioChecked)}
                />
                <span className="slider"></span>
              </label>

              <span
                className={`text-[#02295a] text-sm ${
                  radioChecked ? "font-bold" : ""
                }`}
              >
                Yearly
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
                className="bg-[#02295a] text-white px-6 py-3 rounded-md"
                onClick={() => setCurrentStep(3)}
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white md:bg-transparent rounded-xl -mt-10 mx-5 md:mt-10 md:mx-0 shadow-xl md:shadow-none p-8 md:p-0 md:relative h-[90%]">
            <h2 className="font-bold text-3xl text-[#02295a]">Pick add-ons</h2>

            <p className="mt-2 md:mb-7 text-[#9699ab]">
              Add-ons help enhance your gaming experience
            </p>

            {addons.map((addon) => (
              <label
                key={addon.name}
                htmlFor={addon.name}
                className="block mt-4"
              >
                <input
                  type="checkbox"
                  name="addons"
                  id={addon.name}
                  value={addon.name}
                  className="absolute opacity-0 w-0 h-0"
                  onClick={() => handleUserAddons(addon)}
                  defaultChecked={findArrayIndex(selectedAddons, addon) !== -1}
                />

                <div className="border border-solid border-[#d6d9e6] p-4 min-[420px]:flex items-center justify-between rounded-lg">
                  <span className="block w-5 h-5 bg-white rounded-[4px] border border-solid border-[#d6d9e6] cursor-pointer"></span>

                  <div className="basis-56 md:ml-5 lg:ml-0">
                    <h3 className="text-[#02295a] font-bold mt-3 min-[420px]:mt-0">
                      {capitalizeFirstLetter(addon.name)}
                    </h3>
                    <p className="text-[#9699ab] text-sm"> {addon.desc}</p>
                  </div>

                  <span className="text-[#473dff]">
                    +$
                    {radioChecked
                      ? `${addon.yearlyPrice}/yr`
                      : `${addon.monthlyPrice}/mo`}
                  </span>
                </div>
              </label>
            ))}

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
                className="bg-[#02295a] text-white px-6 py-3 rounded-md"
                onClick={() => setCurrentStep(4)}
              >
                Next Step
              </button>
            </div>
          </div>
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
