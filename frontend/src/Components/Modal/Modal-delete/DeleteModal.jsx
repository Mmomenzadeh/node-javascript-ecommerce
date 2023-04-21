import { DeleteProduct } from "API";
import { Button } from "Components";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchProducts } from "Redux/Slices/ProductSlice";

export const DeleteModal = ({ setShowDeleteModal, showDeleteModal }) => {
  const { id } = showDeleteModal;
  const dispatch = useDispatch();
  const handleDeleteBtn = () => {
    DeleteProduct(id)
      .then(() => {
          toast.success("با موفقیت حذف شد ")
      })
      .catch((err) => {
        toast.error("حذف ناموفق")
        console.log(err);
      })
      .finally(() => {
        dispatch(fetchProducts());
        setShowDeleteModal({ ...showDeleteModal, status: false });
      });
  };

  return (
    <div className="deleteModal">
      <div className="deleteModal__Background"></div>
      <div className="deleteModal__Container">
        <div className="deleteModal__Container__header">
          <p className="deleteModal__Container__header__title">تایید حذف</p>
          <AiOutlineCloseCircle
            onClick={() =>
              setShowDeleteModal({ ...showDeleteModal, status: false })
            }
            className="deleteModal__Container__header__icon"
          />
        </div>
        <div className="deleteModal__Container__body">
          <p className="deleteModal__Container__body__txt">
            ایا از حذف این محصول مطمن هستید؟
          </p>
        </div>
        <div className="deleteModal__Container__footer">
          <Button type="deleteModalBtn" color="red" onClick={()=>handleDeleteBtn(id)}>
            بله , حذف شود
          </Button>
          <Button
            type="deleteModalBtn"
            color="green"
            onClick={() =>
              setShowDeleteModal({ ...showDeleteModal, status: false })
            }
          >
            لغو
          </Button>
        </div>
      </div>
    </div>
  );
};
