import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
// import required modules
import { Scrollbar } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import "./ScrollbarSlider.scss";
import { CardProduct } from "Components";
import { fetchProducts } from "Redux/Slices/ProductSlice";

export function ScrollbarSlider() {
  const { productData } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts("_limit=10"));
  }, [dispatch]);

  return (
    <div className="ScrollbarSlider_container ">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        {productData &&
          productData.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <CardProduct product={product} size="Large" />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
