import React from "react";

function formatTime(time: string) {
  const actualTime = new Date(time);
  const hours = actualTime.getHours();

  const minutes = actualTime.getMinutes();
  const timeSent = `${hours < 9 ? "0" + hours : hours}:${
    minutes < 9 ? "0" + minutes : minutes
  } `;

  return timeSent;
}

export default formatTime;
