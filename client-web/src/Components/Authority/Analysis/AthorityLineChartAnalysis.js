import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import EnrollLineAnalysis from "../../Admin/Analysis/Line/EnrollLineAnalysis";
import EventAnalysis from "../../Admin/Analysis/Line/EventAnalysis";
import ComplaintLineAnalysis from "../../Admin/Analysis/Line/ComplaintLine";
import { ip } from "../../../Config/ip";

const AuthorityLineChartAnalysis = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);
  const { DistrictId } = useSelector((state) => state.user.user);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${ip}/getSportsComplex?district=${DistrictId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  }, [DistrictId]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${ip}/getSportsComplex?district=${DistrictId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div>
      <div className="w-1/5 relative m-5">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
          onChange={handleOptionChange}
          value={selectedOption}
        >
          <option value="" selected={true}>
            ALL
          </option>

          {data.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
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
      <EnrollLineAnalysis selectedOption={selectedOption} />
      <EventAnalysis selectedOption={selectedOption} />
      <ComplaintLineAnalysis selectedOption={selectedOption} />
    </div>
  );
};

export default AuthorityLineChartAnalysis;
