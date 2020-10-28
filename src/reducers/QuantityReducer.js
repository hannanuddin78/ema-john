import { getDatabaseCart } from "../utilities/databaseManager";

const item = getDatabaseCart();
console.log(item);
export const quantityState = {
  quantity: 1,
};

export const quantityReducer = (state, action) => {
  switch (action.type) {
    case "quantityIncrease":
      return { quantity: state.quantity + 1 };
    case "quantityDecrease":
      return { quantity: state.quantity - 1 };
    default:
      return state;
  }
};
