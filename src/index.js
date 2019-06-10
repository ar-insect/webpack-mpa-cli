import { $, d3, Neo4jd3 } from './common/common';
import './index.scss';
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
                },],
                "relationships": []
            }
        }]
    }],
    "errors": []
};

var neo4jd3 = new Neo4jd3('#neo4jd3', {
    // highlight: [
    //     {
    //         class: 'Project',
    //         property: 'name',
    //         value: 'neo4jd3'
    //     }, {
    //         class: 'User',
    //         property: 'userId',
    //         value: 'eisman'
    //     }
    // ],
    icons: {
        'Api': 'gear',
        'BirthDate': 'birthday-cake',
        'Cookie': 'paw',
        'Email': 'at',
        'Git': 'git',
        'Github': 'github',
        'Ip': 'map-marker',
        'Issues': 'exclamation-circle',
        'Language': 'language',
        'Options': 'sliders',
        'Password': 'asterisk',
        'Phone': 'phone',
        'Project': 'folder-open',
        'SecurityChallengeAnswer': 'commenting',
        'User': 'user',
        'zoomFit': 'arrows-alt',
        'zoomIn': 'search-plus',
        'zoomOut': 'search-minus'
    },
    images: {
        // 'Address': 'img/twemoji/1f3e0.svg',
        // 'BirthDate': 'img/twemoji/1f5d3.svg',
        // 'Cookie': 'img/twemoji/1f36a.svg',
        // 'CreditCard': 'img/twemoji/1f4b3.svg',
        // 'Device': 'img/twemoji/1f4bb.svg',
        // 'Email': 'img/twemoji/2709.svg',
        // 'Git': 'img/twemoji/1f5c3.svg',
        // 'Github': 'img/twemoji/1f5c4.svg',
        // 'icons': 'img/twemoji/1f38f.svg',
        // 'Ip': 'img/twemoji/1f4cd.svg',
        // 'Issues': 'img/twemoji/1f4a9.svg',
        // 'Language': 'img/twemoji/1f1f1-1f1f7.svg',
        // 'Options': 'img/twemoji/2699.svg',
        // 'Password': 'img/twemoji/1f511.svg',
        // 'Project|name|d3': 'img/twemoji/32-20e3.svg',
        // 'Project|name|neo4j': 'img/twemoji/33-20e3.svg',
        // 'Project|name|neo4jd3': 'img/twemoji/31-20e3.svg',
        // 'User': 'img/twemoji/1f600.svg'
    },
    minCollision: 60,
    neo4jData: data,
    nodeRadius: 35,
    onNodeClick: function(node) {
        nodeClicked(node);
    },
    // onNodeDoubleClick: function(node) {
    //     switch(node.id) {
    //         case '25':
    //             // Google
    //             window.open(node.properties.url, '_blank');
    //             break;
    //         default:
    //             var maxNodes = 1,
    //                 data = neo4jd3.randomD3Data(node, maxNodes);
    //             neo4jd3.updateWithD3Data({
    //                 "nodes":[
    //                     {
    //                         "id":26,
    //                         "labels":[
    //                             "mail-forward,share"
    //                         ],
    //                         "properties":{
    //                             "random":"mail-forward,share"
    //                         },
    //                         "x":824.868687748586,
    //                         "y":694.6265030301855
    //                     }
    //                 ]
    //             });
    //             // console.log(d3.select(''))

    //             break;
    //     }
    // },
    zoomFit: false
});

const menu = [
    { className: 'remove_node', itemNumber: 1, position: [-8, 0], },
    { className: 'expand_node', itemNumber: 2, position: [-8, -10], },
    { className: 'unlock_node', itemNumber: 3, position: [-10, -6], },
    { className: 'unlock_node2', itemNumber: 4, position: [-10, -6], },
];

const numberOfItemsInContextMenu = 4

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
    itemNumber,
    className,
    position
) {
    // debugger
    const path = selection.selectAll(`path.${className}`).data(() => node.selected ? [node] : []);
    const tab = path
        .enter()
        .append('path')
        .classed(className, true)
        .classed('context-menu-item', true)
        .attr('d', arc(35, itemNumber, 1));
    // // debugger
    // tab
    //     .transition()
    //     .duration(200)
    //     .attr('d', arc(35, itemNumber));

    // path
    //     .exit()
    //     .transition()
    //     .duration(200)
    //     .attr('d', arc(35, itemNumber, 1))
    //     .remove()
    
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
        return
    }
    if (!d.selected) {
        selectItem(d)
    } else {
        deselectItem(d)
    }

    const selection = svg.selectAll('g.node').data([d]);
    console.log(selection.html())
    // for (let i = 0; i < menu.length; i++) {
    //     createMenuItem(
    //         selection, 
    //         d, 
    //         menu[i].itemNumber,
    //         menu[i].className,
    //         menu[i].position
    //     )
    // }
}

var svg = d3.select('svg');
var selectedItem = null;

var nodes = data.results[0].data[0].graph.nodes;
nodes = nodes.map(res => res.selected = false);


