import React, { useEffect, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

function SpeedSelector(props) {
  const [watchSpeed, setWatchSpeed] = useState(1000);
  const speedValues = [
    { name: "1x", value: 1000 },
    { name: "1.5x", value: 750 },
    { name: "2x", value: 500 },
  ];

  useEffect(() => {
    props.handleSpeedChange(watchSpeed);
  }, [watchSpeed]);
  return (
    <div>
      <ButtonGroup className="mb-2">
        {speedValues.map((speed, idx) => (
          <ToggleButton
            key={idx}
            id={`speed-${idx}`}
            type="radio"
            variant={"outline-primary"}
            name="speed"
            value={speed.value}
            checked={watchSpeed === speed.value}
            onChange={(e) => {
              setWatchSpeed(e.currentTarget.value);
            }}
          >
            {speed.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default SpeedSelector;
