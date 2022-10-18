import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Components/Card/Card";
import cardActions from "./redux/cards/actions";
import Timer from "./Components/Timer/Timer";
import EndGameModal from "./Components/EndGameModal/EndGameModal";

function App() {
  const { cards } = useSelector((store) => store.cardReducer);
  const [activeCardsCount, setActiveCardsCount] = useState(0);
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isWin, setIsWin] = useState(null);
  const [isShowModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const cardClick = (isCardActive, isRight, cardId) => {
    if (!isTimerStart) setIsTimerStart(true);
    if (!isCardActive && isRight === null) {
      if (activeCardsCount === 2) {
        dispatch(cardActions.removeActiveCards());
        dispatch(cardActions.removeWrongCards());
      }
      dispatch(cardActions.addActiveCard(cardId));
    }
  };
  useEffect(() => {
    if (activeCardsCount + 1 === 2) {
      const [firstCard, secondCard] = cards.filter((card) => card.isActive);
      if (firstCard.value === secondCard.value) {
        dispatch(cardActions.addRightCards(firstCard.id, secondCard.id));
      } else {
        dispatch(cardActions.addWrongCards(firstCard.id, secondCard.id));
      }
    }
    const count = cards.filter((card) => card.isActive).length;
    setActiveCardsCount(count);
  }, [cards]);

  const playAgainHanlder = () => {
    setTimer(60);
    setIsWin(null);
    setActiveCardsCount(0);
    dispatch(cardActions.playAgain());
  };

  useEffect(() => {
    let interval = null;
    if (isTimerStart) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else clearInterval(interval);
    return () => clearInterval(interval);
  }, [isTimerStart]);

  useEffect(() => {
    const rightCards = cards.filter((card) => card.isRight);
    if (rightCards.length && rightCards.length === cards.length) {
      setIsWin(true);
      setIsTimerStart(false);
    }
  }, [cards]);

  useEffect(() => {
    if (!timer) {
      setIsTimerStart(false);
      setIsWin(false);
    }
  }, [timer]);

  useEffect(() => {
    if (isWin !== null) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isWin]);

  return (
    <div className="container-md">
      <div className="d-flex flex-column aling-items-center justify-content-center py-5">
        <p className="fs-4 text-center ff-bold">Memoji</p>
        <div className="py-3 container-gap">
          {cards.map((cardInfo) => {
            return (
              <Card
                id={cardInfo.id}
                value={cardInfo.value}
                src={cardInfo.src}
                isActive={cardInfo.isActive}
                isRight={cardInfo.isRight}
                cardClick={cardClick}
                key={`${cardInfo.value}${cardInfo.id}`}
              />
            );
          })}
        </div>
        <Timer timer={timer} />
        <EndGameModal
          show={isShowModal}
          handleClose={playAgainHanlder}
          isWin={isWin}
        />
      </div>
    </div>
  );
}

export default App;
