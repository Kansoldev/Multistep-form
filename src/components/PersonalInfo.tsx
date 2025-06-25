import { PersonalInfoProps } from "../types";

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  inputs,
  formErrors,
  handleInputChange,
  handleNextStep,
}) => {
  return (
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
          className={`block w-full p-4 py-2 mt-1 border border-solid ${
            formErrors.name !== "" ? "border-[#ed3548]" : "border-[#adbeff]"
          } rounded-md`}
          placeholder="e.g. Stephen King"
          value={inputs.name}
          onChange={(e) => handleInputChange(e)}
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
          className={`block w-full p-4 py-2 mt-1 border border-solid ${
            formErrors.email !== "" ? "border-[#ed3548]" : "border-[#adbeff]"
          } rounded-md`}
          placeholder="e.g. stephenking@lorem.com"
          value={inputs.email}
          onChange={(e) => handleInputChange(e)}
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
          className={`block w-full p-4 py-2 mt-1 border border-solid ${
            formErrors.phone !== "" ? "border-[#ed3548]" : "border-[#adbeff]"
          } rounded-md`}
          placeholder="e.g. +1 234 567 890"
          value={inputs.phone}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="bg-white p-4 md:p-0 absolute bottom-0 left-0 right-0 mt-5">
        <button
          type="button"
          className="bg-[#02295a] text-white px-6 py-3 rounded-md float-right"
          onClick={handleNextStep}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
