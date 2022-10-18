import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Card({ id, src, isActive, isRight, cardClick, value }) {
  const clickHanlder = () => {
    cardClick(isActive, isRight, id);
  };
  const containerClassName = classNames("custom-card", {
    "card-open": isActive || isRight,
    "card-closed": !isActive,
    "card-right": isRight,
    "card-wrong": isRight === false,
  });
  const imgClassName = classNames({
    "d-none": !isActive && !isRight,
  });
  return (
    <div className={containerClassName} onClick={clickHanlder}>
      <div className="w-100 h-100">
        <img className={imgClassName} src={src} alt={value} />
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  src: PropTypes.string,
  isActive: PropTypes.bool,
  isRight: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])]),
  cardClick: PropTypes.func,
  value: PropTypes.string,
};
export default Card;
