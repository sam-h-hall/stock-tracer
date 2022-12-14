"use client";
import { data } from "../explore/data.js";
import { Line } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
import Image from "next/image";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";

export default function StockDetailsPage() {
  Chart.register();

  const datasetButtons = ["Close", "Volume"]; //["Open", "Close", "High", "Low", "Volume"];

  const initialChartState = {
    labels: data[0]?.datasets.data
      //see if we can get TimeSeriesChartData inferred somehow
      .map((value: TimeSeriesChartData) => value.datetime)
      .reverse(),
    datasets: [
      {
        label: "Close",
        backgroundColor: "rgba(30, 64, 175, .4)",
        borderColor: "rgba(30, 64, 175, .8)",
        pointRadius: 10,
        pointHoverRadius: 15,
        data: data[0]?.datasets.data
          .map((value: TimeSeriesChartData) => value.close)
          .reverse(),
      },
    ],
  };

  // const [displayVol, setDisplayVol] = useState(false);
  /* const [volumeData, setVolumeData] = useState({
    ...initialChartState,
  }); */
  // const [closeData, setCloseData] = useState({ ...initialChartState });
  const [chartData, setChartData] = useState({ ...initialChartState });
  const [chartOptions, setChartOptions] = useState({
    type: "line",
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        position: "right",
        grid: { display: false },
      },
      x: {
        // display: false,
        ticks: {
          display: false,
        },
        grid: { display: false },
      },
    },
  });

  // what is type of useState hook?
  const getChartData = (datapoint) => {
    fetch(`http://localhost:5000/stockDetails/AMZN/${datapoint}`, {
      method: "GET",
    });
  };
  // const getChartData = (
  //   datapoint: string = "close",
  //   stateFunction?: any,
  //   colorObj?: { backgroundColor: string; borderColor: string }
  // ) => {
  //   fetch(`http://localhost:5000/stockDetails/AMZN/${datapoint}`, {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       res.json().then((res) => {
  //         const newDataset = {
  //           ...chartData,
  //           datasets: [
  //             {
  //               ...chartData.datasets[0],
  //               ...colorObj,
  //               data: res.volume,
  //             },
  //           ],
  //         };
  //         stateFunction({ ...newDataset });
  //       });
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // };

  // useEffect(() => {
  //   getChartData("close", setChartData);
  //   getChartData("volume", setVolumeData, {
  //     backgroundColor: "rgba(242, 105, 105, .6)",
  //     borderColor: "rgba(242, 105, 105, .6)",
  //   });
  // }, []);

  const showVolume = (e: any) => { };
  // const showVolume = (e: any) => {
  //   console.log(e.target.name);
  //   if (e.target.name === "Close") {
  //     setChartData(closeData);
  //     setDisplayVol(false);
  //   } else {
  //     setChartData(volumeData);
  //     setDisplayVol(true);
  //   }
  // };

  type TimeSeriesChartData = {
    close: string;
    datetime: string;
    high: string;
    low: string;
    open: string;
    volume: string;
  };

  const options: any = {
    type: "line",
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        position: "right",
        grid: { display: false },
      },
      x: {
        // display: false,
        ticks: {
          display: false,
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="2px:pt-8 min-h-screen min-w-full border border-green-500 p-4 2xl:pr-32 2xl:pl-32">
      <div className="box-border flex min-h-full max-w-full flex-col justify-center">
        <div className="max-h-full rounded-t-md border border-blue-800 sm:h-[40rem]">
          <Line data={chartData} options={options} />
        </div>
        <div>
          {datasetButtons.map((button) => (
            <button
              key={button}
              name={button}
              className={`m-2 rounded-xl border border-gray-300 bg-blue-200 bg-opacity-80 p-1 pr-2 pl-2 text-black`}
              onClick={(e) => showVolume(e)}
            >
              {button}
            </button>
          ))}
        </div>

        <div className="border bg-blue-800 bg-opacity-40 2xl:min-w-[40rem]">
          <div className="flex flex-row items-end justify-center">
            <div>
              <Image
                alt="stock symbol"
                src="https://api.twelvedata.com/logo/amazon.com"
                width="40"
                height="40"
              />
            </div>
            <h2 className="pl-2">{data[0]?.meta.symbol}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
