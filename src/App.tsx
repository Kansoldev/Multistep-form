import RegistrationFlow from "./components/RegistrationFlow";
import "./App.css";

function App() {
  return (
    <main className="md:bg-white md:flex justify-between gap-10 mx-auto md:rounded-2xl lg:w-[950px] md:p-4 md:pr-10 lg:pr-20 h-full">
      <RegistrationFlow />
    </main>
  );
}

export default App;
