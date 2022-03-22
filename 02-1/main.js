// const:
const width = 800
const height = 600

// declarar svg:
const svg = d3.select("#chart")
    .append("svg")
        .attr("width", width)
        .attr("height", height)

var elementGroup = svg.append('g').attr('id', "elementGroup")
// elementGroup está dentro de svg


var rectangle1 = elementGroup
    .append("rect")
        .attr("height", 100)
        .attr("width", 100)
        .attr("x", 20).attr("y", 100)
var rectangle2 = elementGroup
    .append("rect")
        .attr("height", 100)
        .attr("width", 100)
        .attr("x", 130).attr("y", 100)


const distance = 60
elementGroup.attr("transform", "translate(60, 60)")
// elementGroup.attr("transform", `translate(${10 + 10}, ${distance - 30})`)
// elementGroup.attr("transform", "translate(60, 60) rotate("45")
        
// svg.remove()
