import React, { useState, useEffect } from "react";

function countSeconds() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const TimerInt =
      counter >= 0 &&
      setInterval(() => {
        setCounter((time) => time + 1);
      }, 1000);
    return () => {
      clearInterval(TimerInt);
    };
  }, [counter]);

  return (
    <div className="Counter">
      <div>You have used {counter} seconds on this website</div>
    </div>
  );
}

export default countSeconds;
