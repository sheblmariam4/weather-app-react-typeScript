import "./App.css";
import Search from "./components/Search";
import { useState } from "react";
import { forecastType } from "./types";
import Forecast from "./components/Forecast";
function App(): JSX.Element {
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const [close, setClose] = useState<boolean>(true)





  return (
    <main className="flex justify-center items-center h-[150vh] w-full bg-gradient-to-br from-sky-800">
      {forecast && close ? (
        (<Forecast data={forecast} close={close} setClose={setClose} />)
      ) : (
        <section className="absolute top-24 w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded">
          <h1 className="text-4xl font-thin">
            Weather <span className=" font-black"> Forecast </span>
          </h1>
          <p>
            Enter below a place you want to know the weather of and select an
            option from the dropdown
          </p>

          <Search setForecast={setForecast} setClose={setClose} />
        </section>
      )}
    </main>
  );
}

export default App;
