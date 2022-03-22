const width = 600
const height = 150
const margin = {
    top: 10, 
    bottom: 40, 
    left: 40,
    right: 10
}

const svg = d3.select("#chart").append("svg").attr("id", "svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup")
    .attr("transform", `translate(${margin.left}, 0)`) // centro un poco los elementos

const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup")
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)

var scale = d3.scaleLinear().range([0, width - margin.left - margin.right])
// limito el rango con los mágenes para que no se corten los círculos

var xAxis = d3.axisBottom().scale(scale)

d3.json("data.json").then(data => {
    // transformación de datos:
    data = Object.values(data.data)
    data.map(d => {
        d.distance = +d.distance
    })
    // console.log(data)

    // añadir dominio a las escalas:
    scale.domain(d3.extent(data.map(d=>d.distance)))

    // llamar al eje:
    xAxisGroup.call(xAxis)

    // data binding:
    var elements = elementGroup.selectAll("circle").data(data)
    elements.enter().append("circle")
        .attr("id", d => d.city)
        .attr("cx", d => scale(d.distance)) // uso la escala para esparcir los círculos
        .attr("cy", height / 2)
        .attr("r", 10)
})