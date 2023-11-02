import { useEffect, useState } from "react";

const Timer = () => {
  const now = new Date();
  const twoMinutesLater = new Date(now.getTime() + 2 * 60 * 1000);
  const [timer, setTimer] = useState(
    localStorage.getItem("time")
      ? Number(localStorage.getItem("time"))
      : (twoMinutesLater.getTime() - now.getTime()) / 1000
  );
  const [pause, setPause] = useState(false);
  // const [pause, setPause] = useState(
  //   false || Boolean(localStorage.getItem("isStop"))
  // );
  const milliseconds = timer * 1000;
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
  const formattedTime = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");

  useEffect(() => {
    let tiktik =
      !pause &&
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    if (timer === 0) {
      clearTimeout(tiktik);
    }
    return () => {
      clearTimeout(tiktik);
    };
  }, [timer, pause]);

  return (
    <div>
      <span
        style={{
          color: pause ? "gray" : "green",
          marginRight: "20px",
        }}
      >
        {formattedTime}
      </span>
      <button
        onClick={() => {
          setPause(!pause);
          localStorage.setItem("time", JSON.stringify(timer));
        }}
        className="btn btn-danger"
      >
        {pause ? "Play" : "Pause"}
      </button>
    </div>
  );
};

export default Timer;
