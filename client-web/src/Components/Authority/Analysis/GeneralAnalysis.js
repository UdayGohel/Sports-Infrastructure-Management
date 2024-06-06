import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ip } from "../../../Config/ip";

const GeneralAnalyis = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Student",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true, // Enable data labels
        offsetY: -10, // Adjust the vertical position of labels
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["#000"], // Text color
        },
      },
      // dataLabels: {
      //   enabled: false,
      // },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      yaxis: {
        title: {
          text: "Number of Athletes",
          style: {
            fontSize: "12px",
            // fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          }, // Your Y-axis title
        },
      },
      colors: ["#FF5733"],
      title: {
        text: "Sport Complex wise Enroll Students in Sports",
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
      `${ip}/sportDetailOfComplex?sportsComplexId=${props.selectedOption}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const data = result.data;
        const categories = data.map((s) => s._id[0]);
        const seriesData = data.map((s) => s.userCount);

        setChartData({
          ...chartData,
          series: [
            {
              data: seriesData,
            },
          ],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: categories,
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
        type="bar"
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default GeneralAnalyis;
