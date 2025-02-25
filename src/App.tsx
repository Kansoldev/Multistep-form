import { ChangeEvent, useState } from "react";
import SideBar from "./components/SideBar";
import "./App.css";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
  });

  function updateFields(event: ChangeEvent<HTMLInputElement>) {
    setInputs((prevInputs) => {
      return { ...prevInputs, [event.target.name]: event.target.value };
    });
  }

  return (
    <main className="md:bg-white md:flex justify-center gap-10 mx-auto md:rounded-2xl md:p-4 md:pr-16">
      <SideBar />

      <form>
        {currentStep === 1 && (
          <div className="bg-white md:bg-transparent rounded-xl -mt-10 mx-5 md:mt-10 md:mx-0 shadow-xl md:shadow-none p-8 md:p-0">
            <h2 className="font-bold text-3xl">Personal Info</h2>

            <p className="my-3 md:mb-5 text-[#9699ab]">
              Please provide your name, email address and phone number
            </p>

            <div>
              <label htmlFor="name" className="text-[#02295a] font-semibold">
                Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Stephen King"
                className="block w-full p-4 py-2 mt-1 border border-solid border-[#adbeff] rounded-md"
                value={inputs.name}
                onChange={(e) => updateFields(e)}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="email" className="text-[#02295a] font-semibold">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g. stephenking@lorem.com"
                className="block w-full p-4 py-2 mt-1 border border-solid border-[#adbeff] rounded-md"
                value={inputs.email}
                onChange={(e) => updateFields(e)}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="phone" className="text-[#02295a] font-semibold">
                Phone Number
              </label>

              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="e.g. +1 234 567 890"
                className="block w-full p-4 py-2 mt-1 border border-solid border-[#adbeff] rounded-md"
                value={inputs.phone}
                onChange={(e) => updateFields(e)}
              />
            </div>

            <button
              type="button"
              className="block bg-[#02295a] text-white px-6 py-3 mt-10 md:mt-28 ml-auto rounded-lg"
            >
              Next Step
            </button>
          </div>
        )}
      </form>
    </main>
  );
}

export default App;
