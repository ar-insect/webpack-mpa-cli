
import $ from 'jquery';
import './common/common';
// import Swiper from 'swiper';
import Swiper from 'swiper/dist/js/swiper.js';
// const obj = {};
// Object.assign(obj, { age: 30 }); // 此行代码需要加 ployfill
console.log("foobar".includes("foo"));

var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    slidesPerView: 2,
    centeredSlides: true,
    initialSlide: 2,
    coverflowEffect: {
        rotate: 0,
        stretch: 10,
        depth: 160,
        modifier: 2,
        slideShadows: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // pagination: {
    //   el: '.swiper-pagination',
    // },
  });
