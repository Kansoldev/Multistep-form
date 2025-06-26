import { SelectPlanProps } from "../types";
import { capitalizeFirstLetter } from "../utils";

const SelectPlan: React.FC<SelectPlanProps> = ({
  plans,
  currentPlan,
  radioChecked,
  handlePlanUpdate,
  handleToggleRadioChecked,
  handlePrevStep,
  handleNextStep,
}) => {
  return (
    <div className="bg-white md:bg-transparent rounded-xl -mt-10 mx-5 md:mt-10 md:mx-0 shadow-xl md:shadow-none p-8 md:p-0 md:relative md:h-[90%]">
      <h2 className="font-bold text-3xl text-[#02295a]">Select your plan</h2>

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
                    ? `$${plan.yearlyPrice}/yr`
                    : `$${plan.monthlyPrice}/mo`}
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
            onChange={handleToggleRadioChecked}
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
          onClick={handlePrevStep}
        >
          Go Back
        </button>

        <button
          type="button"
          className="bg-[#02295a] text-white px-6 py-3 rounded-md"
          onClick={handleNextStep}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default SelectPlan;
