import { createSlice } from "@reduxjs/toolkit";
import cardActions from "./actions";

import Dog from "../../img/dog.png";
import Cat from "../../img/cat.png";
import Pupet from "../../img/pupet.png";
import WaterCat from "../../img/water-cat.png";
import Cat2 from "../../img/cat-2.png";
import Waiter from "../../img/waiter.png";
import findCardIndex from "../../helper/findCardIndex";
import shuffleArray from "../../helper/shuffleArray";

const initialState = {
  cards: [
    { id: 1, value: "dog", src: Dog, isRight: null, isActive: false },
    { id: 2, value: "cat", src: Cat, isRight: null, isActive: false },
    { id: 3, value: "pupet", src: Pupet, isRight: null, isActive: false },
    {
      id: 4,
      value: "water-cat",
      src: WaterCat,
      isRight: null,
      isActive: false,
    },
    { id: 5, value: "cat2", src: Cat2, isRight: null, isActive: false },
    { id: 6, value: "waiter", src: Waiter, isRight: null, isActive: false },
    { id: 7, value: "dog", src: Dog, isRight: null, isActive: false },
    { id: 8, value: "cat", src: Cat, isRight: null, isActive: false },
    { id: 9, value: "pupet", src: Pupet, isRight: null, isActive: false },
    {
      id: 10,
      value: "water-cat",
      src: WaterCat,
      isRight: null,
      isActive: null,
    },
    { id: 11, value: "cat2", src: Cat2, isRight: null, isActive: null },
    { id: 12, value: "waiter", src: Waiter, isRight: null, isActive: null },
  ],
};

const cardReducer = createSlice({
  name: "cardReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cardActions.addActiveCard, (state, action) => {
        const index = findCardIndex(action.payload.cardId, state.cards);
        state.cards[index].isActive = true;
      })
      .addCase(cardActions.removeActiveCards, (state) => {
        state.cards = state.cards.map((card) => {
          return { ...card, isActive: false };
        });
      })
      .addCase(cardActions.removeWrongCards, (state) => {
        const newCards = state.cards.map((card) => {
          if (card.isRight === false) {
            return { ...card, isRight: null };
          }
          return card;
        });
        state.cards = newCards;
      })
      .addCase(cardActions.addRightCards, (state, action) => {
        const { firstCardId, secondCardId } = action.payload;
        const firstCardIndex = findCardIndex(firstCardId, state.cards);
        const secondCardIndex = findCardIndex(secondCardId, state.cards);
        state.cards[firstCardIndex].isRight = true;
        state.cards[secondCardIndex].isRight = true;
      })
      .addCase(cardActions.addWrongCards, (state, action) => {
        const { firstCardId, secondCardId } = action.payload;
        const firstCardIndex = findCardIndex(firstCardId, state.cards);
        const secondCardIndex = findCardIndex(secondCardId, state.cards);
        state.cards[firstCardIndex].isRight = false;
        state.cards[secondCardIndex].isRight = false;
      })
      .addCase(cardActions.playAgain, (state) => {
        let newCards = state.cards.map((card) => {
          return { ...card, isRight: null, isActive: false };
        });
        newCards = shuffleArray(newCards);
        state.cards = newCards;
      });
  },
});

export default cardReducer;
