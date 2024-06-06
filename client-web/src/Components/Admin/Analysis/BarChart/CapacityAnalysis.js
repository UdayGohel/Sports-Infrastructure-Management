import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ip } from "../../../../Config/ip";

const CapacityAnalysis = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Capacity",
        data: [30, 40, 35, 50],
      },
      {
        name: "Enroll Athelte",
        data: [49, 60, 10, 12],
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
        enabled: true,
        offsetY: -10,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["#000"],
        },
      },
      xaxis: {
        categories: ["Cricket", "Basket Ball", "Volly Ball", "Tennis"],
      },
      yaxis: {
        title: {
          text: "Number of Athelte in Sport Complexes",
          style: {
            fontSize: "12px",
            // fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          }, // Your Y-axis title
        },
      },
      colors: ["#66FF33", "#FF3366"],
      title: {
        text: "Capacity wise Enroll Athelte in Sport",
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
    if (props.selectedOption !== "") {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `${ip}/sportCapacityUtilization?sportsComplexId=${props.selectedOption}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          const data = result.data;
          const categories = data.map((s) => parseInt(s.capacity, 10));
          // const seriesData = data.map((s) => s.sport);
          const seriesData = data.map((s) => {
            const utilizationStatus =
              s.capacity < s.totalAthelete ? "Over Utilized" : "Under Utilized";
            const color =
              utilizationStatus === "Under Utilized" ? "#00FF00" : "#FF0000"; // Green for Over Utilized, Red for Under Utilized
            return { label: `${s.sport} - ${utilizationStatus}`, color };
          });
          const totalAthelet = data.map((s) => s.totalAthelete);

          setChartData({
            ...chartData,
            series: [
              {
                data: categories,
              },
              {
                data: totalAthelet,
              },
            ],
            options: {
              ...chartData.options,
              xaxis: {
                ...chartData.options.xaxis,
                categories: seriesData.map((item) => item.label),
                labels: {
                  style: {
                    fontSize: "16px",
                    fontWeight: "bold",
                    colors: seriesData.map((item) => item.color),
                  },
                },
              },
            },
          });
        })
        .catch((error) => console.log("error", error));
    }
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

export default CapacityAnalysis;
