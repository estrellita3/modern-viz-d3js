const ancho = 800
const alto = 600
const margen = {
    superior: 10,
    inferior: 40,
    izquierdo: 60,
    derecho: 10
}

const svg = d3.select("#chart").append("svg").attr("width", ancho).attr("height", alto).attr("id", "svg")
const grupoElementos = svg.append("g").attr("id", "grupoElementos")
    .attr("transform", `translate(${0}, ${margen.superior})`)

// escalas y ejes:
var x = d3.scaleLinear().range([0, ancho - margen.izquierdo - margen.derecho])
var y = d3.scaleBand().range([alto - margen.inferior - margen.superior, 0]).padding(0.1) // porque las coordenadas van de arriba a abajo en svg

const grupoEjes = svg.append("g").attr("id", "grupoEjes")
const grupoX = grupoEjes.append("g").attr("id", "grupoX")
    .attr("transform", `translate(${margen.izquierdo}, ${alto - margen.inferior})`)
const grupoY = grupoEjes.append("g").attr("id", "grupoY")
    .attr("transform", `translate(${margen.izquierdo}, ${margen.superior})`)

const ejeX = d3.axisBottom().scale(x).ticks(5)
const ejeY = d3.axisLeft().scale(y) // este es para generar ejes verticales

const colores = ["red", "yellow", "green", "purple", "blue", "lightblue", "lightgrey", "lightseagreen"]
// data:
d3.json("data.json").then(misDatos => {
    datos2 = Object.values(misDatos.worldCupWinners)
    datos2.map(d => {
        d.titles = +d.titles
    })

    // añadir el dominio a la escala:
    x.domain([
        0,
        d3.max(datos2.map(d=>d.titles)),
    ]) // [min, max]
    y.domain(datos2.map(d=>d.country))

    grupoX.call(ejeX)
    grupoY.call(ejeY)

    var elementos = grupoElementos.selectAll("rect").data(datos2)
    elementos.enter().append("rect")
        .attr("fill", (d, i) => colores[i]) // creo un array de colores
        .attr('id', d=> d.country)
        .attr("width", d => x(d.titles))
        .attr("height", y.bandwidth())
        .attr("x", margen.izquierdo)
        .attr("y", (d, i, a) => y(d.country))

    // console.log(datos2)
})

