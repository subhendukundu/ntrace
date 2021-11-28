import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";

function Animation({ animationName, width, loop = true }) {
  const [animationData, setAnimationData] = useState();

  useEffect(() => {
    fetch(`assets/lotties/${animationName}.json`).then(async (res) => {
      const data = await res.json();
      setAnimationData(data);
    });
  }, []);

  if (!animationData) return <div>Loading...</div>;
  return (
    <Lottie loop={loop} animationData={animationData} play style={{ width }} />
  );
}

export default Animation;
