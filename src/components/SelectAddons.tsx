import { capitalizeFirstLetter, findArrayIndex } from "../utils";
import { SelectAddonsProps } from "../types";

const SelectAddons: React.FC<SelectAddonsProps> = ({
  addons,
  radioChecked,
  selectedAddons,
  handleUserAddons,
  handlePrevStep,
  handleNextStep,
}) => {
  return (
    <div className="bg-white md:bg-transparent rounded-xl -mt-10 mx-5 md:mt-10 md:mx-0 shadow-xl md:shadow-none p-8 md:p-0 md:relative h-[90%]">
      <h2 className="font-bold text-3xl text-[#02295a]">Pick add-ons</h2>

      <p className="mt-2 md:mb-7 text-[#9699ab]">
        Add-ons help enhance your gaming experience
      </p>

      {addons.map((addon) => (
        <label key={addon.name} htmlFor={addon.name} className="block mt-4">
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

export default SelectAddons;
