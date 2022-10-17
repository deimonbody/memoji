import React from "react";
import PropTypes from "prop-types";

function Card({ id, src, isOpen, isRight, isWrong, cardClick, value }) {
  const clickHanlder = () => {
    cardClick(isRight, isWrong, id);
  };
  return (
    <div
      className={`${isOpen || isRight ? "card-open" : "card-closed"} ${
        isRight ? "card-right" : ""
      } ${isWrong ? "card-wrong" : ""} custom-card `}
      onClick={clickHanlder}
    >
      <div className="w-100 h-100">
        <img
          className={`${isOpen || isRight ? "" : "d-none"}`}
          src={src}
          alt={value}
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isWrong: PropTypes.bool.isRequired,
  isRight: PropTypes.bool.isRequired,
  cardClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default Card;
