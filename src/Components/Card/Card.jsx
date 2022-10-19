import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Card({ id, src, isActive, isRight, cardClick, value }) {
  const cardInner = useRef(null);

  useEffect(() => {
    if (isActive || isRight) {
      cardInner.current.classList.add("card-animation-open");
    } else {
      cardInner.current.classList.remove("card-animation-open");
    }
  }, [isActive, isRight]);

  const clickHanlder = () => {
    cardClick(isActive, isRight, id);
  };
  const cardBackClassName = classNames("card-back", {
    "card-right": isRight,
    "card-wrong": isRight === false,
  });
  return (
    <div className="custom-card" onClick={clickHanlder}>
      <div className="card-inner" ref={cardInner}>
        <div className={cardBackClassName}>
          <img src={src} alt={value} />
        </div>
        <div className="card-front" />
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
