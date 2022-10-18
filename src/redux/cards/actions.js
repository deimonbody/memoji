import { createAction } from "@reduxjs/toolkit";

const addActiveCardAction = "add-active-card";
const addRightCardsAction = "add-right-cards";
const addWrongCardsAction = "add-wrong-cards";
const removeActiveCardsAction = "remove-active-cards";
const removeWrongCardsAction = "remove-wrong-cards";
const playAgainAction = "play-again";
const addActiveCard = createAction(addActiveCardAction, (id) => {
  return {
    payload: {
      cardId: id,
    },
  };
});

const addRightCards = createAction(
  addRightCardsAction,
  (firstCardId, secondCardId) => {
    return {
      payload: {
        firstCardId,
        secondCardId,
      },
    };
  }
);

const addWrongCards = createAction(
  addWrongCardsAction,
  (firstCardId, secondCardId) => {
    return {
      payload: {
        firstCardId,
        secondCardId,
      },
    };
  }
);

const removeActiveCards = createAction(removeActiveCardsAction);
const removeWrongCards = createAction(removeWrongCardsAction);
const playAgain = createAction(playAgainAction);

export default {
  addActiveCard,
  addRightCards,
  addWrongCards,
  removeActiveCards,
  removeWrongCards,
  playAgain,
};
