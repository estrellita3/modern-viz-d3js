// const:
const width = 800
const height = 600

// declaro el svg:
const svg = d3.select("#chart")
    .append("svg")
        .attr("width", width)
        .attr("height", height)

const elementGroup = svg.append("g").attr("id", "elementGroup")


function ranCircle() {
    var cx = (Math.random() * 600) + 50
    var cy = (Math.random() * 400) + 50
    var r = (Math.random() * 20) + 5
    
    elementGroup.append('circle')
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", r)
}

d3.select("#ponerCirculo").on("click", ranCircle)
// ranCircle()

// console.log("Hello World")
// console.log(width)