import React, { useEffect } from "react";
import Watch from "../components/watch";
import { Button } from "react-bootstrap";
import "../styles/watch.css";
function App() {
  const [startTimer, setStart] = React.useState(false);
  const [inputTime, setInputTime] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState(true);
  const handleStart = () => {
    if (errorMsg) {
    } else {
      setErrorMsg(false);
      setStart(true);
    }
  };

  return (
    <div>
      <div>
        <span>Coundown: </span>
        <input
          type="number"
          value={inputTime}
          placeholder="(Min)"
          max={59}
          min={0}
          onChange={(e) => {
            if (parseInt(e.target.value) > 59 || parseInt(e.target.value) < 1) {
              setErrorMsg(true);
            } else {
              setErrorMsg(false);
            }
            setInputTime(e.target.value);
          }}
        />
        <Button
          variant="primary"
          onClick={handleStart}
          size="lg"
          disabled={errorMsg}
        >
          Start
        </Button>
        {errorMsg && (
          <p className="danger">
            Error: Please enter a whole number between 1 and 59
          </p>
        )}
      </div>
      <Watch startTimer={startTimer} inputTime={inputTime} />
    </div>
  );
}

export default App;
