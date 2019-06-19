/* eslint-disable no-unused-vars */
import { $, d3, Neo4jd3 } from '../common/common'
import './easyui.scss'

$('#dt').datetimebox({
  value: '3/4/2010 2:3',
  required: true,
  showSeconds: false
})

$('#ss').searchbox({
  searcher: function (value, name) {
    alert(value + ',' + name)
  },
  menu: '#mm',
  prompt: 'Please Input Value'
})
