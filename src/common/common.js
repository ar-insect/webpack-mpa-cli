import $ from 'jquery'
import 'bootstrap/scss/bootstrap.scss'
import 'font-awesome/css/font-awesome.css'
import '../shared/assets/neo4jd3/styles/neo4jd3.scss'
import '../shared/styles/styles.scss'
import 'EasyUI/themes/bootstrap/easyui.css'
import 'EasyUI/themes/icon.css'
import 'EasyUI/jquery.easyui.min'
// import 'bootstrap';
<<<<<<< HEAD
import * as d3 from 'd3';
import Neo4jd3 from '../shared/assets/neo4jd3/index';

d3.selection.prototype.appendSVG = function (SVGString) {
    return this.select(function () {
      return this.appendChild(
        document.importNode(
          new DOMParser().parseFromString(SVGString, 'application/xml')
            .documentElement.firstChild,
          true
        )
      )
    })
}
=======
import * as d3 from 'd3'
import Neo4jd3 from '../shared/assets/neo4jd3/index'
>>>>>>> 293e83289b9b73f879504a7b161fe12c1b95270e

if (!window.d3) {
  window.d3 = d3
}

export {
  $, d3, Neo4jd3
}
