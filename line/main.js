const alto = 600
const ancho = 800
const margen = {
    izquierdo: 40,
    derecho: 10,
    superior:10,
    inferior: 40
}

const svg = d3.select("#chart").append("svg").attr("width", ancho).attr("height", alto).attr("id", "svg")
const grupoElementos = svg.append("g").attr("id", "grupoElementos").attr("transform", `translate(${margen.izquierdo}, ${margen.superior})`)

var x = d3.scaleTime().range([0, ancho - margen.izquierdo - margen.derecho])
var y = d3.scaleLinear().range([alto - margen.inferior - margen.superior, 0])

const grupoEjes = svg.append("g").attr("id", "grupoEjes")
const grupoX = grupoEjes.append("g").attr("id", "grupoX")
    .attr("transform", `translate(${margen.izquierdo}, ${alto - margen.inferior})`)
const grupoY = grupoEjes.append("g").attr("id", "grupoY")
    .attr("transform", `translate(${margen.izquierdo}, ${margen.superior})`)

var ejeX = d3.axisBottom().scale(x)
var ejeY = d3.axisLeft().scale(y)

const formatDate = d3.timeParse("%Y");
var tooltip = grupoElementos.append("g").attr("id", "tooltip")
var maxRefLine = tooltip.append("line").attr("id", "maxRefLine")
var maxRefText = tooltip.append("text").attr("id", "maxRefText")

d3.csv("data.csv").then(misDatos => {
    misDatos.map(d =>{
        d.n = +d.n
        d.prop = +d.prop
        d.year = formatDate(d.year)
    })

    y.domain([
        d3.min(misDatos.map(d=>d.n)),
        d3.max(misDatos.map(d=>d.n)),
    ]) // esto un buen caso de uso para d3.extent, que me devuelve ya [min, max]
    x.domain(d3.extent(misDatos.map(d => d.year)))
    // console.log()

    grupoX.call(ejeX)
    grupoY.call(ejeY)

    var Helen = misDatos.filter(d => {
        return d.name == "Helen"
    })

    var Amanda = misDatos.filter(d => {
        return d.name == "Amanda"
    })

    maxRefLine
        .attr("x1", 0)
        .attr("x2", ancho)
        .attr("y1", y(d3.max(Helen.map(d => d.n))))
        .attr("y2", y(d3.max(Helen.map(d => d.n))))

    maxRefText
        .attr("transform", `translate(${10}, ${y(d3.max(Helen.map(d => d.n))) -10})`)
        .text(d3.max(Helen.map(d => d.n)))

    grupoElementos.datum(Helen).append('path')
        .attr("id", "Helen")
        .attr("d", d3.line()
            .x(d => x(d.year))
            .y(d => y(d.n))
        )

    grupoElementos.datum(Amanda).append('path')
        .attr("id", "Amanda")
        .attr("d", d3.line()
            .x(d => x(d.year))
            .y(d => y(d.n))
        )

})

