const SideBar = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    {
      id: 1,
      heading: "Your Info",
    },
    {
      id: 2,
      heading: "Select Plan",
    },
    {
      id: 3,
      heading: "Add-ons",
    },
    {
      id: 4,
      heading: "Summary",
    },
  ];

  return (
    <div className="md:min-w-[250px] lg:min-w-[350px] min-h-[150px] md:h-[550px] p-8 pt-9 md:pt-12 flex justify-center gap-6 md:block md:rounded-2xl sidebar">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`uppercase ${step.id > 1 ? "md:mt-7" : ""}`}
        >
          <span
            className={`flex items-center justify-center rounded-full md:mr-4 mt-1 font-bold md:float-left w-5 h-5 p-5 border ${
              currentStep === step.id
                ? "bg-[#bfe2fd]"
                : "border border-white text-white"
            }`}
          >
            {step.id}
          </span>

          <p className="hidden md:block text-[#adbeff]">Step {step.id}</p>

          <h3 className="hidden md:block text-white font-medium ml-2">
            {step.heading}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
