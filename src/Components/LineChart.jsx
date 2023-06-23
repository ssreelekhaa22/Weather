import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineChart = ({ data, isDaytime }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const temperatureData = data.list
      .slice(0, 5)
      .map((item) => item?.main?.temp);

    const width = 400;
    const height = 300;
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const x_label = "Day";
    const y_label = "Temperature (°F)";

    // Remove any existing chart elements
    d3.select(chartRef.current).selectAll("*").remove();

    // Create SVG element
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define the days of the week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Get the current day of the week
    const currentDayIndex = new Date().getDay();

    // Rearrange the days of the week array based on the current day
    const arrangedDaysOfWeek = [
      ...daysOfWeek.slice(currentDayIndex),
      ...daysOfWeek.slice(0, currentDayIndex),
    ];

    // Create x scale
    const xScale = d3
      .scaleBand()
      .domain(arrangedDaysOfWeek.slice(0, 5))
      .range([0, width])
      .padding(0.2);

    // Create y scale
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(temperatureData, (d) => ((d - 273.15) * 9) / 5 + 32), // Convert Kelvin to Fahrenheit
        d3.max(temperatureData, (d) => ((d - 273.15) * 9) / 5 + 32), // Convert Kelvin to Fahrenheit
      ])
      .range([height, 0]);

    // Create x axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("font-size", "14px");

    // Create x axis label
    svg
      .append("text")
      .attr("class", "x-label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .style("text-anchor", "middle")
      .style("fill", isDaytime ? "black" : "white")
      .style("font-size", "18px")
      .text(x_label);

    // Create y axis
    svg
      .append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "14px");

    // Create y axis label
    svg
      .append("text")
      .attr("class", "y-label")
      .attr("transform", "rotate(-90)")
      .style("fill", isDaytime ? "black" : "white")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 10)
      .style("text-anchor", "middle")
      .style("font-size", "18px")
      .text(y_label);

    // Draw line
    svg
      .append("path")
      .datum(temperatureData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .line()
          .x((d, i) => xScale(arrangedDaysOfWeek[i]) + xScale.bandwidth() / 2)
          .y((d) => yScale(((d - 273.15) * 9) / 5 + 32)) // Convert Kelvin to Fahrenheit
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default LineChart;
