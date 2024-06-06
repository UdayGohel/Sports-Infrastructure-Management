import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ip } from "../../../../Config/ip";

const EnrollLineAnalysis = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Athlete",
        data: [30, 40, 35, 50, 49, 60, 10, 12],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      plotOptions: {
        line: {},
      },
      dataLabels: {
        enabled: true,
        offsetY: -10,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["#000"],
        },
      },
      xaxis: {
        categories: [
          "7 to 9 AM",
          "9 to 11 AM",
          "11 to 1 PM",
          "1 to 3 PM ",
          "3 to 5 PM",
          "5 to 7 PM",
          "7 to 12 PM",
          "12 to 7 AM",
        ],
      },
      yaxis: {
        title: {
          text: "Number of Athlete in Sport Complexes",
          style: {
            fontSize: "12px",
            fontFamily: undefined,
            color: "#263238",
          },
        },
      },
      colors: ["#3366FF"],
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Month wise Enroll Athelte in Sport Complex",
        align: "center",
        margin: 50,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "26px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      fill: {
        opacity: 1,
      },
    },
  });

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${ip}/monthWiseEnroll?sportsComplexId=${props.selectedOption}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const monthMapping = {};
        for (let i = 1; i <= 12; i++) {
          monthMapping[i] = 0;
        }

        result.data.forEach((entry) => {
          const monthNumber = entry._id.month;
          monthMapping[monthNumber] = entry.totalAthelete;
        });

        const monthNames = Object.keys(monthMapping).map((monthNumber) => {
          const monthName = new Intl.DateTimeFormat("en-US", {
            month: "long",
          }).format(new Date(2023, monthNumber - 1, 1));
          return monthName;
        });

        const mappedData = Object.values(monthMapping);

        setChartData({
          ...chartData,
          series: [
            {
              name: "Athlete",
              data: mappedData,
            },
          ],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: monthNames,
            },
          },
        });
      })
      .catch((error) => console.log("error", error));
  }, [props.selectedOption]);

  return (
    <div className="chart m-8">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line" // Make sure the type is set to line here as well
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default EnrollLineAnalysis;
