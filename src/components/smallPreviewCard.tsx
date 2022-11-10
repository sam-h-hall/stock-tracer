export const SmallPreviewcard = ({
  previewData,
}: {
  previewData: {
    symbol: string;
    name: string;
    exchange: string;
    mic_code: string;
    datetime: string;
    last: number;
    high: number;
    low: number;
    volume: number;
    change: number;
    percent_change: number;
  };
}) => {
  return (
    <div
      key={previewData.symbol}
      className="mb-4 rounded-md border border-blue-800 p-2 text-white"
    >
      <div className="flex flex-row items-center">
        <div className="text-md font-bold">{previewData.name}</div>
        <span className="mr-2 ml-2">-</span>
        <div>({previewData.symbol})</div>
      </div>

      <div className="flex flex-row">
        <div className="ml-4 mr-0 flex w-48 flex-col text-left">
          <div>Price: {Math.round(previewData.last * 100) / 100}</div>

          <div>
            Increase: {Math.round(previewData.percent_change * 100) / 100}%
          </div>
        </div>

        <div className="flex flex-col text-left">
          <div>H: {Math.round(previewData.high * 100) / 100}</div>
          <div>L: {Math.round(previewData.low * 100) / 100}</div>
        </div>
      </div>
    </div>
  );
};
