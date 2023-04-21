import { Button, Input, Table } from "Components";
import { BsPlusSquare } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../Assets/Styles/Pages/ManagementPanle/index.scss";
import { fetchFilterData, fetchProducts } from "Redux/Slices/ProductSlice";
import { fetchProductCategory } from "Redux/Slices/ProductCategorySlice";
import { BASE_URL } from "Config";
import ReactPaginate from "react-paginate";
import { fetchSubCategory } from "Redux/Slices/SubCategorySlice";
import { AddEditeProductModal, DeleteModal } from "Components/Modal";
import { useForm } from "react-hook-form";
import { SearchDataHandler } from "Utils";

export const ManagementPanleProducts = () => {
  const [showProductModal, setShowProductModal] = useState({
    status: false,
    data: {},
    type: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState({
    status: false,
    id: "",
  });
  ////------------------------------------------------------------------------------------------
  const [filterParams, setFilterParams] = useState("");
  const { productData } = useSelector((state) => state.products);
  const { categoryData } = useSelector((state) => state.category);
  const { subcategoryData } = useSelector((state) => state.subCategory);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductCategory());
    dispatch(fetchSubCategory());

  

  }, [dispatch ]);

  // --------------------------------------------------------------------------------------------------------

  //// بجایی ایتم جوابی که از سمت سرور گرفتیم میزاریم
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 7;
  const currentItems = productData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productData.length / 7);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 7) % productData.length;
    setItemOffset(newOffset);
  };
  ///----------------------------------------------------------------------------------------------

  const handleAddProduct = () => {
    setShowProductModal({
      ...showProductModal,
      status: true,
      type: "addProduct",
    });
  };

  const handleEditeProduct = (data) => {
    setShowProductModal({ status: true, data, type: "edite" });
  };

  const handleDeleteProduct = (id) => {
    setShowDeleteModal({ status: true, id });
  };

  

  return (
    <div className="managementPanle">
      <div className="flex col">
        <div className="managementPanle__table-header">
          <div className="flex gap-2">
            <div className="flex gap-1 a-c">
              <label className="managementPanle__table-header__label">
                جستجو :{" "}
              </label>
              <Input
                type="search"
                holder={`${productData.length} رکورد ....`}
                inpType="searchBoxAdmin"
                onChange={(e) => SearchDataHandler(e.target.value , dispatch )}
              />
            </div>
            <div className="flex gap-1 a-c">
              <label className="managementPanle__table-header__label">
                {" "}
                دسته بندی :
              </label>
              <select
                className="managementPanle__table-header__select "
                name="category"
                value={filterParams}
                onChange={(e) => {
                  if (e.target.value) {
                    dispatch(
                      fetchFilterData(`products?category=${e.target.value}`)
                    );
                    setFilterParams(e.target.value);
                  } else {
                    dispatch(fetchFilterData(`products`));
                    setFilterParams(e.target.value);
                  }
                }}
              >
                <option value="">همه </option>
                <option value="1">موبایل </option>
                <option value="2">لپ تاپ </option>
                <option value="3">هدفون </option>
                <option value="4">کنسول بازی </option>
              </select>
            </div>
          </div>

          <BsPlusSquare
            onClick={handleAddProduct}
            className="managementPanle__table-header__icon"
          />
        </div>
        <Table className="adminTabel">
          <thead className="adminTabel__thead">
            <tr className="adminTabel__thead__tr">
              <th className="adminTabel__thead__tr__td">نام کالا</th>
              <th className="adminTabel__thead__tr__td">دسته بندی </th>
              <th className="adminTabel__thead__tr__td">ویرایش</th>
              <th className="adminTabel__thead__tr__td">حذف</th>
            </tr>
          </thead>
          <tbody>
            {/* میگذاریم currentItems بجایی دیتایی که از سمت سرور میگریم و میخوایم مپ بزنیم  */}
            {currentItems.map((data, index) => {
              // debugger

              // const categoryName = categoryData.find(item => item.id == data.category);
              // const subCategoryName = subcategoryData.find(item => item.id == data.subcategory);

              let categoryName;
              categoryData.forEach((item) => {
                if (item.id == data.category) {
                  categoryName = item.name;
                }
              });

              let subCategoryName;
              subcategoryData.forEach((item) => {
                if (item.id == data.subcategory) {
                  subCategoryName = item.name;
                }
              });

              // const categoryName = categoryData.map((item) => {
              //   if (item.id == data.category) {
              //     return item.name;
              //   }
              // });

              // const subCategoryName = subcategoryData.map((item) => {
              //   if (item.id == data.subcategory) {
              //     return item.name;
              //   }
              // });

              return (
                <tr key={data.id} className="adminTabel__tbody__tr">
                  <td
                    style={{ width: "55rem" }}
                    className="adminTabel__tbody__tr__td td-productName"
                  >
                    <div className="td-productName__img-container ">
                      <img
                        className="td-productName__img"
                        src={`${BASE_URL}/files/${data.img[0]}`}
                        alt={data.name}
                      />
                    </div>
                    <div className="flex col gap-1">
                      <p className="td-productName__title">
                        {data.name.length > 30
                          ? data.name.substring(0, 35) + " ..."
                          : data.name}
                      </p>
                      <span className="td-productName__model">
                        {data.model.length > 25
                          ? data.model.substring(0, 25) + " ..."
                          : data.model}
                      </span>
                    </div>
                  </td>

                  <td
                    style={{ width: "45rem" }}
                    className="adminTabel__tbody__tr__td"
                  >
                    {categoryName +
                      " / " +
                      subCategoryName +
                      " / " +
                      data.brand}
                  </td>
                  <td
                    style={{ width: "10rem" }}
                    className="adminTabel__tbody__tr__td"
                  >
                    <Button
                      type="table-btn"
                      outline="outline-blue"
                      onClick={() => handleEditeProduct(data)}
                    >
                      ویرایش
                    </Button>
                  </td>
                  <td
                    style={{ width: "10rem" }}
                    className="adminTabel__tbody__tr__td"
                  >
                    <Button
                      type="table-btn"
                      outline="outline-red"
                      onClick={() => handleDeleteProduct(data.id)}
                    >
                      حذف
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {showProductModal.status ? (
          <AddEditeProductModal
            setShowProductModal={setShowProductModal}
            showProductModal={showProductModal}
          />
        ) : showDeleteModal.status ? (
          <DeleteModal
            setShowDeleteModal={setShowDeleteModal}
            showDeleteModal={showDeleteModal}
          />
        ) : null}

        <ReactPaginate
          breakLabel="..."
          nextLabel=" < next "
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="previous > "
          renderOnZeroPageCount={null}
          className="pagination flex gap-5 mt-5 j-c a-c"
          activeClassName="activePage"
        />
      </div>
    </div>
  );
};
