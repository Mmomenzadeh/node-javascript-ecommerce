import { Button, Input, TextEditor } from "Components";
import React, { useEffect, useState } from "react";
import { CgCloseR } from "react-icons/cg";
import { useForm } from "react-hook-form";
import "../../../Assets/Styles/Components/Modal/index.scss";
import { useDispatch } from "react-redux";
import { createProduct, fetchProducts } from "Redux/Slices/ProductSlice";
import { EditeProductService, UploadImg } from "API";
import { toast } from "react-toastify";

export const AddEditeProductModal = ({
  setShowProductModal,
  showProductModal,
}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  ///-----------------------------set data to the modal -----------------------------------------------
  const { data, type } = showProductModal;
  useEffect(() => {
    if (type === "edite") {
      reset(data);
    }
  }, [reset]);
  //-----------------------------createProduct and EditeProductService------------------------------------
  const onSubmit = async (data) => {
    if (type === "addProduct") {
      ////send request to endponit /upload and pick up filename from response
      const imgName = await UploadImg(Object.values(data.img));

      dispatch(
        createProduct({
          ...data,
          img: imgName,
          price: Number(data.price),
          quantity: Number(data.quantity),
          colors: [data.colors],
        })
      );
      setShowProductModal({ ...showProductModal, status: false });
    } else {
      const imgName = await UploadImg(Object.values(data.img));

      EditeProductService({
        ...data,
        img: imgName,
        price: Number(data.price),
        quantity: Number(data.quantity),
        colors: [data.colors],
      })
        .then(() => {
          toast.success("با موفقیت ویرایش شد");
        })
        .catch((err) => {
          toast.error("ویرایش نا موفق");
          console.log(err);
        })
        .finally(() => {
          dispatch(fetchProducts());
          setShowProductModal({ ...showProductModal, status: false });
        });
    }
  };

  ///---------------------------------------------------------------------------
  return (
    <div className="modal">
      <div className="background"></div>
      <form
        className="modalContainer scroll "
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="modalContainer__header">
          <p className="modalContainer__header__title">افزودن / ویرایش کالا</p>
          <CgCloseR
            onClick={() =>
              setShowProductModal({ ...showProductModal, status: false })
            }
            className="modalContainer__header__icon"
          />
        </div>
        <div className="line-h"></div>
        <div className="modalContainer__body flex col gap-2">
          <div className="modalContainer__body__imgProduct flex col gap-1">
            <label className="modalContainer__body__lbl">تصویر کالا :</label>
            <Input
              type="file"
              className="modal"
              accept=".jpg, .jpeg, .png"
              validate={{
                ...register("img", {
                  required: "وارد کردن عکس کالا الزامی ست ",
                }),
              }}
            />
            {errors.img && <p className="error">{errors.img.message}</p>}
          </div>
          <div className="modalContainer__body__nameProduct flex col gap-1">
            <label className="modalContainer__body__lbl"> نام کالا :</label>
            <Input
              type="text"
              holder="نام کالا را وارد کنید "
              className="modal"
              validate={{
                ...register("name", {
                  required: "وارد کردن نام کالا الزامی ست",
                  // minLength: 3,
                }),
              }}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          {/* Ename */}
          <div className="modalContainer__body__nameProduct flex col gap-1">
            <label className="modalContainer__body__lbl">
              {" "}
              نام کالا به لاتین :{" "}
            </label>
            <Input
              type="text"
              holder="نام کالا را وارد کنید "
              className="modal"
              validate={{
                ...register("EnName", {
                  required: "وارد کردن نام به حروف لاتین کالا الزامی ست",
                  // minLength: 3,
                }),
              }}
            />
            {errors.EnName && <p className="error">{errors.EnName.message}</p>}
          </div>
          <div className="flex gap-1">
            <div className="modalContainer__body__nameProduct flex col gap-1">
              <label className="modalContainer__body__lbl"> برند کالا :</label>
              <Input
                type="text"
                holder="برند کالا را وارد کنید "
                className="modal"
                validate={{
                  ...register("brand", {
                    required: "وارد کردن برند کالا الزامی ست",
                    // minLength: 3,
                  }),
                }}
              />
              {errors.brand && <p className="error">{errors.brand.message}</p>}
            </div>
            <div
              className="modalContainer__body__nameProduct flex col gap-1"
              style={{ width: "45rem" }}
            >
              <label className="modalContainer__body__lbl"> مدل کالا :</label>
              <Input
                type="text"
                holder="مدل کالا را وارد کنید "
                className="modal"
                validate={{
                  ...register("model", {
                    required: "وارد کردن مدل کالا الزامی ست",
                    // minLength: 3,
                  }),
                }}
              />
              {errors.model && <p className="error">{errors.model.message}</p>}
            </div>
          </div>

          <div className="flex j-sb">
            <div
              className="modalContainer__body__categoryProduct flex col gap-1"
              style={{ width: "13rem" }}
            >
              <label className="modalContainer__body__lbl"> دسته بندی : </label>
              <select
                className="modalContainer__body__categoryProduct__select"
                name="category"
                {...register("category", {
                  required: "یکی از گزیینه ها را انتخاب کنید",
                })}
              >
                <option value="">همه</option>
                <option value="1">موبایل</option>
                <option value="2">لپ تاپ </option>
                <option value="3">هدفون و هندزفری</option>
                <option value="4">کنسول بازی </option>
              </select>
              {errors.category && (
                <p className="error">{errors.category.message}</p>
              )}
            </div>
            <div
              className="modalContainer__body__categoryProduct flex col gap-1"
              style={{ width: "13rem" }}
            >
              <label className="modalContainer__body__lbl"> سابکتوری : </label>
              <select
                className="modalContainer__body__categoryProduct__select"
                name="subcategory"
                {...register("subcategory", {
                  required: "یکی از گزیینه ها را انتخاب کنید",
                })}
              >
                <option value="">همه</option>
                <option value="1">A series</option>
                <option value="2">IdeaPad series</option>
                <option value="3"> F9 series </option>
                <option value="4"> SERIES X </option>
              </select>
              {errors.subcategory && (
                <p className="error">{errors.subcategory.message}</p>
              )}
            </div>
            <div
              className="modalContainer__body__nameProduct flex col gap-1"
              style={{ width: "13rem" }}
            >
              <label className="modalContainer__body__lbl"> قیمت کالا :</label>
              <Input
                type="number"
                holder="0 "
                className="modal"
                validate={{
                  ...register("price", {
                    required: "وارد کردن قیمت کالا الزامی ست",
                    // minLength: 3,
                  }),
                }}
              />
              {errors.price && <p className="error">{errors.price.message}</p>}
            </div>
            <div
              className="modalContainer__body__nameProduct flex col gap-1"
              style={{ width: "13rem" }}
            >
              <label className="modalContainer__body__lbl">
                {" "}
                موجودی کالا :
              </label>
              <Input
                type="number"
                holder=" 0 "
                className="modal"
                validate={{
                  ...register("quantity", {
                    required: "وارد کردن موجودی کالا الزامی ست",
                    // minLength: 3,
                  }),
                }}
              />
              {errors.quantity && (
                <p className="error">{errors.quantity.message}</p>
              )}
            </div>
          </div>
          {/* part two */}
          <div className="flex j-sb">
            <div
              className="modalContainer__body__categoryProduct flex col gap-1"
              style={{ width: "13rem" }}
            >
              <label className="modalContainer__body__lbl"> سایز کالا : </label>
              <Input
                type="text"
                holder=" "
                className="modal"
                validate={{
                  ...register("size", {
                    required: "وارد کردن  سایز کالا الزامی ست",
                    // minLength: 3,
                  }),
                }}
              />
              {errors.size && <p className="error">{errors.size.message}</p>}
            </div>
            <div
              className="modalContainer__body__categoryProduct flex col gap-1"
              style={{ width: "13rem" }}
            >
              <label className="modalContainer__body__lbl">
                {" "}
                سیستم عامل :{" "}
              </label>
              <Input
                type="text"
                holder=" "
                className="modal"
                validate={{
                  ...register("os", {
                    required: "وارد کردن سیتم عامل کالا الزامی ست",
                    // minLength: 3,
                  }),
                }}
              />
              {errors.os && <p className="error">{errors.os.message}</p>}
            </div>
            <div
              className="modalContainer__body__nameProduct flex col gap-1"
              style={{ width: "13rem" }}
            >
              <label className="modalContainer__body__lbl"> رنگ کالا :</label>
              <Input
                type="text"
                holder=" "
                className="modal"
                validate={{
                  ...register("colors", {
                    required: "وارد کردن رنگ کالا الزامی ست",
                    // minLength: 3,
                  }),
                }}
              />
              {errors.colors && (
                <p className="error">{errors.colors.message}</p>
              )}
            </div>
            <div
              className="modalContainer__body__nameProduct flex col gap-1"
              style={{ width: "13rem" }}
            >
              <label className="modalContainer__body__lbl"> صحفه نمایش :</label>
              <Input
                type="text"
                holder=" "
                className="modal"
                validate={{
                  ...register("display", {
                    required: "وارد کردن صحفه نمایش  الزامی ست",
                    // minLength: 3,
                  }),
                }}
              />
              {errors.display && (
                <p className="error">{errors.display.message}</p>
              )}
            </div>
          </div>
          {/* part three */}
          <div className="flex  gap-20">
            <div
              className="modalContainer__body__nameProduct flex col gap-1 "
              style={{ width: "13rem" }}
            >
              <label className="modalContainer__body__lbl">
                {" "}
                گارانتی کالا :
              </label>
              <Input
                type="text"
                holder=" "
                className="modal"
                inpType="medium"
                validate={{
                  ...register("guarantee", {
                    required: "وارد کردن گرانتی کالا الزامی ست",
                    // minLength: 3,
                  }),
                }}
              />
              {errors.guarantee && (
                <p className="error">{errors.guarantee.message}</p>
              )}
            </div>
            <div
              className="modalContainer__body__nameProduct flex col gap-1"
              style={{ width: "13rem" }}
            >
              <label className="modalContainer__body__lbl"> : Resolution</label>
              <Input
                type="text"
                holder=" "
                className="modal"
                inpType="medium"
                validate={{
                  ...register("resolution", {
                    required: "وارد کردن resolution   الزامی ست",
                    // minLength: 3,
                  }),
                }}
              />
              {errors.resolution && (
                <p className="error">{errors.resolution.message}</p>
              )}
            </div>
          </div>
          <div className="modalContainer__body__descProduct flex col gap-1">
            <label className="modalContainer__body__lbl">توضیحات : </label>

            <textarea
              style={{ width: "62rem" }}
              className="txtArea"
              rows="8"
              cols="50"
              placeholder="توضیحات خود را وارد نمایید "
              {...register("description", {
                required: "وارد کردن توضیحات الزامی است",
              })}
            ></textarea>
            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}
          </div>
        </div>
        <div className="modalContainer__footer">
          <Button type="modalBtn" size="full">
            ذخیره
          </Button>
        </div>
      </form>
    </div>
  );
};
