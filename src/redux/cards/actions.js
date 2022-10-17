import { createAction } from "@reduxjs/toolkit";

const addActiveCardAction = "add-active-card";
const addRightCardsAction = "add-right-cards";
const addWrongCardsAction = "add-wrong-cards";
const removeActiveCardsAction = "remove-active-cards";
const removeWrongCardsAction = "remove-wrong-cards";
const removeRightCardsAction = "remove-right-cards";
const setCardsNewOrderAction = "set-cards-new-order";

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
const removeRightCards = createAction(removeRightCardsAction);
const setCardsNewOrder = createAction(setCardsNewOrderAction, (newOrder) => {
  return {
    payload: {
      newOrder,
    },
  };
});

export default {
  addActiveCard,
  addRightCards,
  addWrongCards,
  removeActiveCards,
  removeWrongCards,
  removeRightCards,
  setCardsNewOrder,
};
