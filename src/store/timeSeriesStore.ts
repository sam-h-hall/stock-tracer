import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type Time_Series_Data = {
  time_series: {
    [key: string]: {
      [key: string]: {
        open: string;
        close: string;
        high: string;
        low: string;
        volume: string;
      };
    };
  };
  symbol: string;
  meta: {
    symbol: string;
    currency: string;
    exchange: string;
    exchange_timezone: string;
    interval: string;
    mic_code: string;
    type: string;
  };
};
// | Time_Series_Data[]
export interface Time_Series_State {
  symbolLegend: string[];
  data: {
    [key: string]: TSD;
  };
  addSymbol: (symbolData: { [key: string]: TSD }) => void;
}

export const useTimeSeriesStore = create<Time_Series_State>()(
  devtools(
    persist(
      (set) => ({
        symbolLegend: [],
        data: {},
        addSymbol: (symbolData) =>
          set((state) => {
            console.log(symbolData);
            return {
              data: {
                ...state?.data,
                ...symbolData,
              },
            };
          }),
      }),
      {
        name: "ts-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

// we will create an array of TSBatches for pagenation
type TSBatch = {
  symbolLegend: string[];
  data: {
    [key: string]: TSD;
  };
};

export interface TSD {
  // symbolLegend: string[];
  symbol: string;
  dateLegend: string[];
  graphData: {
    // date string -> '2023-01-25'
    [key: string]: {
      times: (string | undefined)[];
      closing: (string | undefined)[];
    };
  };
  time_series: {
    // date string -> '2023-01-25'
    [key: string]: {
      // time string -> '15:55:00'
      [key: string]: {
        open: string;
        close: string;
        high: string;
        low: string;
        volume: string;
      };
    };
  };
  meta: {
    symbol: string;
    currency: string;
    exchange: string;
    exchange_timezone: string;
    interval: string;
    mic_code: string;
    type: string;
  };
}
