const width = 800
const height = 600


const svg = d3.select("#chart").append("svg").attr("height", height).attr("id", "chart").attr("width", width)
const elementGroup = svg.append("g").attr("id", "elementGroup")

d3.json("data.json").then(data => {
    data = Object.values(data.worldCupWinners)
    data.map(d => {
        d.titles = +d.titles
    })

    // data binding:
    var elements = elementGroup.selectAll("rect").data(data)
    elements.enter().append("rect")
        .attr("class", "bar")
        .attr("x", 10)
        .attr("y", (d, i, a)  => {
            // esta es la forma complicada de hacerlo, pero bueno, para 
            // que quede patnete :)
            // console.log(d)
            return i * 22
        })
        .attr("height", 20)
        .attr("width", d => d.titles * 10)
        .attr("fill", "lightblue")

    // console.log(data)
})

