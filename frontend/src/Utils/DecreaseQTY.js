import { DECREASE } from "Redux/Slices/CartShoppingSlice";

export const DecreaseQTY = (  product , dispatch) => {
    dispatch(DECREASE(product));

}
