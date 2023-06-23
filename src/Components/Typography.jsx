import React from "react";
import { toFahrenheit } from "../api";
const Typography = ({ data }) => {
  return (
    <div className="flex items-center font-bold justify-center pt-20">
      <img
        src={`icons/${data?.weather[0]?.icon}.png`}
        alt="weather"
        className="h-40 w-40"
      />
      <div className="width-20 pl-10">
        <div className="flex justify-around items-center ">
          <span className=" text-5xl">
            {Math.round(toFahrenheit(data?.main.temp))}
          </span>
          <span className="text-3xl">
            {" "}
            <sup>°F</sup>
          </span>
          <span className="ml-2 text-2xl ">| </span>
          <span className="text-lg px-2">{data?.weather[0]?.description}</span>
        </div>
        <div className="flex justify-around text-lg py-2">
          <span>H:{Math.round(toFahrenheit(data?.main.temp_max))} °F </span>
          <span>L:{Math.round(toFahrenheit(data?.main.temp_min))} °F</span>
        </div>
        <div className="flex justify-around text-2xl flex-no-wrap ">
          <p>{data?.city}</p>
        </div>
      </div>
    </div>
  );
};

export { Typography };
