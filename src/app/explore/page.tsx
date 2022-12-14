"use client";
import { StockCard } from "../../components/stockCard";
import { useSpring, animated } from "@react-spring/web";
import { data as stockData } from "./data.js";
import { useEffect, useState } from "react";

const Explore: React.FC = () => {
  const [buttonAni] = useSpring(() => ({
    from: { x: -1000 },
    to: { x: 0 },
  }));
  const [blah, setBlah] = useState<any>();

  return (
    <animated.div
      style={buttonAni}
      className="xl z-0 flex h-full min-h-screen w-full flex-wrap justify-center"
    >
      {stockData.map((stock, idx) => (
        <div className="mt-6 mr-4 ml-4" key={idx}>
          <StockCard {...stock} volume={blah} />
        </div>
      ))}
    </animated.div>
  );
};

export default Explore;
