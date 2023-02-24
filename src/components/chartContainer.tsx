"use client";
import { Line } from "react-chartjs-2";

export default function ChartContainer({
  data,
  options,
}: {
  data: any;
  options: any;
}) {
  return (
    <>
      <Line data={data} options={options} />
    </>
  );
}
