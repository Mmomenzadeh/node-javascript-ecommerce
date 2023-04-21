import { DELETE } from "Redux/Slices/CartShoppingSlice";
import { toast } from "react-toastify";

export const DeleteBasketItem = (productId , dispatch) => {
    dispatch(DELETE(productId));
    toast.success("با موفقیت از سبد خرید حذف شد")
}
