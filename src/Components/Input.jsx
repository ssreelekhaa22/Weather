import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import "../App.css";
import { API_URL, apiKey } from "../api";

const Input = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const handleOnChange = (searchData) => {
    if (searchData && searchData.value) {
      setSearch(searchData);
      onSearchChange(searchData);
    } else {
      setSearch(null);
      onSearchChange(null);
    }
  };

  const loadOptions = async (input) => {
    if (input.trim() === "") {
      // If input is empty, return empty options array
      return Promise.resolve({ options: [] });
    }

    try {
      const response = await fetch(
        `${API_URL}geo/1.0/direct?q=${input}&appid=${apiKey}&limit=5`
      );
      const response_1 = await response.json();

      const options = response_1.map((city) => {
        const state = city.state ? city.state + ", " : "";
        return {
          value: `${city.lat} ${city.lon}`,
          label: `${city.name}, ${state} ${city.country}`,
        };
      });

      return { options };
    } catch (err) {
      console.log(err);
      return { options: [] };
    }
  };

  const customStyle = {
    container: (provided) => ({
      ...provided,
      width: "300px",
    }),
    control: (provided) => ({
      ...provided,
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxShadow: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f0f0f0" : "white",
      color: state.isSelected ? "blue" : "black",
      "&:hover": {
        backgroundColor: "#eaeaea",
        color: "red",
      },
    }),
  };

  return (
    <>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        isClearable={true}
        styles={customStyle}
      />
    </>
  );
};

export default Input;
