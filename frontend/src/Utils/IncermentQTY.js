import { INCERMENT } from "Redux/Slices/CartShoppingSlice";

export const IncermentQTY = (product , dispatch) => {
  dispatch(INCERMENT(product));
};
