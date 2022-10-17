import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Components/Card/Card";
import cardActions from "./redux/cards/actions";
import WinModal from "./Components/WinModal/WinModal";
import LoseModal from "./Components/LoseModal/LoseModal";
import shuffleArray from "./helper/shuffleArray";
import Timer from "./Components/Timer/Timer";

function App() {
  const { cards, activeCards, rightCards, wrongCards } = useSelector(
    (store) => store.cardReducer
  );
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);

  const dispatch = useDispatch();

  const cardClick = (cardIsRight, cardIsWrong, cardId) => {
    if (!isTimerStart) setIsTimerStart(true);
    if (!cardIsRight && !cardIsWrong) {
      if (activeCards.length === 2) {
        dispatch(cardActions.removeActiveCards());
      }
      dispatch(cardActions.addActiveCard(cardId));
      if (wrongCards.length) {
        dispatch(cardActions.removeWrongCards());
      }
    }
  };
  const playAgainHanlder = () => {
    setTimer(60);
    setIsWin(false);
    setIsLose(false);
    dispatch(cardActions.removeActiveCards());
    dispatch(cardActions.removeWrongCards());
    dispatch(cardActions.removeRightCards());
    const newOrderArray = shuffleArray([...cards]);
    dispatch(cardActions.setCardsNewOrder(newOrderArray));
  };

  useEffect(() => {
    if (activeCards.length === 2) {
      const firstCard = cards.find((card) => card.id === activeCards[0]);
      const secondCard = cards.find((card) => card.id === activeCards[1]);
      if (firstCard.value === secondCard.value) {
        dispatch(cardActions.addRightCards(firstCard.id, secondCard.id));
      } else {
        dispatch(cardActions.addWrongCards(firstCard.id, secondCard.id));
      }
    }
  }, [activeCards]);

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
    if (rightCards.length && rightCards.length === cards.length) {
      setIsWin(true);
      setIsTimerStart(false);
    }
  }, [rightCards]);

  useEffect(() => {
    if (!timer) {
      setIsTimerStart(false);
      setIsLose(true);
    }
  }, [timer]);
  useEffect(() => {
    const newOrderArray = shuffleArray([...cards]);
    dispatch(cardActions.setCardsNewOrder(newOrderArray));
  }, []);
  return (
    <div className="container-md">
      <div className="d-flex flex-column aling-items-center justify-content-center py-5">
        <p className="fs-4 text-center ff-bold">Memoji</p>
        <div className="py-3 container-gap">
          {cards.map((cardInfo) => {
            const isOpen = activeCards.find((id) => id === cardInfo.id);
            const isRight = rightCards.find((id) => id === cardInfo.id);
            const isWrong = wrongCards.find((id) => id === cardInfo.id);
            return (
              <Card
                id={cardInfo.id}
                value={cardInfo.value}
                src={cardInfo.src}
                isOpen={!!isOpen}
                isRight={!!isRight}
                isWrong={!!isWrong}
                cardClick={cardClick}
                key={`${cardInfo.value}${cardInfo.id}`}
              />
            );
          })}
        </div>
        <Timer timer={timer} />
        <WinModal show={isWin} handleClose={playAgainHanlder} />
        <LoseModal show={isLose} handleClose={playAgainHanlder} />
      </div>
    </div>
  );
}

export default App;
