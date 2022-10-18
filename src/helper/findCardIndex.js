function findCardIndex(id, array) {
  return array.findIndex((card) => card.id === id);
}
export default findCardIndex;
