import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
// import required modules
import { Autoplay, Pagination } from "swiper";
import "../../Assets/Styles/Components/Slider/index.scss";
import { Button } from "Components";

const slide_img = [
  {
    img: "https://dkstatics-public.digikala.com/digikala-adservice-banners/c772f02d0d63124f67ef207564c52e400a5f1e3e_1676361962.jpg?x-oss-process=image/quality,q_95/format,webp",
    name: "",
    heading: "",
    btnTxt: "",
  },
  {
    img: "https://mrbestplus.ir/wp-content/uploads/2023/02/stWxmxQxthCyMxKosjKikc.webp",
    name: "",
    heading: "",
    btnTxt: "",
  },
  {
    img: "https://dkstatics-public.digikala.com/digikala-adservice-banners/ac03af65debfd7ad503ea661a5df3498909738d1_1674990887.jpg?x-oss-process=image/quality,q_95/format,webp",
    name: "",
    heading: "",
    btnTxt: "",
  },
  {
    img: "https://dkstatics-public.digikala.com/digikala-adservice-banners/713aeb3d039233342693f214ddf7de5a88ed8320_1674991238.jpg?x-oss-process=image/quality,q_95/format,webp",
    name: "",
    heading: "",
    btnTxt: "",
  },
];

export const Slider = () => {
  return (
    <div className="slider-container ">
      <Swiper
        pagination={{ clickable: true }}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {/* Using array */}
        {slide_img.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <img src={item.img} alt="" />
           
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
