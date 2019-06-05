import $ from 'jquery';
import * as d3 from 'd3';
// import Swiper from 'swiper/dist/js/swiper.js';
import 'bootstrap/scss/bootstrap.scss';
import '../shared/styles/styles.scss';
// import 'bootstrap';

if (!window.d3) {
    window.d3 = d3;
}

export {
    $,
    d3
};
