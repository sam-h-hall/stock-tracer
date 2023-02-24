import { SmallPreviewcard } from "../../components/smallPreviewCard";

export default function Layout({ children }: { children: React.ReactNode }) {
  const testData = [
    {
      symbol: "YGYI",
      name: "Youngevity International Inc",
      exchange: "NASDAQ",
      mic_code: "XNCM",
      datetime: "2022-09-16 12:01:00",
      last: 0.0523,
      high: 0.0523,
      low: 0.0523,
      volume: 1000,
      change: 0.0323,
      percent_change: 161.5,
    },
    {
      symbol: "FPAC",
      name: "Far Point Acquisition Corp",
      exchange: "NYSE",
      mic_code: "XNYS",
      datetime: "2022-09-19 15:59:59",
      last: 4.55,
      high: 9.89,
      low: 9.88,
      volume: 101500,
      change: 5.19,
      percent_change: 110.66098,
    },
    {
      symbol: "AACIW",
      name: "Armada Acquisition Corp. I",
      exchange: "NASDAQ",
      mic_code: "XNMS",
      datetime: "2022-09-19 13:21:22",
      last: 0.1279,
      high: 0.18,
      low: 0.1279,
      volume: 981,
      change: 0.0575,
      percent_change: 47.05401,
    },
    {
      symbol: "PAVMW",
      name: "PAVmed Inc.",
      exchange: "NASDAQ",
      mic_code: "XNCM",
      datetime: "2022-01-28 12:36:00",
      last: 0.029,
      high: 1.35,
      low: 0.02,
      volume: 32626,
      change: 0.0089,
      percent_change: 44.27861,
    },
  ];

  return (
    <div className="m-0 flex h-full flex-row">
      <div className="flex-grow">{children}</div>
      <div className="max-w-[40rem] border-l border-blue-800 bg-gray-800 p-2 text-center lg:w-[40rem] xl:w-[40rem] 2xl:w-[30rem]">
        <h3 className="pb-2 text-xl font-bold text-white">Market Movers</h3>
        {/*testData.map((testItem, idx) => (
          <SmallPreviewcard key={idx} previewData={testItem} />
        ))*/}
      </div>
    </div>
  );
}
