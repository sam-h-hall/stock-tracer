import {
  Time_Series_Data,
  Time_Series_State,
  TSD,
} from "../store/timeSeriesStore";

export const processTimeSeries = (
  symbolData: Time_Series_Data[]
): Partial<Time_Series_State> | null => {
  // console.log("sym: ", symbolData);
  const symbolLegend = [""];
  const preProcessingData = {
    symbolLegend,
    data:
      symbolData.reduce(
        (acc: { [key: string]: TSD }, curr: Time_Series_Data) => {
          symbolLegend?.push(curr.symbol as unknown as string);
          return Object.assign(acc, {
            [curr.symbol as unknown as string]: {
              ...curr,
              graphData: {},
              dateLegend: [""],
            },
          });
        },
        {}
      ) ?? null,
  };

  const fDat = preProcessingData.data;
  // console.log("F: ", fDat);

  if (preProcessingData !== undefined && preProcessingData.data !== null) {
    preProcessingData.symbolLegend.map((symbol) => {
      const dateLegend = Object.keys(
        fDat?.[symbol]?.["time_series"] ?? {}
      ).sort();
      dateLegend.map((date) => {
        const timeLegend = Object.keys(
          fDat?.[symbol]?.["time_series"]?.[date] ?? {}
        ).sort();

        let dateLegendRef = preProcessingData?.data?.[symbol]?.dateLegend;
        dateLegendRef = dateLegend ?? [];

        const closing = timeLegend.map((time) => {
          if (
            preProcessingData?.data?.[symbol]?.time_series?.[date]?.[time]
              ?.close
          ) {
            return preProcessingData?.data?.[symbol]?.time_series?.[date]?.[
              time
            ]?.close;
          }
        });

        const newGraphData = {
          [date]: {
            times: timeLegend,
            closing,
          },
        };
        preProcessingData!.data![symbol]!.graphData = newGraphData;
        preProcessingData!.data![symbol]!.dateLegend = dateLegend;
      });
    });
  }
  return preProcessingData;
};
