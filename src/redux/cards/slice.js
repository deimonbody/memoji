import { createSlice } from "@reduxjs/toolkit";
import cardActions from "./actions";

import Dog from "../../img/dog.png";
import Cat from "../../img/cat.png";
import Pupet from "../../img/pupet.png";
import WaterCat from "../../img/water-cat.png";
import Cat2 from "../../img/cat-2.png";
import Waiter from "../../img/waiter.png";

const initialState = {
  cards: [
    { id: 1, value: "dog", src: Dog },
    { id: 2, value: "cat", src: Cat },
    { id: 3, value: "pupet", src: Pupet },
    { id: 4, value: "water-cat", src: WaterCat },
    { id: 5, value: "cat2", src: Cat2 },
    { id: 6, value: "waiter", src: Waiter },
    { id: 7, value: "dog", src: Dog },
    { id: 8, value: "cat", src: Cat },
    { id: 9, value: "pupet", src: Pupet },
    { id: 10, value: "water-cat", src: WaterCat },
    { id: 11, value: "cat2", src: Cat2 },
    { id: 12, value: "waiter", src: Waiter },
  ],
  activeCards: [],
  rightCards: [],
  wrongCards: [],
};

const cardReducer = createSlice({
  name: "cardReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cardActions.addActiveCard, (state, action) => {
        state.activeCards.push(action.payload.cardId);
      })
      .addCase(cardActions.removeActiveCards, (state) => {
        state.activeCards = [];
      })
      .addCase(cardActions.removeWrongCards, (state) => {
        state.wrongCards = [];
      })
      .addCase(cardActions.addRightCards, (state, action) => {
        const { firstCardId, secondCardId } = action.payload;
        state.rightCards.push(firstCardId);
        state.rightCards.push(secondCardId);
      })
      .addCase(cardActions.addWrongCards, (state, action) => {
        const { firstCardId, secondCardId } = action.payload;
        state.wrongCards.push(firstCardId);
        state.wrongCards.push(secondCardId);
      })
      .addCase(cardActions.removeRightCards, (state) => {
        state.rightCards = [];
      })
      .addCase(cardActions.setCardsNewOrder, (state, action) => {
        state.cards = action.payload.newOrder;
      });
  },
});

export default cardReducer;
