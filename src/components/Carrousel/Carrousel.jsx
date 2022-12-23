import React from "react";
import "./carrousel.css";
import "swiper/css";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Card from "../card/Card";

export default function Carrousel({ array }) {
  const array1 = array.slice(0, 5);
  const array2 = array.slice(5, 10);

  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          {array1.map((objeto) => (
            <Card key={objeto.nombre} texto="MAS DETALLES" objeto={objeto}></Card>
          ))}
        </SwiperSlide>
        <SwiperSlide>
          {array2.map((objeto) => (
            <Card key={objeto.nombre} texto="MAS DETALLES" objeto={objeto}></Card>
          ))}
        </SwiperSlide>
      </Swiper>
    </>
  );
}
