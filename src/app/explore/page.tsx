import { StockCard } from "../../components/stockCard";
// import { useSpring, animated } from "@react-spring/web";
// import { data as stockData } from "./data.js";
import {
  AttributeValue,
  BatchGetItemCommand,
  DynamoDBClient /*, GetItemCommand, QueryCommand */,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  Time_Series_Data,
  Time_Series_State,
  useTimeSeriesStore,
} from "../../store/timeSeriesStore";
import { processTimeSeries } from "../../utils/processTimeSeries";
import StoreInitializer from "../../components/storeInitializer";

const establishConnection = async (
  tableName: string,
  keys: string[] | Record<string, AttributeValue>[] | undefined,
  projectionExpression?: string,
  expressionAttributeNames?: Record<string, string>,
  existingState?: Record<string, AttributeValue>[]
): Promise<Time_Series_Data[] | null> => {
  const client = new DynamoDBClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY ?? "",
      secretAccessKey: process.env.AWS_SECRET_KEY ?? "",
    },
    region: "us-east-1",
  });

  const marshalledKeys = keys?.map(
    (
      key: string | Record<string, AttributeValue>
    ): Record<string, AttributeValue> => marshall({ symbol: key })
  );

  const command = new BatchGetItemCommand({
    RequestItems: {
      "test-table-sam": {
        Keys: marshalledKeys,
        ProjectionExpression: projectionExpression,
        ExpressionAttributeNames: expressionAttributeNames, // FilterExpression: "#ts.#date",
      },
    },
  });

  try {
    const response = await client.send(command);
    const {
      UnprocessedKeys,
      Responses,
      ["$metadata"]: { httpStatusCode },
    } = response;

    if (httpStatusCode == 200 && Responses && Responses[tableName]) {
      let newData = Responses[tableName] || null;
      if (existingState && newData) {
        Responses[tableName] = [
          ...existingState,
          ...newData.map((item: Record<string, AttributeValue>) => item),
        ];
      }

      if (UnprocessedKeys && tableName in UnprocessedKeys) {
        // const unprocessedKeys = UnprocessedKeys[tableName];
        const unprocessedKeys = UnprocessedKeys[tableName] || undefined;
        return establishConnection(
          tableName,
          // unprocessedKeys?.Keys?.map((key) => unmarshall(key?.symbol?.S)),
          unprocessedKeys?.Keys?.map((key) => unmarshall(key).symbol),
          unprocessedKeys?.ProjectionExpression,
          unprocessedKeys?.ExpressionAttributeNames,
          Responses[tableName]
        );
      }

      if (
        Responses[tableName] === undefined ||
        (Responses?.[tableName]?.length ?? 0) < 1
      ) {
        console.log("Requested table not found or no data available");
        return null;
      }

      const newTable =
        Responses?.[tableName]?.map((data) => {
          return unmarshall(data) as Time_Series_Data;
        }) ?? [];

      return newTable ?? null;
    } else {
      return null;
    }
    // return data_set
  } catch (err) {
    console.log("Failed to get data: ", err);
    return null;
  }
};

const Explore = async () => {
  // const [buttonAni] = use(useSpring(() => ({
  //   from: { x: -1000 },
  //   to: { x: 0 },
  // })));

  const expressionAttributeNames = {
    "#ts": "time_series",
    "#date": "2023-01-25",
  };
  const projectionExpression = "symbol, meta, #ts.#date";
  const keys = [
    "NVDA",
    "TSLA",
    "WMT",
    "AMZN",
    "GOOGL",
    "NKE",
    "AAPL",
    "GME",
    "AAL",
    "MSFT",
  ];

  const tableName = "test-table-sam";

  const response = await establishConnection(
    tableName,
    keys,
    projectionExpression,
    expressionAttributeNames
  );

  if (response === null) {
    return <div>Error getting data</div>;
  }

  const processedData: Partial<Time_Series_State> | null =
    processTimeSeries(response);
  if (processedData === null) {
    return "Error";
  } else {
    useTimeSeriesStore.setState(processedData);
  }
  // useTimeSeriesStore.getState().addSymbol(response);
  const tsData = useTimeSeriesStore.getState().data;
  const { data } = processedData;

  return (
    <div
      // <animated.div
      // style={buttonAni}
      className="xl z-0 flex h-full min-h-screen w-full flex-wrap justify-center"
    >
      <StoreInitializer initialStore={processedData} />
      {processedData?.symbolLegend?.map(
        (key) =>
          data?.[key] && (
            <div className="mt-6 mr-4 ml-4" key={key}>
              <StockCard previewInfo={data[key]} symbol={key} />
            </div>
          )
      )}
    </div>
  );
};

export default Explore;
