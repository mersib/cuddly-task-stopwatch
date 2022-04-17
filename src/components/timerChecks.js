export function check20Seconds(time) {
  if (parseInt(time) <= 20) {
    return true;
  } else {
    return false;
  }
}

export function checkHalfPassed(time, totalTime) {
  if (parseInt(time) <= (parseInt(totalTime) * 60) / 2) {
    return true;
  } else {
    return false;
  }
}

export function checkIsBlinking(time) {
  if (parseInt(time) <= 10) {
    return true;
  } else {
    return false;
  }
}
