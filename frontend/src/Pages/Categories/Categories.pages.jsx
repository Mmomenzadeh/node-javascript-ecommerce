import { BannerHorizontal, CategorasMenu, ProductsList } from "Components";
import { Footer, Header } from "Layouts";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductCategory } from "Redux/Slices/ProductCategorySlice";
import { fetchFilterData } from "Redux/Slices/ProductSlice";
import "../../Assets/Styles/Pages/Categories/index.scss";

export const Categories = () => {
  const { id } = useParams();
  const { categoryData } = useSelector((state) => state.category);
  const { productData } = useSelector((state) => state.products);

  // console.log(productData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductCategory());
    dispatch(fetchFilterData(`/products?category=${id}`));
  }, [dispatch, id]);

  const categoryImg = [];
  const categoryTxt = [];
  const categoryStyle = [];

  for (const item of categoryData) {
    if (item.id === id) {
      item.banner.map((i) => {
        categoryImg.push(i.img);
        categoryTxt.push(i.txt);
        categoryStyle.push(i.filter);
      });
    }
  }

  // --------------------------------------------------------------------------------------------------------

  //// بجایی ایتم جوابی که از سمت سرور گرفتیم میزاریم
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = productData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productData.length / 10);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % productData.length;
    setItemOffset(newOffset);
  };

  const [filtering, setFiltering] = useState({
    expensive: false,
    cheapest: false,
    Bestselling: true,
    newest: false,
    mostVisited: false,
  });


  return (
    <div className="categoriePage">
      <Header />
      <div className="categoriePage__main">
        <div className="flex gap-3">
          <CategorasMenu />
          <div className="categoriePage__main__banner">
            {/* large */}
            <div className="flex gap-3 j-c">
              <BannerHorizontal
                img={`http://localhost:3002/files/${categoryImg[0]}`}
                size="large"
                className={categoryStyle[0]}
              />

              <BannerHorizontal
                img={`http://localhost:3002/files/${categoryImg[1]}`}
                size="large"
                className={categoryStyle[1]}
              />
            </div>

            {/* small */}
            <div className="flex gap-3">
              <BannerHorizontal
                img={`http://localhost:3002/files/${categoryImg[2]}`}
                // txt=" لپتاپ لنوو Legion 5؛ تقریبا بی‌نقص، اما گران‌قیمت"
                size="small"
                className={categoryStyle[2]}
              />
              <BannerHorizontal
                img={`http://localhost:3002/files/${categoryImg[3]}`}
                size="small"
                // txt=" هدفون بی‌سیم سامسونگ;صدای خوب و دیگر هیچ"
                className={categoryStyle[3]}
              />
              <BannerHorizontal
                img={`http://localhost:3002/files/${categoryImg[4]}`}
                size="small"
                // txt="خرید دسته‌ بازی سونی; جذاب ولی گران‌قیمت"
                className={categoryStyle[4]}
              />
            </div>
          </div>
        </div>
        <div className="fs-1 mt-8 mb-1 gray-300 flex gap-2">
          <span
            className={filtering.Bestselling ? `pointer  active` : `pointer`}
            onClick={() => {
              setFiltering({ Bestselling: true });
              dispatch(fetchFilterData(`/products?category=${id}`))

            }}
          >
            پرفروش ترین
          </span>
          <span
            className={filtering.expensive ? `pointer  active` : `pointer`}
            onClick={() => {
              setFiltering({ expensive: true });
              dispatch(fetchFilterData(`/products?_sort=price&_order=desc&category=${id}`))
           
            }}
          >
            گران ترین{" "}
          </span>
          <span
            className={filtering.cheapest ? `pointer  active` : `pointer`}
            onClick={() => {
              setFiltering({ cheapest: true });
              dispatch(fetchFilterData(`/products?_sort=price&_order=asc&category=${id}`))

            }}
          >
            ارزان ترین{" "}
          </span>
          <span
            className={filtering.newest ? `pointer  active` : `pointer`}
            onClick={() => {
              setFiltering({ newest: true });
              dispatch(fetchFilterData(`/products?_sort=createdAt&_order=desc&category=${id}`))

            }}
          >
            جدیدترین
          </span>
          <span
            className={filtering.mostVisited ? `pointer  active` : `pointer`}
            onClick={() => {
              setFiltering({ mostVisited: true });
              dispatch(fetchFilterData(`/products?_sort=createdAt&_order=asc&category=${id}`))

            }}

          >
            پر بازدیدترین
          </span>
        </div>
        <div className="line "></div>
        {/* product card part */}
        <div className="">
          <ProductsList productData={currentItems} />
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel=" < next "
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="previous > "
          renderOnZeroPageCount={null}
          className="pagination-category flex gap-5 mt-10 j-c a-c"
          activeClassName="activePage-category"
        />
      </div>
      <Footer />
    </div>
  );
};
