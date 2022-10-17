import React from "react";
import PropTypes from "prop-types";

function Timer({ timer }) {
  return (
    <p className="fs-4 text-center ff-bold">
      {timer === 60 ? "01:00" : `00:${timer < 10 ? `0${timer}` : timer}`}
    </p>
  );
}
Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};
export default Timer;
