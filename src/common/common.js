import $ from 'jquery';
import 'swiper/dist/css/swiper.css';
import '../shared/styles/styles.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap';

class A {

    x = 0;
    y = 0;
    constructor() {
        this.fn()
    }
    fn() {
        console.log(this.x + this.y)
    }

}

new A

var o = { a: 'aaa', b: 'bbbb'}

var o2 = {...o, c: 'ccc'}
console.log(o2)

export {
    $

}