import { fetchFilterData } from "Redux/Slices/ProductSlice";

export const SearchDataHandler = (queryString , dispatch ) => {
  let timeOut;

  clearTimeout(timeOut);
  if (queryString) {
    timeOut = setTimeout(() => {
      dispatch(fetchFilterData(`/products?name_like=${queryString}`));
    }, 500);
  }
};
