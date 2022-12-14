import { useSpring, animated } from "@react-spring/web";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import Link from "next/link";
import Chart from "chart.js/auto";

export const StockCard = (props: any) => {
  Chart.register();
  const buttonFadeIn = useSpring({
    config: { duration: 900 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const [selectedFilter, setSelectedFilter] = useState("5 min");
  const filters: StockFilter[] = ["5 min", "1 day", "1 week", "1 month"];

  type StockFilter = "5 min" | "1 day" | "1 week" | "1 month";
  type TimeSeriesChartData = {
    close: string;
    datetime: string;
    high: string;
    low: string;
    open: string;
    volume: string;
  };

  const chartData = {
    //see if we can get TimeSeriesChartData inferred somehow
    labels: props.datasets.data
      .map((value: TimeSeriesChartData) => value.datetime)
      .reverse(),
    datasets: [
      {
        label: "AMZN",
        backgroundColor: "rgba(30, 64, 175, .7)",
        borderColor: "rgba(30, 64, 175, .8)",
        pointRadius: 4,
        data: props.datasets.data
          .map((value: TimeSeriesChartData) => value.close)
          .reverse(),
      },
    ],
  };

  // seen errs working w charts v3 and ts, so typing as any
  const options: any = {
    type: "line",
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
    },
    scales: {
      y: {
        position: "right",
        grid: { display: false },
      },
      x: {
        display: false,
        grid: { display: false },
      },
    },
  };

  const buttons = [
    {
      name: "View Report",
      alt: "View stock report",
      color: "bg-blue-800",
      link: props.meta.symbol,
    },
    {
      name: "Add",
      alt: "Add to watchlist",
      color: "bg-blue-800",
      link: "/explore",
    },
  ];

  const selectFilter = (e: any, filter: StockFilter) => {
    e.preventDefault();
    setSelectedFilter(filter);
  };

  return (
    <animated.div className="w-96 max-w-sm rounded-sm border-2 border-gray-600 p-6 pb-2">
      <div className="mb-2 flex flex-row items-center justify-between">
        <h3 className="text-xl font-bold">{props.meta.symbol}</h3>
        <div className="border-c rounded-xl border-gray-300 bg-gray-300 p-1">
          <h4>{props.meta.exchange}</h4>
        </div>
      </div>
      <Line data={chartData} options={options} />
      <div className="m-2 flex flex-row justify-around">
        {filters.map((filter, idx) => (
          <button
            key={idx}
            onClick={(e) => selectFilter(e, filter)}
            className={`rounded-xl border border-gray-300 p-1 pr-2 pl-2 ${selectedFilter === filter ? "bg-blue-200" : ""
              }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <table className="h-20 w-full border-t border-t-blue-800">
        <thead className="text-center">
          <tr>
            <th className="min-w-[5rem]">High</th>
            <th className="min-w-[5rem]">Low</th>
            <th className="min-w-[5rem]">Volume</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            {/* in future i want backend to compute low/high up to entire day */}
            <td>${Math.round(props.datasets.data[0].high * 100) / 100}</td>
            <td>${Math.round(props.datasets.data[0].low * 100) / 100}</td>
            <td>{props.datasets.data[0].volume}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end pt-4">
        <animated.div style={buttonFadeIn}>
          {buttons.map((button, idx) => (
            <Link href={button.link} className="mr-2 last:mr-0" key={idx}>
              <button
                className={`rounded-sm p-2 font-semibold text-white hover:opacity-100 focus:border-blue-800 active:translate-y-1 active:opacity-90 ${button.color} opacity-80`}
              >
                {button.name}
              </button>
            </Link>
          ))}
        </animated.div>
      </div>
    </animated.div>
  );
};
