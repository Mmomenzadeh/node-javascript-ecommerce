import { ADD } from "Redux/Slices/CartShoppingSlice";
import { toast } from "react-toastify";

export const AddToBasket = (product, dispatch) => {
  dispatch(ADD(product));
  
  toast.success("محصول با موفقیت به سبد خرید افزوده شد ");
};
