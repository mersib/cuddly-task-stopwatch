import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import SpeedSelector from "./speedSelector";
import {
  checkIsBlinking,
  checkHalfPassed,
  check20Seconds,
} from "./timerChecks";
function Watch(props) {
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isEnding, setIsEnding] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [halfPassed, setHalfPassed] = useState(false);
  const [isBLinking, setIsBlinking] = useState(false);
  const [togglePlay, setTogglePlay] = useState(false);
  const [watchSpeed, setWatchSpeed] = useState(1000);
  let interval;
  useEffect(() => {
    // Timer starts based on interval running every specific time starting from the input value till it reaches 0. Decrementing it every second of the interval
    // watchspeed determines the interval time

    if (togglePlay) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, watchSpeed);
    } else if (!togglePlay) {
      clearInterval(interval);
    }
    return () => {
      //Reset
      setHasEnded(false);
      setIsBlinking(false);
      setHalfPassed(false);
      setIsEnding(false);
      clearInterval(interval);
    };
  }, [togglePlay, watchSpeed]);

  //Setting data from props
  useEffect(() => {
    // Condition to render time only when props have a proper input value else timer starts at 0
    setTime(parseInt(props.inputTime) ? parseInt(props.inputTime) * 60 : 0);
    // Toggle timer to start or stop based on the button click in parent
    setTogglePlay(props.startTimer);
    setTotalTime(props.inputTime);
  }, [props.inputTime, props.startTimer]);

  // Use Effect to checks on timer
  useEffect(() => {
    if (time === 0) {
      clearInterval(interval);
      setHasEnded(true);
      console.log(time);
    }
    setIsEnding(check20Seconds(time));
    setIsBlinking(checkIsBlinking(time));
    setHalfPassed(checkHalfPassed(time, totalTime));
    console.log(isEnding, isBLinking, halfPassed);
  }, [time]);

  useEffect(() => {
    // Condition to render time only when props have a proper input value else timer starts at 0
    setTime(parseInt(props.inputTime) ? parseInt(props.inputTime) * 60 : 0);
    // Toggle timer to start or stop based on the button click in parent
    setTogglePlay(props.startTimer);
    setTotalTime(props.inputTime);
  }, [props.inputTime, props.startTimer]);

  // Use Effect to checks on timer
  useEffect(() => {
    console.log(hasEnded);
  }, [hasEnded]);

  const handleSpeedChange = (e) => {
    console.log(e);
    setWatchSpeed(e);
  };
  return (
    <div>
      <div>
        {halfPassed && !hasEnded && (
          <p className="warningText">More than halfway there!</p>
        )}
        {!hasEnded ? (
          <span
            className={`timeValue ${isEnding ? "danger" : ""} ${
              isBLinking ? "blink" : ""
            } `}
          >
            {("0" + (Math.floor(time / 60) % 60)).slice(-2)}:
            {("0" + Math.floor(time % 60)).slice(-2)}
          </span>
        ) : (
          <span className="timeValue">Time's up</span>
        )}
        <span>
          <FontAwesomeIcon
            icon={togglePlay ? faPauseCircle : faPlayCircle}
            size="2x"
            className="playPauseBtn"
            onClick={() => setTogglePlay(!togglePlay)}
          />
        </span>
        <SpeedSelector handleSpeedChange={handleSpeedChange} />
      </div>
    </div>
  );
}

export default Watch;
