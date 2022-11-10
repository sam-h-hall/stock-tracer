"use client";
import { NextPage } from "next";
import { StockCard } from "../../components/stockCard";
import { useSpring, animated } from "@react-spring/web";
import Link from "next/link";
import { data as stockData } from "./data.js";

const Explore: NextPage = () => {
  const [buttonAni] = useSpring(() => ({
    from: { x: -1000 },
    to: { x: 0 },
  }));

  return (
    <animated.div
      style={buttonAni}
      className="xl z-0 flex h-full min-h-screen w-full flex-wrap justify-center"
    >
      {stockData.map((stock, idx) => (
        <div className="mt-6 mr-4 ml-4" key={idx}>
          <Link href={`/${stock.meta.symbol}`}>
            <StockCard {...stock} />
          </Link>
        </div>
      ))}
    </animated.div>
  );
};

export default Explore;
