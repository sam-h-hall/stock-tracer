"use client";

import { useRef } from "react";
import {
  Time_Series_State,
  useTimeSeriesStore,
} from "../store/timeSeriesStore";

const StoreInitializer = ({
  initialStore,
}: {
  initialStore: Partial<Time_Series_State>;
}) => {
  const initialized = useRef(false);
  if (!initialized.current) {
    useTimeSeriesStore.setState(initialStore);
    initialized.current = true;
  }
  return null;
};

export default StoreInitializer;
