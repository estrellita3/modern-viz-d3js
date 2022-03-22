// const:
const width = 800
const height = 600

// svg:
// const svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height)
// const elementGroup = svg.append("g").attr("id", "elementGroup")

//data:
d3.json("data.json").then(data => {
    data = Object.values(data.worldCupWinners)
    data.map(d => {
        d.titles = +d.titles
    })
    // console.log(data)

    // creo otro div:
    var div = d3.select("#chart").append("div").attr("id", "container")
    var elements = div.selectAll("p").data(data)

    elements.enter().append("p")
        // .text(d => d.country)
        .text(d => `${d.country}: ${d.titles} titles`)
})
