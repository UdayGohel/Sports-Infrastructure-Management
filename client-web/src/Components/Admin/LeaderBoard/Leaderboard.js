import React, { useEffect, useState } from "react";
import LeaderboardDataTable from "./LeaderBoardDataTable";
import { ip } from "../../../Config/ip";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(""); // Added state to track the selected option

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${ip}/getSports`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); // Update the selected option state
  };
  return (
    <div className="px-4 m-5 bg-gray-50 py-3">
      <div className="w-1/4 relative m-5">
        <select
          className=" block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
          onChange={handleOptionChange} // Add an onChange event handler
          value={selectedOption} // Set the value of the select element to the selectedOption state
        >
          <option value="">General</option>

          {data.map((item) => (
            <option key={item._id} value={item._id}>
              {item.SportName}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 14.293a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414L10 12.586 5.707 8.293a1 1 0 1 0-1.414 1.414l5 5z" />
          </svg>
        </div>
      </div>

      <LeaderboardDataTable selectedOption={selectedOption} />
    </div>
  );
};

export default Leaderboard;
