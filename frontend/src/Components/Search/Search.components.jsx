import { Input } from "Components";
import { Header } from "Layouts";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { SiHotjar } from "react-icons/si";
import { RiCloseCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { EscBtn } from "Utils/EscBtn";
import "../../Assets/Styles/Components/Search/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { SearchProduct } from "Redux/Slices/SearchProductSlice";
import { fetchProduct } from "Redux/Slices/SingleProductSlice";
import { HotSreach } from "Utils/HotSearch";

export const Search = ({ setShowSearchBox, showSearchBox }) => {
  const { FilteredData } = useSelector((state) => state.SreachData);
  const { categoryData } = useSelector((state) => state.category);

  // console.log(FilteredData);

  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  /// srach process
  useEffect(() => {
    let timeOut;
    clearTimeout(timeOut);

    if (query) {
      timeOut = setTimeout(() => {
        dispatch(SearchProduct(`/products?name_like=${query}&_limit=5`));
      }, 500);
    }
  }, [query]);

  const [searchItem, setsearchItem] = useState(false);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setsearchItem(true);
    if (e.target.value === "") {
      setsearchItem(false);
    }
  };

  const closeHandle = () => {
    document.body.style.overflowY = "unset";
    setShowSearchBox(false);
  };

  const searchedItemHandler = (item) => {
    closeHandle();
    dispatch(fetchProduct(item.id));
    navigate(`/products/${item.id}`);
  };

  const searchedCategoryHandler = (item) => {
    closeHandle();
    navigate(`/category/${item.category}`);
  };

  return (
    <>
      <div>
        <div className="SearchModal__Container">
          <div className="flex j-sb">
            <Input
              type="search "
              holder="جستجوی محصولات"
              inpType="searchBox-Home-large"
              value={query}
              onChange={(e) => {
                document.body.style.overflow = "hidden";
                handleSearch(e);
              }}
              onkeydown={(e) => {
                EscBtn(e, setShowSearchBox);
              }}
            />
            {searchItem ? (
              <RiCloseCircleLine
                size="2rem"
                className="pointer"
                onClick={closeHandle}
              />
            ) : (
              <BiSearchAlt size="2rem" color="#444" />
            )}
          </div>
          <div className="L-blue mt-1 mb-1"></div>

          {searchItem ? (
            <div className="SearchModal__Container__searchItems">
              {FilteredData &&
                FilteredData.map((item) => {
                  let CATEGORYNAME = "";
                  categoryData.forEach((category) => {
                    if (category.id === item.category) {
                      CATEGORYNAME = category.name;
                    }
                  });

                  return (
                    <div className="flex col gap-1 mb-3 pointer">
                      <div
                        onClick={() => searchedItemHandler(item)}
                        // to={`http://localhost:3000/products/${item.id}`}
                        className="flex gap-1 a-c  link gray-400"
                      >
                        <BiSearchAlt size="2rem" color="var(--gray-200)" />
                        <p className="fs-12 line-h-2">
                          {item.name.length > 70
                            ? `${item.name.substring(0, 70)}...`
                            : item.name}
                        </p>
                      </div>
                      <div
                        onClick={() => searchedCategoryHandler(item)}
                        // to={`/category/${item.category}`}
                        className="mr-3 fs-1 gray-300 link"
                      >
                        در دسته{" "}
                        <span className="fs-1 bold blue-100">
                          {" "}
                          {CATEGORYNAME}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="flex col mt-2">
              <p className="flex gap a-c">
                <SiHotjar size={"2rem"} color="var(--gray-200)" />
                <span className="fs-11 bold gray-400">جستجویی پرطرفدار</span>
              </p>
              <div className="flex gap">
                {HotSreach.map((item) => {
                  return (
                    <div
                      onClick={() => searchedItemHandler(item)}
                      className=" SearchModal__Container__hotSearch  flex gap a-c mt-2"
                    >
                      <p className="fs-1 bold">{item.name}</p>
                      <IoIosArrowBack size="1.5rem" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
