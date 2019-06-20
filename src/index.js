import { $, d3, Neo4jd3 } from './common/common';
import './index.scss';
// import data from '../shared/assets/json/neo4jData.json';
import icons from './icons';

var data = {
    "results": [{
        "columns": ["user", "entity"],
        "data": [{
            "graph": {
                "nodes": [{
                    "id": "1",
                    "labels": ["User"],
                    "properties": {
                        "userId": "eisman"
                    }
                }, {
                    "id": "2",
                    "labels": ["Phone"],
                    "properties": {
                        "value": "555-555-5555"
                    }
                }, {
                    "id": "3",
                    "labels": ["Address"],
                    "properties": {
                        "zipCode": "90210",
                        "country": "US",
                        "city": "Beverly Hills",
                        "state": "CA"
                    }
                }, {
                    "id": "4",
                    "labels": ["BirthDate"],
                    "properties": {
                        "value": 1326322800000
                    }
                }, {
                    "id": "5",
                    "labels": ["Password"],
                    "properties": {
                        "value": "123456"
                    }
                }, {
                    "id": "6",
                    "labels": ["Device"],
                    "properties": {
                        "value": "eisman"
                    }
                }],
                "relationships": [{
                    "id": "1",
                    "type": "HAS_PHONE_NUMBER",
                    "startNode": "1",
                    "endNode": "2",
                    "properties": {
                        "from": 1473581532586
                    }
                }, {
                    "id": "2",
                    "type": "HAS_ADDRESS",
                    "startNode": "1",
                    "endNode": "3",
                    "properties": {
                        "from": 1473581532586
                    }
                }, {
                    "id": "3",
                    "type": "HAS_BIRTH_DATE",
                    "startNode": "1",
                    "endNode": "4",
                    "properties": {
                        "from": 1473581532586
                    }
                }, {
                    "id": "4",
                    "type": "HAS_BIRTH_DATE",
                    "startNode": "5",
                    "endNode": "4",
                    "properties": {
                        "from": 1473581532586
                    }
                }, {
                    "id": "5",
                    "type": "HAS_BIRTH_DATE",
                    "startNode": "6",
                    "endNode": "4",
                    "properties": {
                        "from": 1473581532586
                    }
                }]
            }
        }]
    }],
    "errors": []
};

var neo4jd3 = new Neo4jd3('#neo4jd3', {
    infoPanel: true,
    // icons: {
    //     'Api': 'gear',
    //     'BirthDate': 'birthday-cake',
    //     'Cookie': 'paw',
    //     'Email': 'at',
    //     'Git': 'git',
    //     'Github': 'github',
    //     'Ip': 'map-marker',
    //     'Issues': 'exclamation-circle',
    //     'Language': 'language',
    //     'Options': 'sliders',
    //     'Password': 'asterisk',
    //     'Phone': 'phone',
    //     'Project': 'folder-open',
    //     'SecurityChallengeAnswer': 'commenting',
    //     'User': 'user',
    //     'zoomFit': 'arrows-alt',
    //     'zoomIn': 'search-plus',
    //     'zoomOut': 'search-minus'
    // },
    // images: {
    //     'Address': 'img/twemoji/1f3e0.svg',
    //     'BirthDate': 'img/twemoji/1f5d3.svg',
    //     'Cookie': 'img/twemoji/1f36a.svg',
    //     'CreditCard': 'img/twemoji/1f4b3.svg',
    //     'Device': 'img/twemoji/1f4bb.svg',
    //     'Email': 'img/twemoji/2709.svg',
    //     'Git': 'img/twemoji/1f5c3.svg',
    //     'Github': 'img/twemoji/1f5c4.svg',
    //     'icons': 'img/twemoji/1f38f.svg',
    //     'Ip': 'img/twemoji/1f4cd.svg',
    //     'Issues': 'img/twemoji/1f4a9.svg',
    //     'Language': 'img/twemoji/1f1f1-1f1f7.svg',
    //     'Options': 'img/twemoji/2699.svg',
    //     'Password': 'img/twemoji/1f511.svg',
    //     'Project|name|d3': 'img/twemoji/32-20e3.svg',
    //     'Project|name|neo4j': 'img/twemoji/33-20e3.svg',
    //     'Project|name|neo4jd3': 'img/twemoji/31-20e3.svg',
    //     'User': 'img/twemoji/1f600.svg'
    // },
    minCollision: 60,
    neo4jData: data,
    nodeRadius: 35,
    onNodeClick: function(node) {
        d3.event.stopPropagation();
        nodeClicked(node);
    },
    onNodeMouseUp: function(node) {
        mouseupNode = node;
        // check for drag-to-self
        if (mouseupNode === mousedownNode) {
            resetMouseVars();
            return;
        }
        console.log(`mousedownNode`, mousedownNode)
        console.log(`mouseupNode`, mouseupNode)
        let tmp = {mousedownNode, mouseupNode};
        alert(JSON.stringify(tmp));
    },
    zoomFit: false
});

const attachContextEvent = (event, elems) =>
  (() => {
    for (let elem of Array.from(elems)) {
        if ('link' === event) {
            elem.on('mousedown', function (node) {
                d3.event.stopPropagation();
                dispatch.call(`${event}_mousedown`, null, node);
            });
        } else {
            elem.on('click', function (node) {
                d3.event.stopPropagation();
                dispatch.call(event, null, node);
            });
        }
    }
})()

const menu = [
    { className: 'link-node', itemNumber: 1, position: [-8, -10], textValue: 'Link', eventName: 'link' },
    { className: 'remove-node', itemNumber: 2, position: [-10, -6], textValue: 'Remove', eventName: 'remove' },
    { className: 'hide-node', itemNumber: 3, position: [-10, -6], textValue: 'Hide', eventName: 'hide' },
    { className: 'expand-node', itemNumber: 4, position: [-8, 0], textValue: 'Expand / Collapse', eventName: 'expand' },
];

const numberOfItemsInContextMenu = 4
var mousedownNode = null;
var mouseupNode = null;
function resetMouseVars() {
    mousedownNode = null;
    mouseupNode = null;
}
  
const arc = function (radius, itemNumber, width) {
    if (width == null) {
      width = 50
    }
    itemNumber = itemNumber - 1
    const startAngle = ((2 * Math.PI) / numberOfItemsInContextMenu) * itemNumber
    const endAngle = startAngle + (2 * Math.PI) / numberOfItemsInContextMenu
    const innerRadius = Math.max(radius + 8, 20)
    return d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(innerRadius + width)
      .startAngle(startAngle)
      .endAngle(endAngle)
      .padAngle(0.03)
}

function createMenuItem(
    selection, 
    node,
    eventName,
    itemNumber,
    className,
    position,
    textValue
) {
    const path = selection.selectAll(`path.${className}`).data(() => node.selected ? [node] : []);
    const iconPath = selection.selectAll(`.menu-icon.${className}`).data(() => node.selected ? [node] : []);

    const tab = path
        .enter()
        .append('path')
        .classed(className, true)
        .classed('context-menu-item', true)
        .attr('d', arc(35, itemNumber, 1));
    tab
        .transition()
        .duration(200)
        .attr('d', arc(35, itemNumber));


    const rawSvgIcon = icons[textValue];
    const icon = iconPath
        .enter()
        .appendSVG(rawSvgIcon)
        .classed('menu-icon', true)
        .classed(className, true)
        .classed('context-menu-item', true)
        .attr(
            'transform', 'translate(' +
                    Math.floor(
                        arc(35, itemNumber).centroid()[0] +
                            (position[0] * 100) / 100
                    ) +
                    ',' +
                    Math.floor(
                        arc(35, itemNumber).centroid()[1] +
                            (position[1] * 100) / 100
                    ) +
                    ')' +
                    ' ' +
                    'scale(0.7)'
        );
    attachContextEvent(eventName, [tab, icon])

    path
    .exit()
    .transition()
    .duration(200)
    .attr('d', arc(35, itemNumber, 1))
    .remove();

    iconPath.exit().remove();
}

function selectItem(item) {
    if (selectedItem) {
      selectedItem.selected = false
    }
    selectedItem = item
    item.selected = true
}

function deselectItem(item) {
    if (selectedItem) {
        selectedItem.selected = false;
        selectedItem = null;
    }
    item.selected = false;
}

function nodeClicked(d) {
    if (!d) {
        return;
    }
    
    if (selectedItem && d.id !== selectedItem.id) {
        selectedItem.selected = false;
        updateSVG(
            svg.selectAll('g.node').filter(item => item.id === selectedItem.id),
            selectedItem
        );
    }
    if (!d.selected) {
        selectItem(d);
    } else {
        deselectItem(d);
    }
    updateSVG(
        svg.selectAll('g.node').filter(item => item.id === d.id), 
        d
    );
}

function updateSVG(selection, node) {
    for (let i = 0; i < menu.length; i++) {
        createMenuItem(
            selection,
            node,
            menu[i].eventName,
            menu[i].itemNumber,
            menu[i].className,
            menu[i].position,
            menu[i].textValue,
        )
    }
}

function clearNodes() {
    const node = svg.selectAll('g.node');
    node.data([]).exit().remove();
    const rel = svg.selectAll('g.relationship');
    rel.data([]).exit().remove();
}

var dispatch = d3.dispatch('link_mousedown', 'link_mousemove', 'link_mouseup', 'expand', 'remove', 'hide');
dispatch.on('link_mousedown', (d) => {
    // because :active only works in WebKit?
    svg.classed('active', true);

    mousedownNode = d;
    dragLine
        .style('marker-end', 'url(#end-arrow)')
        .classed('hidden', false)
        .attr('d', `M${d.x},${d.y}L${d.x},${d.y}`);
});
// dispatch.on('link_mousemove', (d) => {
//     // console.info('nodeLink', d);
//     // var graph = document.querySelector('.neo4jd3-graph');
//     // dragLine.attr('d', `M${d.x},${d.y}L${d3.mouse(graph)[0]},${d3.mouse(graph)[1]}`);
// });
// dispatch.on('link_mouseup', (d) => {
//     // dragLine
//     //   .classed('hidden', true)
//     //   .style('marker-end', '');
//     //   // because :active only works in WebKit?
//     // svg.classed('active', false);
// });

dispatch.on('expand', (d) => {

});
dispatch.on('remove', (d) => {

});
dispatch.on('hide', (d) => {
    // const newData = {...data};
    // const nodes = newData.results[0].data[0].graph.nodes;
    // const index = nodes.findIndex(item => item.id === d.id);
    // nodes.splice(index, 1);
    // rm node
    const node = svg.selectAll('g.node').filter(item => item.id === d.id);
    node.data([])
    .exit()
    .transition()
    .duration(100)
    .remove();
    // const rels = newData.results[0].data[0].graph.relationships;
    const rel = svg.selectAll('g.relationship').filter(item => item.startNode === d.id || item.endNode === d.id);
    rel.data([])
    .exit()
    .transition()
    .duration(100)
    .remove();
});

var id = 12; // temp id
var rndXY = function() {
    var h = document.querySelector('.neo4jd3-graph').clientHeight;
    var w = document.querySelector('.neo4jd3-graph').clientWidth;
    return {
        x: Math.random()*w,
        y: Math.random()*h
    }
}
// 添加
$('#addNode').on('click', function() {
    let obj = {
        "id": ''+(id++),
        "labels": ["自动化部署"],
        "properties": {
            "value": 'dsfkjsdfklj'
        },
        ...rndXY()
    };
    neo4jd3.updateWithD3Data({
        nodes: [obj]
    });
})
// 刷新
$('#refresh').on('click', function() {
    clearNodes()
    setTimeout(() => {
        neo4jd3.loadNeo4jData(data)
    }, 100)
})

var svg = d3.select('svg');

// define arrow markers for graph links
svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');

svg.append('svg:defs').append('svg:marker')
    .attr('id', 'start-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 4)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  .append('svg:path')
    .attr('d', 'M10,-5L0,0L10,5')
    .attr('fill', '#000');
// line displayed when dragging new nodes
const dragLine = svg.append('svg:path')
  .attr('class', 'link dragline hidden')
  .attr('d', 'M0,0L0,0');

svg.on('click', () => {
    if (selectedItem) {
        selectedItem.selected = false;
        updateSVG(
            svg.selectAll('g.node').filter(item => item.id === selectedItem.id),
            selectedItem
        );
    }
});

svg.on('mousedown', function () {
    d3.event.stopPropagation();
});
svg.on('mousemove', function() {
    d3.event.stopPropagation();
    if (selectedItem) {
        const d = selectedItem;
        const g = document.querySelector('.neo4jd3-graph');
        dragLine.attr('d', `M${d.x},${d.y}L${d3.mouse(g)[0]},${d3.mouse(g)[1]}`);
    }
})
svg.on('mouseup', function() {
    d3.event.stopPropagation();
    dragLine
      .classed('hidden', true)
      .style('marker-end', '');
      // because :active only works in WebKit?
    svg.classed('active', false);
    
})
var selectedItem = null;

data.results[0].data[0].graph.nodes = 
    data.results[0].data[0].graph.nodes.map(item => ({ ...item, selected: false }));
