import { ChangeEvent, useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import "./App.css";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [radioChecked, setRadioChecked] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [currentPlan, setCurrentPlan] = useState({
    name: "arcade",
    price: "$9/mo",
  });

  const plans = [
    {
      name: "arcade",
      icon: "/icon-arcade.svg",
      monthPrice: "$9/mo",
      yearPrice: "$90/yr",
    },
    {
      name: "advanced",
      icon: "/icon-advanced.svg",
      monthPrice: "$12/mo",
      yearPrice: "$120/yr",
    },
    {
      name: "pro",
      icon: "/icon-pro.svg",
      monthPrice: "$15/mo",
      yearPrice: "$150/yr",
    },
  ];

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
  }, [radioChecked]);

  // Store specific error messages here
  // To avoid calling setErrors() multiple times
  let nameErr = "";
  let emailErr = "";
  let phoneErr = "";

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

    setErrors((prevErrors) => {
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

  function handlePlanUpdate(plan: {
    name: string;
    icon: string;
    monthPrice: string;
    yearPrice: string;
  }) {
    setCurrentPlan({
      name: plan.name,
      price: radioChecked ? plan.yearPrice : plan.monthPrice,
    });
  }

  return (
    <main className="md:bg-white md:flex justify-center gap-10 mx-auto md:rounded-2xl md:p-4 md:pr-16">
      <SideBar currentStep={currentStep} />

      <form>
        {currentStep === 1 && (
          <div className="bg-white md:bg-transparent rounded-xl -mt-10 mx-5 md:mt-10 md:mx-0 shadow-xl md:shadow-none p-8 md:p-0">
            <h2 className="font-bold text-3xl text-[#02295a]">Personal Info</h2>

            <p className="my-3 md:mb-5 text-[#9699ab]">
              Please provide your name, email address and phone number
            </p>

            <div>
              <label htmlFor="name" className="text-[#02295a] font-semibold">
                Name
              </label>

              {errors.name && (
                <span className="inline-block float-right text-[#ed3548] font-semibold">
                  {errors.name}
                </span>
              )}

              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Stephen King"
                className={`block w-full p-4 py-2 mt-1 border border-solid ${
                  errors.name !== "" ? "border-[#ed3548]" : "border-[#adbeff]"
                } rounded-md`}
                value={inputs.name}
                onChange={(e) => updateFields(e)}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="email" className="text-[#02295a] font-semibold">
                Email Address
              </label>

              {errors.email && (
                <span className="inline-block float-right text-[#ed3548] font-semibold">
                  {errors.email}
                </span>
              )}

              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g. stephenking@lorem.com"
                className={`block w-full p-4 py-2 mt-1 border border-solid ${
                  errors.email !== "" ? "border-[#ed3548]" : "border-[#adbeff]"
                } rounded-md`}
                value={inputs.email}
                onChange={(e) => updateFields(e)}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="phone" className="text-[#02295a] font-semibold">
                Phone Number
              </label>

              {errors.phone && (
                <span className="inline-block float-right text-[#ed3548] font-semibold">
                  {errors.phone}
                </span>
              )}

              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="e.g. +1 234 567 890"
                className={`block w-full p-4 py-2 mt-1 border border-solid ${
                  errors.phone !== "" ? "border-[#ed3548]" : "border-[#adbeff]"
                } rounded-md`}
                value={inputs.phone}
                onChange={(e) => updateFields(e)}
              />
            </div>

            <button
              type="button"
              className="block bg-[#02295a] text-white px-6 py-3 mt-10 md:mt-28 ml-auto rounded-lg"
              onClick={() => handleValidation(2)}
            >
              Next Step
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white md:bg-transparent rounded-xl -mt-10 mx-5 md:mt-10 md:mx-0 shadow-xl md:shadow-none p-7 md:p-0">
            <h2 className="font-bold text-3xl text-[#02295a]">
              Select your plan
            </h2>

            <p className="my-3 md:mb-5 text-[#9699ab]">
              You have the option of monthly/yearly billing
            </p>

            <div className="flex flex-col md:flex-row justify-between gap-4 text-white mt-5">
              {plans.map((plan) => (
                <label key={plan.name} htmlFor={plan.name} className="flex-1">
                  <input
                    type="radio"
                    name="options"
                    id={plan.name}
                    value={plan.name}
                    className="absolute opacity-0 w-0 h-0"
                    defaultChecked={plan.name === "arcade"}
                    onChange={() => handlePlanUpdate(plan)}
                  />

                  <div className="flex items-center gap-3 border border-solid border-[#166a79] md:inline-block p-3 pr-14 rounded-md w-full relative">
                    <div className="w-10 h-10 rounded-full">
                      <img src={plan.icon} alt="" />
                    </div>

                    <div className="plan-details">
                      <h4 className="text-[#02295a] font-bold md:mt-10">
                        {/* Make first letter capital */}
                        {plan.name.substring(0, 1).toUpperCase() +
                          plan.name.substring(1)}
                      </h4>

                      <p className="text-[#9699ab]">
                        {radioChecked ? plan.yearPrice : plan.monthPrice}
                      </p>

                      {radioChecked && (
                        <span className="mt-2 text-[#02295a]">
                          2 months free
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="bg-[#f8f9fe] mt-12 flex justify-center items-center gap-6 py-3 rounded-md">
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

            <div className="flex justify-between w-full mt-10 md:mt-28">
              <button
                type="button"
                className="px-6 py-3 block text-[#02295a] rounded-lg"
                onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
              >
                Go Back
              </button>

              <button className="px-6 py-3 block bg-[#02295a] text-white rounded-lg">
                Next Step
              </button>
            </div>
          </div>
        )}
      </form>
    </main>
  );
}

export default App;
